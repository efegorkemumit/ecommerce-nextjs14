import React from 'react'

interface AuthLayoutProps{
    children:React.ReactNode;

}

const AuthLayout = ({children}:AuthLayoutProps) => {
  return (
    <div className='flex items-center justify-center min-h-screen'>
        <div className='flex flex-col items-center'>
        {children}    
        </div>
 
    </div>
  )
}

export default AuthLayout