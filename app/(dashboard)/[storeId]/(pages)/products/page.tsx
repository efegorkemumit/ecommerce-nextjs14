import React from 'react'
import prismadb from '@/lib/prismadb'
import { productColumn } from './components/columns'
import {  format } from "date-fns";
import ProductClient from './components/ProductClient';

const Product = async({params}: {params : {storeId : string}}) => {

  const products = await prismadb.product.findMany({
    where: {
      storeId : params.storeId
    },
    include:{
      category:true,
      size:true,
      color:true,
    },
    orderBy:{
      createAt : 'desc'
    }
  })

  const formattedProduct :  productColumn[]= products.map((item)=>({
    id:item.id,
    name:item.name,
    isFeatured:item.isFeatured,
    isArchived:item.isArchived,
    price:item.price,
    category:item.category.name,
    size:item.size.name,
    color:item.color.name,
    createAt:format(item.createAt, 'MMMM do, yyyy hh:ss'),
  }))




  return (
    <div className='flex-col'>
    <div className='flex-1 space-y-5 p-8 pt-6'>
      <ProductClient data={formattedProduct}/>


    </div>
  </div>
  )
}

export default Product