'use client'
import React, { useEffect, useState } from 'react'

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"

interface AlertModalProps{
    isOpen:boolean;
    onClose:()=>void;
    onConfirm:()=>void;
    loading:boolean
}


const AlertModal = ({onConfirm, isOpen, loading, onClose}:AlertModalProps) => {
  
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
    <AlertDialog open={isOpen} onOpenChange={onChange}>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel disabled={loading} onClick={onClose}>Cancel</AlertDialogCancel>
      <AlertDialogAction disabled={loading} onClick={onConfirm}>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
  )
}

export default AlertModal