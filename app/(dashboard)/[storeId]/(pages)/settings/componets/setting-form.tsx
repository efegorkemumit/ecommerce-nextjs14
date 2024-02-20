'use client'

import AlertModal from '@/components/modals/alert-modal';
import { Store } from '@prisma/client'
import { useParams, useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import HeaderTitle from '@/components/HeaderTitle';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import toast from 'react-hot-toast';


interface SettingFormsProps{
    initalData:Store;
}

type SettingFormValues = z.infer<typeof formSchema>

const formSchema = z.object({
    name:z.string().min(2),
})


const SettingForms = ({initalData}:SettingFormsProps) => {


    const params = useParams();
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);


    const form = useForm<SettingFormValues>({
        resolver:zodResolver(formSchema),
        defaultValues:initalData
    })


    const onSubmit = async(data: SettingFormValues)=>{
        try {
            setLoading(true);
            await axios.patch(`/api/stores/${params.storeId}`, data);
            router.refresh();
            toast.success("store update")
            
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
            await axios.delete(`/api/stores/${params.storeId}`);
            router.refresh();
            router.push('/');
            toast.success("store deleted")
            
        } catch (error) {
            toast.error("Something went wrong")
            
        }
        finally{
            setLoading(false);
            setOpen(false);
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

           <HeaderTitle title='Store Settings' description='Manage store
           update and delete'></HeaderTitle>
           <Button disabled={loading}
           variant="destructive"
           size="sm"
           onClick={()=>setOpen(true)}
           >

            <Trash className='h-4 w-4'></Trash>
           </Button>
          


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
                            placeholder='E-commerce' {...field}>

                            </Input>
                          </FormControl>
                          <FormMessage/>


                        </FormItem>
                      )}/>

<Button  disabled={loading}  variant="default" type='submit' 
className='ml-auto mt-5'>Contunie</Button>

                    </form>
                  </Form>




    
    
    
    </>
  )
}

export default SettingForms