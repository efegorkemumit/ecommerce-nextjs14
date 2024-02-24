"use client"

import { ColumnDef } from "@tanstack/react-table"
import CellAction from "./cell-action";

export type BillboardColumn = {
  id: string;
  label: string;
  createAt: string;
}

export const columns: ColumnDef<BillboardColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "value",
    header: "Value",
    cell:({row})=>(
      <div className="flex items-center gap-x-2">
        {row.original.value}
        <div className="h-6 w-6 rounded-full border"
        style={{backgroundColor:row.original.value}}>

        </div>


      </div>
    )
  },

  {
    accessorKey: "createAt",
    header: "Date",
  },
  {
    id: "actions",
    cell:({row}) =><CellAction data={row.original}></CellAction>
  },
 
]
