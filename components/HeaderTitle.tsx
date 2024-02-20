import React from 'react'

interface HeaderTitleProps{
    title:string,
    description: string
}

const HeaderTitle = ({description, title}:HeaderTitleProps) => {
  return (
    <div>
    <h2 className='text-4xl font-bold mb-4'>{title}</h2>
    <p className='text-sm text-slate-500'>

        {description}

    </p>
         </div>

  )
}

export default HeaderTitle