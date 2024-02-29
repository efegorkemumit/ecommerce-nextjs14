import prismadb from "@/lib/prismadb"


export const getSalesCount= async(storeId: string)=>{
    const salescount = await prismadb.order.count({
        where:{
            storeId,
            isPaid:true
        }
    })

    return salescount;
}