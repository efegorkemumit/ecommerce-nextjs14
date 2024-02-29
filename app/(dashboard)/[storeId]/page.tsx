import { getSalesCount } from '@/action/get-sale'
import { getTotalCount } from '@/action/get-total'
import HeaderTitle from '@/components/HeaderTitle'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import React from 'react'


interface DashboardPagesProps{
  params:{
    storeId:string
  }
}

const Dashboard = async({params}:DashboardPagesProps) => {

  const total = await getTotalCount(params.storeId)
  const sale = await getSalesCount(params.storeId)
  const stock = await getSalesCount(params.storeId)

  return (
    <div className='flex-col'>

      

      <div className='flex-1 space-x-3 space-y-3 p-10'>
        <HeaderTitle title='Dashboard' description='overview'></HeaderTitle>
        <Separator/>

        <div className='grid grid-cols-4 gap-9'>
          <Card>
            <CardHeader>
              <CardTitle>Total</CardTitle>
  
            </CardHeader>

            <CardContent>

              <div>{total} </div>
            </CardContent>

          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sales</CardTitle>
  
            </CardHeader>

            <CardContent>

              <div>{sale} </div>
            </CardContent>

          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Stock</CardTitle>
  
            </CardHeader>

            <CardContent>

              <div>{stock} </div>
            </CardContent>

          </Card>



        </div>




      </div>


    </div>
  )
}

export default Dashboard