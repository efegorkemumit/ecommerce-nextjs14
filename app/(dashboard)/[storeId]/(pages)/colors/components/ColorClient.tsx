'use client'
import ApiList from '@/components/ApiList';
import HeaderTitle from '@/components/HeaderTitle'
import { DataTable } from '@/components/datatable';
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import React, {  useState } from 'react'
import { colorColumn, columns } from './columns';

interface colorClientProps{
  data:colorColumn[];
}

const ColorClient = ({data} :colorClientProps) => {

    const params = useParams();
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

  
    
    

  
  return (
    
    <>
    
  
    <div className='flex items-center justify-between'>

           <HeaderTitle title={`Color ( ${data.length} )`} description='Manage color
           update and delete'></HeaderTitle>
           <Button disabled={loading}
           variant="default"
           size="sm"
           onClick={()=>router.push(`/${params.storeId}/colors/new`)}
           >

            <Plus className='h-4 w-4 mr-2'></Plus>
            Add color
           </Button>



    </div>

    <Separator className='my-3'></Separator>

    <DataTable searchkey='label' data={data} columns={columns} />
    <ApiList name='colors' Idname='colorId'></ApiList>

    </>

  )
}

export default ColorClient