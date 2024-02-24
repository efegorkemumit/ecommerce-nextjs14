'use client'

import { Category, product, Image, Product, Size, Color } from '@prisma/client'
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
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import ImageUpload from '@/components/ImageUpload';
import axios from 'axios';
import toast from 'react-hot-toast';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from '@/components/ui/checkbox';


interface  ProductFormsProps{
    initalData : Product & {
      images : Image[]

    } | null;
    categories : Category[];
    sizes : Size[];
    colors : Color[];
}

type ProductFormValues = z.infer<typeof formSchema>

const formSchema = z.object({
    name:z.string().min(1),
    images : z.object({url:z.string()}).array(),
    price: z.coerce.number().min(1),
    categoryId: z.string().min(1),
    colorId: z.string().min(1),
    sizeId: z.string().min(1),
    isFeatured: z.boolean().default(false).optional(),
    isArchived: z.boolean().default(false).optional()

})




const ProductForms = ({initalData, categories, sizes , products, colors}:ProductFormsProps) => {

    const params = useParams();
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);


    const defaultValues = initalData ? {
      ...initalData,
      price:parseFloat(String(initalData?.price)),
    } : {
      name : '',
      images: [],
      price: 0,
      categoryId:'',
      colorId: '',
      sizeId:'',
      isFeatured:false,
      isArchived:false
    }

    const form = useForm<ProductFormValues>({
        resolver:zodResolver(formSchema),
        defaultValues
    })


    const title = initalData ? 'Edit product' : 'Create product';
    const description = initalData ? 'Edit a product' : 'Add a new product';
    const toastMessage = initalData ? "product updated" : "product created"
    const ButtonText = initalData ? "Save Changes" : "Create"


    const onSubmit = async(data: ProductFormValues)=>{
        try {
            setLoading(true);
            if(initalData){
              await axios.patch(`/api/${params.storeId}/products/${params.productId}`, data)

            }
            else{
              await axios.post(`/api/${params.storeId}/products`, data)

            }

         
            router.push(`/${params.storeId}/products`);
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
                    <form onSubmit={form.handleSubmit(onSubmit)} className='space-x-7 w-full'>


                    <FormField control={form.control}
                      name="images"
                      render={({field})=>(
                        <FormItem>
                          <FormLabel>Image</FormLabel>
                          <FormControl>
                            <ImageUpload
                            value={field.value.map((image)=> image.url)}
                            disabled={loading}
                            onChange={(url)=>field.onChange([...field.value, {url}])}
                            onRemove={(url) => field.onChange([...field.value.filter((current)=>current.url !== url)   ])}
                            
                            
                            >

                            </ImageUpload>     
                          </FormControl>
                          <FormMessage/>


                        </FormItem>
                      )}/>

<div className='h-8'></div>

<div className='md:grid md:grid-cols-3 gap-8'>

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




                      <FormField control={form.control}
                      name="price"
                      render={({field})=>(
                        <FormItem>
                          <FormLabel>Price</FormLabel>
                          <FormControl>
                            <Input 
                            disabled={loading} 
                            type='number'
                            placeholder='Enter price ' {...field}>

                            </Input>
                          </FormControl>
                          <FormMessage/>


                        </FormItem>
                      )}/>



<FormField control={form.control}
                      name="categoryId"
                      render={({field})=>(
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                         
              <Select disabled={loading} onValueChange={field.onChange}
              value={field.value} defaultValue={field.value}>
                <SelectTrigger className="flex w-1/2">
                  <SelectValue defaultValue={field.value} placeholder="Select a Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup> 
                    {categories.map((category)=>(
                      <SelectItem key={category.id}
                       value={category.id}>{category.name}</SelectItem>

                    ))}

                 
                  


                  </SelectGroup>
                </SelectContent>
              </Select>
                         
                         
                         
                         
                         
                         <FormMessage/>


                        </FormItem>
                      )}/>

                      
<FormField control={form.control}
                      name="colorId"
                      render={({field})=>(
                        <FormItem>
                          <FormLabel>Color</FormLabel>
                         
              <Select disabled={loading} onValueChange={field.onChange}
              value={field.value} defaultValue={field.value}>
                <SelectTrigger className="flex w-1/2">
                  <SelectValue defaultValue={field.value} placeholder="Select a Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup> 
                    {colors.map((color)=>(
                      <SelectItem key={color.id}
                       value={color.id}>{color.name}</SelectItem>

                    ))}

                 
                  


                  </SelectGroup>
                </SelectContent>
              </Select>
                         
                         
                         
                         
                         
                         <FormMessage/>


                        </FormItem>
                      )}/>


<FormField control={form.control}
                      name="sizeId"
                      render={({field})=>(
                        <FormItem className='mb-4' >
                          <FormLabel>Size</FormLabel>
                         
              <Select disabled={loading} onValueChange={field.onChange}
              value={field.value} defaultValue={field.value}>
                <SelectTrigger className="flex w-1/2">
                  <SelectValue defaultValue={field.value} placeholder="Select a Size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup> 
                    {sizes.map((size)=>(
                      <SelectItem key={size.id}
                       value={size.id}>{size.name}</SelectItem>

                    ))}

                 
                  


                  </SelectGroup>
                </SelectContent>
              </Select>
                         
                         
                         
                         
                         
                         <FormMessage/>


                        </FormItem>
                      )}/>


<FormField control={form.control}
                      name="isFeatured"
                      render={({field})=>(
                        <FormItem className='flex flex-row items-start
                        space-x-3 rounded-md border p-5 bg-slate-100 mb-4' >
                          <FormLabel>isFeatured</FormLabel>

                          
                         
                          <FormControl>
                          <div className="flex items-center space-x-2">
      <Checkbox id="terms" checked={field.value} onCheckedChange={field.onChange}  />
     
     <div className='space-y-1 leading-none'>
      <FormLabel>Featured</FormLabel>
      <FormDescription>
        Lorem ipsum dolor sit amet consectetur adipisicing.
      </FormDescription>
      </div>
    </div>



                          </FormControl>
                         <FormMessage/>


                        </FormItem>
                      )}/>
<FormField control={form.control}
                      name="isArchived"
                      render={({field})=>(
                        <FormItem className='flex flex-row items-start
                        space-x-3 rounded-md border p-5 bg-slate-100 ' >
                          <FormLabel>isArchived</FormLabel>
                          <FormControl>
                          <div className="flex items-center space-x-2">
      <Checkbox id="terms" checked={field.value} onCheckedChange={field.onChange}  />
      <div className='space-y-1 leading-none'>
      <FormLabel>Archived</FormLabel>
      <FormDescription>
        Lorem ipsum dolor sit amet consectetur adipisicing.
      </FormDescription>
      </div>
    </div>



                          </FormControl>
                         <FormMessage/>


                        </FormItem>
                      )}/>


</div>
<div className='h-8'></div>


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

export default ProductForms