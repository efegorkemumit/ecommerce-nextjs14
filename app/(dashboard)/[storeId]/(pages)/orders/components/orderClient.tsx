'use client'
import ApiList from '@/components/ApiList';
import HeaderTitle from '@/components/HeaderTitle'
import { DataTable } from '@/components/datatable';
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import React, {  useState } from 'react'
import { OrderColumn, columns } from './columns';

interface orderClientProps{
  data:OrderColumn[];
}

const OrderClient = ({data} :orderClientProps) => {

  return (
    
    <>
    
  
    <div className='flex items-center justify-between'>

           <HeaderTitle title={`order ( ${data.length} )`} description='Manage order
           update and delete'></HeaderTitle>
         

       



    </div>  <Separator className='my-3'></Separator>

<DataTable searchkey='label' data={data} columns={columns} />



    </>

  )
}

export default OrderClient