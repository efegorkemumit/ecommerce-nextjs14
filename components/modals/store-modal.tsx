
'use client'
import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Modal from './modal';
import { useStoremodal } from '@/hooks/use-store-modal';


const formSchema = z.object({
    name:z.string().min(1),
})

const StoreModal = () => {
    const storeModal = useStoremodal()
  return (
    <Modal
    title='create Store'
    description='Add a new store'
    isOpen={storeModal.isOpen}
    onClose={storeModal.onClose}>

        Form

    </Modal>
  )
}

export default StoreModal