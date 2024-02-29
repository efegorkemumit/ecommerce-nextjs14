import React from 'react'
import prismadb from '@/lib/prismadb'
import {  format } from "date-fns";
import { OrderColumn } from './components/columns';
import OrderClient from './components/orderClient';

const Order = async({params}: {params : {storeId : string}}) => {

  const orders = await prismadb.order.findMany({
    where: {
      storeId : params.storeId
    },
    include:{
        orderItems:{
            include:{
                product:true
            }
        }
    },
    orderBy:{
        createdAt : 'desc'
    }
  })

  const formattedOrders :  OrderColumn[]= orders.map((item)=>({
    id:item.id,
    phone:item.phone,
    address:item.address,
    products: item.orderItems.map((orderItem)=> orderItem.product.name).join(','),
    isPaid: item.isPaid,
    createdAt:format(item.createdAt, 'MMMM do, yyyy hh:ss'),
  }))




  return (
    <div className='flex-col'>
    <div className='flex-1 space-y-5 p-8 pt-6'>
      <OrderClient data={formattedOrders}/>


    </div>
  </div>
  )
}

export default Order