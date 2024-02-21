import prismadb from '@/lib/prismadb'
import React from 'react'
import BillboardForms from './components/BillboardForms'

const BillboardPage = async( {params} : {params: {billboardId :string }}) => {

    const billboard = await prismadb.billboard.findUnique({
        where:{
            id:params.billboardId
        }
    })
  return (
    <div className='flex-col'>
    <div className='flex-1 space-y-5 p-8 pt-6'>

        <BillboardForms initalData={billboard} ></BillboardForms>




    </div>
  </div>
  )
}

export default BillboardPage