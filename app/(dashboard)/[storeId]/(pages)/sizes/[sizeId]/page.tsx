import prismadb from '@/lib/prismadb'
import React from 'react'
import SizeForms from './components/SizeForms'

const sizePage = async( {params} : {params: {sizeId :string }}) => {

    const size = await prismadb.size.findUnique({
        where:{
            id:params.sizeId
        }
    })
  return (
    <div className='flex-col'>
    <div className='flex-1 space-y-5 p-8 pt-6'>

        <SizeForms initalData={size} ></SizeForms>




    </div>
  </div>
  )
}

export default sizePage