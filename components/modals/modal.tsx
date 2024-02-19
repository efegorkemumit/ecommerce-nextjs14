'use client'
import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"


interface ModalProps{
    title:string;
    description : string;
    isOpen:boolean;
    onClose:()=>void;
    children?:React.ReactNode;
}

const Modal = ({description,isOpen, onClose,  title,children}:ModalProps) => {
  
    const onChange = (open:boolean)=>{
        if(!open){
            onClose();
        }
    }
    const [isMounted, setIsMounted] = useState(false);

    useEffect(()=>{
        setIsMounted(true);
    }, []);

    if(!isMounted){
        return null;
    }
  
    return (
    <Dialog open={isOpen} onOpenChange={onChange}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>{title}</DialogTitle>
      <DialogDescription>
      {description}
      </DialogDescription>
    </DialogHeader>
    <div>
        {children}
    </div>
  </DialogContent>
</Dialog>
  )
}

export default Modal