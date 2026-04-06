"use client"

import { useApp } from "@/context/AppContext"
import { Search, SortAsc, SortDesc, Filter } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { STATUS_OPTIONS, TYPE_OPTIONS } from "@/lib/constants"
import { SortField } from "@/types"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export function TransactionFilters() {
  const { state, setFilter } = useApp()
  const f = state.filters

  return (
    <div className="flex flex-col lg:flex-row gap-5 mb-8 justify-between items-start lg:items-center">
      <div className="relative group/search w-full lg:w-96">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-neutral-400 group-focus-within/search:text-[#0CC8A8] transition-colors z-10 pointer-events-none" />
        <Input
          placeholder="Search activity, ID or category..."
          value={f.search}
          onChange={(e) => setFilter({ search: e.target.value })}
          className="h-12! w-full bg-white dark:bg-neutral-800/50! border-neutral-100 dark:border-neutral-800! pl-11 text-sm font-bold placeholder:text-neutral-400 rounded-2xl focus-visible:ring-2 focus-visible:ring-[#0CC8A8]/20 transition-all shadow-sm outline-none"
        />
      </div>

      <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
        <div className="flex items-center gap-2 bg-neutral-50 dark:bg-neutral-900/50 p-1.5 rounded-2xl border border-neutral-100 dark:border-neutral-800/50 shadow-sm">
            <Select value={f.status} onValueChange={(v: any) => setFilter({ status: v })}>
                <SelectTrigger className="w-[130px] h-9 bg-transparent border-none font-black text-[10px] uppercase tracking-widest gap-2 shadow-none focus:ring-0">
                    <Filter className="size-3 text-[#0CC8A8]" />
                    <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-neutral-100 dark:border-neutral-800">
                    {STATUS_OPTIONS.map(opt => (
                    <SelectItem key={opt} value={opt} className="capitalize font-bold text-xs">{opt}</SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <div className="w-[1px] h-4 bg-neutral-200 dark:bg-neutral-700 mx-1" />

            <Select value={f.type} onValueChange={(v: any) => setFilter({ type: v })}>
                <SelectTrigger className="w-[110px] h-9 bg-transparent border-none font-black text-[10px] uppercase tracking-widest gap-2 shadow-none focus:ring-0">
                    <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-neutral-100 dark:border-neutral-800">
                    {TYPE_OPTIONS.map(opt => (
                    <SelectItem key={opt} value={opt} className="capitalize font-bold text-xs">{opt}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
        
        <div className="flex items-center gap-2 bg-neutral-50 dark:bg-neutral-900/50 p-1.5 rounded-2xl border border-neutral-100 dark:border-neutral-800/50 shadow-sm">
            <Select value={f.sortField} onValueChange={(v: any) => setFilter({ sortField: v as SortField })}>
                <SelectTrigger className="w-[130px] h-9 bg-transparent border-none font-black text-[10px] uppercase tracking-widest gap-2 shadow-none focus:ring-0">
                    <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-neutral-100 dark:border-neutral-800">
                    <SelectItem value="date" className="font-bold text-xs">Date</SelectItem>
                    <SelectItem value="amount" className="font-bold text-xs">Amount</SelectItem>
                    <SelectItem value="activity" className="font-bold text-xs">Activity</SelectItem>
                    <SelectItem value="status" className="font-bold text-xs">Status</SelectItem>
                </SelectContent>
            </Select>

            <button 
                onClick={() => setFilter({ sortOrder: f.sortOrder === 'asc' ? 'desc' : 'asc' })}
                className="flex items-center justify-center size-9 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors group"
                title="Toggle Sort Order"
            >
                {f.sortOrder === 'asc' 
                    ? <SortAsc className="size-4 text-neutral-400 group-hover:text-[#0CC8A8]" /> 
                    : <SortDesc className="size-4 text-neutral-400 group-hover:text-[#0CC8A8]" />
                }
            </button>
        </div>
      </div>
    </div>
  )
}
