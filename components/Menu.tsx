'use client'
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation'
import React from 'react'

const Menu = () => {

    const pathname = usePathname();
    const params = useParams();

    const routes = [
        {
            href: `/${params.storeId}/settings`,
            label: "Settings",
            active: pathname === `/${params.storeId}/settings`
        },

        {
            href: `/${params.storeId}/billboard`,
            label: "Billboard",
            active: pathname === `/${params.storeId}/billboard`
        },

        {
            href: `/${params.storeId}/categories`,
            label: "Category",
            active: pathname === `/${params.storeId}/categories`
        },

        {
            href: `/${params.storeId}/colors`,
            label: "Color",
            active: pathname === `/${params.storeId}/colors`
        },

        {
            href: `/${params.storeId}/sizes`,
            label: "Size",
            active: pathname === `/${params.storeId}/sizes`
        },

        {
            href: `/${params.storeId}/products`,
            label: "Product",
            active: pathname === `/${params.storeId}/products`
        },

        {
            href: `/${params.storeId}/orders`,
            label: "Order",
            active: pathname === `/${params.storeId}/orders`
        },



    ]

  return (
   <nav className='mx-4 flex items-center space-x-4'>
    {routes.map((route)=>(

       <Link  
       key={route.href}
        href={route.href}
        
        className={cn("text-sm font-semibold text-slate-500 hover:text-slate-800",
        route.active ? "text-red-700"   : " text-muted-foreground"

        )  }
        
        >
       
       
       {route.label}
       
       </Link>



    ))}


    </nav>
  )
}

export default Menu