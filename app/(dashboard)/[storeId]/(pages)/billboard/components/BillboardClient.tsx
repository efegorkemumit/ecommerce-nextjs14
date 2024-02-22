'use client'
import ApiList from '@/components/ApiList';
import HeaderTitle from '@/components/HeaderTitle'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import React, { useState } from 'react'

const BillboardClient = () => {

    const params = useParams();
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);


  return (
    
    <>
    
  
    <div className='flex items-center justify-between'>

           <HeaderTitle title='Billboard (0)' description='Manage Billboard
           update and delete'></HeaderTitle>
           <Button disabled={loading}
           variant="default"
           size="sm"
           onClick={()=>router.push(`/${params.storeId}/billboard/new`)}
           >

            <Plus className='h-4 w-4 mr-2'></Plus>
            Add Billboard
           </Button>



    </div>

    <Separator className='my-3'></Separator>
    <ApiList name='billboards' Idname='billboardId'></ApiList>

    </>

  )
}

export default BillboardClient