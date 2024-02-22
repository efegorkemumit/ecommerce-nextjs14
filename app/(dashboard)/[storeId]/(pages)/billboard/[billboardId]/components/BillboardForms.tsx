'use client'

import { Billboard } from '@prisma/client'
import { useParams, useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import AlertModal from '@/components/modals/alert-modal';
import HeaderTitle from '@/components/HeaderTitle';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import ImageUpload from '@/components/ImageUpload';
import axios from 'axios';
import toast from 'react-hot-toast';

interface  BillboardFormsProps{
    initalData : Billboard | null
}

type BillboardFormValues = z.infer<typeof formSchema>

const formSchema = z.object({
    label:z.string().min(2),
    imageUrl : z.string().min(2),
})




const BillboardForms = ({initalData}:BillboardFormsProps) => {

    const params = useParams();
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const form = useForm<SettingFormValues>({
        resolver:zodResolver(formSchema),
        defaultValues:initalData || {
          label : '',
          imageUrl: ''
        }
    })


    const title = initalData ? 'Edit billboard' : 'Create Billboard';
    const description = initalData ? 'Edit a billboard' : 'Add a new Billboard';
    const toastMessage = initalData ? "Billboard updated" : "Billboard created"
    const ButtonText = initalData ? "Save Changes" : "Create"


    const onSubmit = async(data: SettingFormValues)=>{
        try {
            setLoading(true);
            if(initalData){
              await axios.patch(`/api/${params.storeId}/billboards/${params.billboardId}`, data)

            }
            else{
              await axios.post(`/api/${params.storeId}/billboards`, data)

            }

            router.refresh();
            router.push(`/${params.storeId}/billboard`);
            toast.success(toastMessage);
           
            
        } catch (error) {
            toast.error("Something went wrong")
            
        }
        finally{
            setLoading(false);
        }

    }

    const onDelete = async()=>{

        try {
            setLoading(true);
           
            
        } catch (error) {
            toast.error("Something went wrong")
            
        }
        finally{
            setLoading(false);
           
        }

    }
    



  return (
    <>

<AlertModal 
    isOpen={open}
    onClose={()=>setOpen(false)}
    onConfirm={onDelete}
    loading={loading}
    
    />


            <div className='flex items-center justify-between'>

            <HeaderTitle title={title} description={description}></HeaderTitle>
                {initalData &&(

                        <Button disabled={loading}
                        variant="destructive"
                        size="sm"
                        onClick={()=>setOpen(true)}
                        >

                        <Trash className='h-4 w-4'></Trash>
                        </Button>




                )}
                
               


            </div>

            <Separator className="my-4" />


            
    <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>

                    <FormField control={form.control}
                      name="imageUrl"
                      render={({field})=>(
                        <FormItem>
                          <FormLabel>Background Image</FormLabel>
                          <FormControl>
                            <ImageUpload
                            value={field.value ? [field.value]: []}
                            disabled={loading}
                            onChange={(url)=>field.onChange(url)}
                            onRemove={() => field.onChange('')}
                            
                            
                            >

                            </ImageUpload>     
                          </FormControl>
                          <FormMessage/>


                        </FormItem>
                      )}/>


<div className='h-8'></div>

                      <FormField control={form.control}
                      name="label"
                      render={({field})=>(
                        <FormItem>
                          <FormLabel>Label</FormLabel>
                          <FormControl>
                            <Input 
                            disabled={loading} 
                            placeholder='Billboard Label' {...field}>

                            </Input>
                          </FormControl>
                          <FormMessage/>


                        </FormItem>
                      )}/>

                <Button  disabled={loading}  variant="default" type='submit' 
                className='ml-auto mt-5'>
                    {ButtonText}
                </Button>

                    </form>
                  </Form>


                  <Separator className="my-4" />
                
    
    
    
    
    </>
  )
}

export default BillboardForms