"use client"

import React, { useState } from 'react'
import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
  } from "@/components/ui/command"

  import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { useStoremodal } from '@/hooks/use-store-modal';
import { useParams, useRouter } from 'next/navigation';


  import {
    Calculator,
    Calendar,
    CreditCard,
    Settings,
    Smile,
    User,
    Store,
    ChevronDown,
    Check
  } from "lucide-react"
import { Button } from './ui/button';
import { cn } from '@/lib/utils';


type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface StoreSwitcherProps extends PopoverTriggerProps{
    items: Record<string, any>[];
}


const StoreSwitcher = ({items}: StoreSwitcherProps) => {

    const storeModal = useStoremodal();
    const params = useParams();
    const router = useRouter();


    const [open, setOpen] = useState(false)

    const formatedItems = items.map((item)=>({
        label: item.name,
        value: item.id
    }));

    const currentStore =  formatedItems.find((item)=>item.value === params.storeId)
    

    const onStoreSelect = (store: {value: string, label:string})=>{
        setOpen(false);
        router.push(`/${store.value}`);
    }
  
  
    return (
    <Popover open={open} onOpenChange={setOpen}>
    <PopoverTrigger asChild>
        <Button 
        variant="outline"
        size="sm"
        role='combobox'
        aria-expanded={open}
        aria-label='Select a store'
        className='w-48  md:w-60 lg:w-80'
        
        >

            <Store className='mr-2 h-4 w-4'/>
            {currentStore?.label}
            <ChevronDown className='ml-auto h-4 w-4'/>

        </Button>

    </PopoverTrigger>
    <PopoverContent>

    <Command className="rounded-lg border shadow-md">
      <CommandInput placeholder="Store search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Stores">

            {formatedItems.map((store)=>(

                <CommandItem
                key={store.value}
                onSelect={()=>onStoreSelect(store)}>

                <Store className='mr-2 h-4 w-4'/>   
               
                <span>{store.label}</span>

                <Check className={cn(
                    "ml-auto h-4 w-4",
                    currentStore?.value === store.value
                    ? "opacity-100"
                    : "opacity-0"
                )} />
                </CommandItem>
            ))}

         

          
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup>
          <CommandItem 
          onSelect={()=>{
            setOpen(false)
            storeModal.onOpen()
          }}>
            <span>New Strore</span>
          </CommandItem>
        
        </CommandGroup>


      
      </CommandList>
    </Command>



    </PopoverContent>
  </Popover>
  )
}

export default StoreSwitcher