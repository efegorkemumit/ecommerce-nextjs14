import React from 'react'
import { Badge, BadgeProps } from './ui/badge';
import { Copy, Terminal } from "lucide-react"
 
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { Button } from './ui/button';
import toast from 'react-hot-toast';


interface ApiAlertProps{
    title:string;
    description: string;
    variant : "public" | "admin"
}

const textMap: Record<ApiAlertProps["variant"], string>={
    public :"Public",
    admin : "Admin",
}
const variantMap : Record<ApiAlertProps["variant"], BadgeProps["variant"]>={
    public: "secondary",
    admin:"destructive"
}

const ApiAlert = ({description,  title, variant}:ApiAlertProps) => {

    const onCopy = (description:string)=>{
        navigator.clipboard.writeText(description);
        toast.success("API ROUTE COPY SUCCESSFULL")
    }
  return (
    <Alert>
    <Terminal className="h-4 w-4" />
    <AlertTitle className='flex items-center gap-4'>{title}
    <Badge variant={variantMap[variant]}>
    {textMap[variant]}
    </Badge>
   
    
    </AlertTitle>
    <AlertDescription className='mt-4 flex items-center'>
        <code className='bg-slate-200 p-2 rounded-xl '>
        {description}
        </code>

        <Button variant="outline" size="sm" 
        className='ml-auto' onClick={()=>onCopy(description)}>
            <Copy className='h-4 w-4'></Copy>

        </Button>
     
    </AlertDescription>
  </Alert>
  )
}

export default ApiAlert