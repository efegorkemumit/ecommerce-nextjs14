import { UserButton, auth } from '@clerk/nextjs'
import React from 'react'
import Menu from './Menu'
import { redirect } from 'next/navigation';
import prismadb from '@/lib/prismadb';
import StoreSwitcher from './store-switcher';

const Navbar = async() => {

  const {userId} = auth();

  if(!userId){
    redirect('/sign-in')
  }

  const stores = await prismadb.store.findMany({
    where:{
      userId
    }
  })
  return (
    <div className='border-b shadow-md'>
      <div className='flex items-center p-4 px-4'>
     

        <StoreSwitcher items={stores}></StoreSwitcher>
        <Menu/>
        <div className='ml-auto'>
          <UserButton/>



        </div>

      </div>
      
      
      </div>
  )
}

export default Navbar