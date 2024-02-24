import prismadb from '@/lib/prismadb'
import React from 'react'
import ColorForms from './components/colorForms'

const colorPage = async( {params} : {params: {colorId :string }}) => {

    const color = await prismadb.color.findUnique({
        where:{
            id:params.colorId
        }
    })
  return (
    <div className='flex-col'>
    <div className='flex-1 space-y-5 p-8 pt-6'>

        <ColorForms initalData={color} ></ColorForms>




    </div>
  </div>
  )
}

export default colorPage