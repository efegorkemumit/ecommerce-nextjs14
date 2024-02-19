import React from 'react'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import prismadb from '@/lib/prismadb'

interface LayoutStoreIdProps{
    children :React.ReactNode

}


const StoreId =  async ({children}:LayoutStoreIdProps) => {

    const {userId} = auth();

    if(!userId){
        redirect('/sign-in')
    }

    const store = await prismadb.store.findFirst({
        where:{
            userId,
        }
    })

    if(!store){
        redirect(`/`)
    }

  return (
    <div>
        {children}
    </div>
  )
}

export default StoreId