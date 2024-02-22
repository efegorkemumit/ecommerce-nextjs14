'use client'

import React from 'react'
import ApiAlert from './ApiAlert';
import { useParams } from 'next/navigation';
import { Useorgin } from '@/hooks/use-origin';

interface ApiListProps{
    name : string;
    Idname: string;
}

const ApiList = ({Idname, name}:ApiListProps) => {

    const params = useParams();
    const origin = Useorgin();

    const baseUrl = `${origin}/api/${params.storeId}`;
  return (
    <>
    <ApiAlert title='GET' variant='public' description={`${baseUrl}/${name}`}/>
    <ApiAlert title='GET' variant='public' description={`${baseUrl}/${name}/{${Idname}}`}/>
    <ApiAlert title='POST' variant='admin' description={`${baseUrl}/${name}`}/>
    <ApiAlert title='PATCH' variant='admin' description={`${baseUrl}/${name}/{${Idname}}`}/>
    <ApiAlert title='DELETE' variant='admin' description={`${baseUrl}/${name}/{${Idname}}`}/>

    
    
    </>
  )
}

export default ApiList