"use client"

import { useState } from "react"
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { useTransactions, useApp, useRole } from "@/context/AppContext"
import { Transaction } from "@/types"
import { formatCurrency, formatDate, cn } from "@/lib/utils"
import { EmptyState } from "@/components/shared/EmptyState"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Edit, Trash, ChevronLeft, ChevronRight, EyeIcon, Laptop, Plane, ShoppingCart, Zap, FileText, EllipsisVertical } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const columnHelper = createColumnHelper<Transaction>()

export function TransactionTable({ onEdit }: { onEdit?: (t: Transaction) => void }) {
  const { transactions, total, totalPages } = useTransactions()
  const { state, setFilter, dispatch } = useApp()
  const { isAdmin, isViewer } = useRole()
  
  const columns = [
    columnHelper.display({
      id: "select",
      header: () => (
        <div className="flex justify-center"><Checkbox className="rounded" /></div>
      ),
      cell: () => <div className="flex justify-center"><Checkbox className="rounded-md" /></div>,
      size: 60,
    }),
    columnHelper.accessor("activity", {
      header: () => <span className="text-[10px] font-black uppercase text-neutral-400 tracking-[0.2em] pl-4">Activity</span>,
      cell: info => {
        const tx = info.row.original
        const Icon = tx.category === 'Technology' ? Laptop : 
                     tx.category === 'Travel' ? Plane : 
                     tx.category === 'Food' ? ShoppingCart : Zap
                     
        return (
          <div className="flex items-center gap-4 py-3 pl-4">
            <div className={cn(
                "size-11 rounded-2xl flex items-center justify-center shadow-sm transition-all duration-300 group-hover:scale-105",
                tx.type === 'income' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-500' : 'bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400'
            )}>
                <Icon className="size-5.5" />
            </div>
            <div className="flex flex-col gap-0.5 min-w-0">
                <span className="text-sm font-black text-neutral-900 dark:text-neutral-100 truncate group-hover:text-[#0CC8A8] transition-colors">{tx.activity}</span>
                <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest leading-none">{tx.id}</span>
            </div>
          </div>
        )
      },
    }),
    columnHelper.accessor("category", {
      header: () => <span className="text-[10px] font-black uppercase text-neutral-400 tracking-[0.2em]">Category</span>,
      cell: info => (
        <Badge variant="outline" className="text-[10px] font-black uppercase tracking-widest border-neutral-100 dark:border-neutral-800 bg-white/50 dark:bg-transparent px-2.5 py-1 rounded-lg">
            {info.getValue()}
        </Badge>
      ),
    }),
    columnHelper.accessor("price", {
      header: () => <span className="text-[10px] font-black uppercase text-neutral-400 tracking-[0.2em]">Price</span>,
      cell: info => {
        const tx = info.row.original
        return (
          <span className={cn(
            "text-sm font-black",
            tx.type === 'income' ? 'text-emerald-500' : 'text-neutral-900 dark:text-neutral-100'
          )}>
            {tx.type === 'income' ? '+' : '-'}${info.getValue().toLocaleString()}
          </span>
        )
      },
    }),
    columnHelper.accessor("status", {
      header: () => <span className="text-[10px] font-black uppercase text-neutral-400 tracking-[0.2em] text-center w-full block">Status</span>,
      cell: info => {
        const val = info.getValue()
        return (
          <div className="flex justify-center">
            <div className={cn(
                "inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-tight shadow-sm",
                val === 'Completed' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-500' : 
                val === 'Pending' ? 'bg-rose-50 text-rose-600 dark:bg-rose-500/20 dark:text-rose-50' : 'bg-amber-50 text-amber-600 dark:bg-amber-500/20 dark:text-amber-500'
            )}>
                <div className={cn("size-2 rounded-full shadow-current animate-pulse", 
                    val === 'Completed' ? 'bg-emerald-600 dark:bg-emerald-500' : 
                    val === 'Pending' ? 'bg-rose-600 dark:bg-rose-500' : 'bg-amber-600 dark:bg-amber-500'
                )} />
                {val}
            </div>
          </div>
        )
      },
    }),
    columnHelper.accessor("date", {
      header: () => <span className="text-[10px] font-black uppercase text-neutral-400 tracking-[0.2em]">Date</span>,
      cell: info => <span className="text-[11px] font-black text-neutral-400 uppercase tracking-widest">{info.getValue()}</span>,
    }),
    columnHelper.display({
      id: "actions",
      header: "",
      cell: (info) => {
        return (
          <div className="flex items-center justify-end gap-1 pr-6">
            <Button variant="ghost" size="icon" className="size-9 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity hover:bg-neutral-100 dark:hover:bg-neutral-800">
                <EyeIcon className="size-4.5 text-neutral-400" />
            </Button>
            {isAdmin && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="size-9 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800">
                      <EllipsisVertical className="size-4.5 text-neutral-400" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="rounded-2xl border-neutral-100 dark:border-neutral-800 p-2 shadow-xl">
                  <DropdownMenuItem onClick={() => onEdit?.(info.row.original)} className="rounded-xl font-bold text-xs p-2">
                    <Edit className="size-4 mr-2" /> Edit Activity
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    className="rounded-xl font-bold text-xs p-2 text-rose-500 focus:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors"
                    onClick={() => dispatch({ type: "DELETE_TRANSACTION", payload: info.row.original.id })}
                  >
                    <Trash className="size-4 mr-2" /> Delete Entry
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            {!isAdmin && (
                <Button variant="ghost" size="icon" className="size-9 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800">
                    <EllipsisVertical className="size-4.5 text-neutral-400" />
                </Button>
            )}
          </div>
        )
      },
    }),
  ]

  const table = useReactTable({
    data: transactions,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  // Pagination logic mapped to global state
  const page = state.filters.page
  
  if (total === 0) {
    return (
      <div className="bg-white dark:bg-neutral-900/40 rounded-[2rem] border border-neutral-100 dark:border-none p-12 text-center shadow-sm">
        <EmptyState title="No transactions found" description="Adjust your filters or add a new transaction." />
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-neutral-900/40 rounded-[2rem] shadow-sm border border-neutral-100 dark:border-none w-full overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left whitespace-nowrap">
          <thead className="text-xs text-text-secondary bg-neutral-50/50 dark:bg-neutral-800/50 border-b border-neutral-100 dark:border-neutral-800">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id} className="h-12 px-2 first:rounded-tl-[2rem]">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id} className="border-neutral-100 dark:border-neutral-800 hover:bg-neutral-50/50 dark:hover:bg-neutral-800/20 transition-colors group">
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between px-8 py-6 border-t border-neutral-100 dark:border-neutral-800 bg-neutral-50/30 dark:bg-neutral-800/10 rounded-b-[2rem] gap-4">
          <div className="text-[11px] font-black uppercase text-neutral-400 tracking-[0.15em]">
            Showing {(page - 1) * state.filters.pageSize + 1} to {Math.min(page * state.filters.pageSize, total)} of {total} entries
          </div>
          <div className="flex gap-2 text-sm">
            <Button 
              variant="outline"
              size="icon"
              onClick={() => setFilter({ page: Math.max(1, page - 1) })}
              disabled={page === 1}
              className="size-10 rounded-xl border-neutral-100 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800 disabled:opacity-30"
            >
              <ChevronLeft className="size-4" />
            </Button>
            <div className="flex gap-1.5 px-1.5 py-1.5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 shadow-sm">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button 
                  key={i} 
                  onClick={() => setFilter({ page: i + 1 })}
                  className={cn(
                    "size-7 rounded-lg transition-all font-black text-[10px] flex items-center justify-center",
                    page === i + 1 
                      ? "bg-[#0CC8A8] text-white shadow-lg shadow-[#0CC8A8]/30" 
                      : "hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                  )}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <Button 
              variant="outline"
              size="icon"
              onClick={() => setFilter({ page: Math.min(totalPages, page + 1) })}
              disabled={page === totalPages}
              className="size-10 rounded-xl border-neutral-100 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800 disabled:opacity-30"
            >
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
