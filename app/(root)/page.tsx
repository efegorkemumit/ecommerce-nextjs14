'use client'
import Image from "next/image";
import { Button } from "@/components/ui/button"
import Modal from "@/components/modals/modal";
import AlertModal from "@/components/modals/alert-modal";
import { useStoremodal } from "@/hooks/use-store-modal";
import { useEffect } from "react";


export default function Home() {
  const onOpen = useStoremodal((state)=>state.onOpen);
  const isOpen = useStoremodal((state)=>state.isOpen);

  useEffect(()=>{
    if(!isOpen){
      onOpen();
    }
  }, [isOpen, onOpen])


    return null;
}
