import prismadb from '@/lib/prismadb'
import React from 'react'
import CategoryForms from './components/CategoryForms'

const CategoryPage = async( {params} : {params: {categoryId :string, storeId:string }}) => {

    const category = await prismadb.category.findUnique({
        where:{
            id:params.categoryId
        }
    })

    const billboards = await prismadb.billboard.findMany({
      where:{
          storeId:params.storeId
      }
  })

  return (
    <div className='flex-col'>
    <div className='flex-1 space-y-5 p-8 pt-6'>

        <CategoryForms initalData={category} billboards={billboards} ></CategoryForms>




    </div>
  </div>
  )
}

export default CategoryPage