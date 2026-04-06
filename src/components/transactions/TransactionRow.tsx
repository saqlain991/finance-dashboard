"use client"

import { Row, flexRender } from "@tanstack/react-table"
import { Transaction } from "@/types"

export function TransactionRow({ row }: { row: Row<Transaction> }) {
  return (
    <tr className="border-b border-border/50 last:border-0 hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors">
      {row.getVisibleCells().map((cell) => (
        <td key={cell.id} className="px-4 py-4 align-middle">
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </td>
      ))}
    </tr>
  )
}
