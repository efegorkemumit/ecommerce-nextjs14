import React from 'react'
import BillboardClient from './components/BillboardClient'
import prismadb from '@/lib/prismadb'
import { BillboardColumn } from './components/columns'
import {  format } from "date-fns";

const Bilboard = async({params}: {params : {storeId : string}}) => {

  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId : params.storeId
    },
    orderBy:{
      createAt : 'desc'
    }
  })

  const formattedBillbords :  BillboardColumn[]= billboards.map((item)=>({
    id:item.id,
    label:item.label,
    createAt:format(item.createAt, 'MMMM do, yyyy hh:ss'),
  }))




  return (
    <div className='flex-col'>
    <div className='flex-1 space-y-5 p-8 pt-6'>
      <BillboardClient data={formattedBillbords}/>


    </div>
  </div>
  )
}

export default Bilboard