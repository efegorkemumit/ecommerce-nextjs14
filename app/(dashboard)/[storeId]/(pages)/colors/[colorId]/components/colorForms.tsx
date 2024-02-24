'use client'

import { color } from '@prisma/client'
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

interface  colorFormsProps{
    initalData : color | null
}

type colorFormValues = z.infer<typeof formSchema>

const formSchema = z.object({
    name:z.string().min(2),
    value : z.string().min(2),
})




const ColorForms = ({initalData}:colorFormsProps) => {

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


    const title = initalData ? 'Edit color' : 'Create color';
    const description = initalData ? 'Edit a color' : 'Add a new color';
    const toastMessage = initalData ? "color updated" : "color created"
    const ButtonText = initalData ? "Save Changes" : "Create"


    const onSubmit = async(data: SettingFormValues)=>{
        try {
            setLoading(true);
            if(initalData){
              await axios.patch(`/api/${params.storeId}/colors/${params.colorId}`, data)

            }
            else{
              await axios.post(`/api/${params.storeId}/colors`, data)

            }

         
            router.push(`/${params.storeId}/colors`);
            router.refresh();
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
                      name="name"
                      render={({field})=>(
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input 
                            disabled={loading} 
                            placeholder='Enter Name ' {...field}>

                            </Input>
                          </FormControl>
                          <FormMessage/>


                        </FormItem>
                      )}/>


<div className='h-8'></div>

                      <FormField control={form.control}
                      name="value"
                      render={({field})=>(
                        <FormItem>
                          <FormLabel>Value</FormLabel>
                          <FormControl>
                            <Input 
                            disabled={loading} 
                            placeholder='Enter Value ' {...field}>

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

export default ColorForms