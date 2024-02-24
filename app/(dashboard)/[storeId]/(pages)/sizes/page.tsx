import React from 'react'
import prismadb from '@/lib/prismadb'
import { sizeColumn } from './components/columns'
import {  format } from "date-fns";
import SizeClient from './components/SizeClient';

const Bilboard = async({params}: {params : {storeId : string}}) => {

  const sizes = await prismadb.size.findMany({
    where: {
      storeId : params.storeId
    },
    orderBy:{
      createAt : 'desc'
    }
  })

  const formattedBillbords :  sizeColumn[]= sizes.map((item)=>({
    id:item.id,
    name:item.name,
    value:item.value,
    createAt:format(item.createAt, 'MMMM do, yyyy hh:ss'),
  }))




  return (
    <div className='flex-col'>
    <div className='flex-1 space-y-5 p-8 pt-6'>
      <SizeClient data={formattedBillbords}/>


    </div>
  </div>
  )
}

export default Bilboard