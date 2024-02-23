'use client'

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
import { Billboard, Category } from '@prisma/client';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


interface  categoryFormsProps{
    initalData : Category | null
    billboards : Billboard[];
}

type categoryFormValues = z.infer<typeof formSchema>

const formSchema = z.object({
    name:z.string().min(2),
    billboardId : z.string().min(2),
})




const CategoryForms = ({initalData, billboards}:categoryFormsProps) => {

    const params = useParams();
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const form = useForm<SettingFormValues>({
        resolver:zodResolver(formSchema),
        defaultValues:initalData || {
          name : '',
          billboardId: ''
        }
    })


    const title = initalData ? 'Edit category' : 'Create category';
    const description = initalData ? 'Edit a category' : 'Add a new category';
    const toastMessage = initalData ? "category updated" : "category created"
    const ButtonText = initalData ? "Save Changes" : "Create"


    const onSubmit = async(data: SettingFormValues)=>{
        try {
            setLoading(true);
            if(initalData){
              await axios.patch(`/api/${params.storeId}/categories/${params.categoryId}`, data)

            }
            else{
              await axios.post(`/api/${params.storeId}/categories`, data)

            }

         
            router.push(`/${params.storeId}/categories`);
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

                 


<div className='h-8'></div>

                      <FormField control={form.control}
                      name="name"
                      render={({field})=>(
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input 
                            disabled={loading} 
                            placeholder='Name ' {...field}>

                            </Input>
                          </FormControl>
                          <FormMessage/>


                        </FormItem>
                      )}/>


<FormField control={form.control}
                      name="billboardId"
                      render={({field})=>(
                        <FormItem>
                          <FormLabel>Billboard</FormLabel>
                         
              <Select disabled={loading} onValueChange={field.onChange}
              value={field.value} defaultValue={field.value}>
                <SelectTrigger className="w-full">
                  <SelectValue defaultValue={field.value} placeholder="Select a Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {billboards.map((billboards)=>(
                      <SelectItem key={billboards.id}
                       value={billboards.id}>{billboards.label}</SelectItem>

                    ))}

                 
                  


                  </SelectGroup>
                </SelectContent>
              </Select>
                         
                         
                         
                         
                         
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

export default CategoryForms