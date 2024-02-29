"use client"

import { ColumnDef } from "@tanstack/react-table"
import CellAction from "./cell-action";

export type OrderColumn = {
  id: string;
  phone: string;
  address: string;
  isPaid:boolean;
  products:string;
  createAt:string
}

export const columns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: "products",
    header: "Products",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "address",
    header: "Address",
  },

  {
    accessorKey: "isPaid",
    header: "isPaid",
  },
 
 
]
