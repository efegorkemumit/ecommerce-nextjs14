import React from 'react'
import prismadb from '@/lib/prismadb'
import { ColorColumn } from './components/columns'
import {  format } from "date-fns";
import ColorClient from './components/ColorClient';

const Bilboard = async({params}: {params : {storeId : string}}) => {

  const colors = await prismadb.color.findMany({
    where: {
      storeId : params.storeId
    },
    orderBy:{
      createAt : 'desc'
    }
  })

  const formattedBillbords :  colorColumn[]= colors.map((item)=>({
    id:item.id,
    name:item.name,
    value:item.value,
    createAt:format(item.createAt, 'MMMM do, yyyy hh:ss'),
  }))




  return (
    <div className='flex-col'>
    <div className='flex-1 space-y-5 p-8 pt-6'>
      <ColorClient data={formattedBillbords}/>


    </div>
  </div>
  )
}

export default Bilboard