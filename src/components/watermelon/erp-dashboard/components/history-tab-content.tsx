"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Download, EyeIcon, EllipsisVertical, Laptop, Plane, ShoppingCart, Zap, Filter, ChevronLeft, ChevronRight } from "lucide-react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from '@/components/ui/button'
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useApp, useTransactions, useRole } from "@/context/AppContext"
import { cn } from "@/lib/utils"
import { TransactionDetailsDialog } from "./transaction-details-dialog"
import { Transaction } from "@/types"

const HistoryTabContent = () => {
    const { state, setFilter } = useApp()
    const { transactions, total, totalPages } = useTransactions()
    const { isAdmin, isViewer } = useRole()
    
    // Dialog State
    const [selectedTx, setSelectedTx] = useState<Transaction | null>(null)
    const [dialogOpen, setDialogOpen] = useState(false)

    // Pagination
    const page = state.filters.page

    const cardBorderStyles = "relative before:absolute before:inset-0 before:rounded-[inherit] dark:before:border dark:before:border-neutral-800/70 dark:before:[mask-image:linear-gradient(to_bottom,black_20%,transparent_60%)] before:pointer-events-none"

    return (
        <div className='flex flex-col gap-8 px-7 max-md:px-5 py-8 pb-20 bg-neutral-50/30 dark:bg-transparent min-h-screen'>
            <div className="flex flex-col gap-8 w-full max-w-[1440px] mx-auto">
                <Card className={cn(
                    "bg-white dark:bg-neutral-900/40 border border-neutral-100 dark:border-none p-8 shadow-sm rounded-[2rem]",
                    cardBorderStyles
                )}>
                    <CardHeader className="p-0 flex flex-col lg:flex-row items-center justify-between pb-8 gap-6 border-b border-neutral-100 dark:border-neutral-800 mb-8">
                        <div className="space-y-1 text-center lg:text-left">
                            <CardTitle className="text-neutral-900 dark:text-neutral-100 text-2xl font-black uppercase tracking-tight">Transaction History<span className="text-[#0CC8A8]">.</span></CardTitle>
                            <p className="text-xs text-neutral-500 font-bold uppercase tracking-[0.2em] opacity-60">Full history of all your recorded financial activities</p>
                        </div>
                        <div className="flex flex-wrap items-center justify-center lg:justify-end gap-3 w-full lg:w-auto">
                            <div className="relative group/search flex-1 min-w-[240px] lg:flex-none lg:w-80">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-neutral-400 group-focus-within/search:text-[#0CC8A8] transition-colors z-10 pointer-events-none" />
                                <Input
                                    placeholder="Search by ID, activity or category..."
                                    value={state.filters.search}
                                    onChange={(e) => setFilter({ search: e.target.value })}
                                    className="h-12! w-full bg-neutral-50 dark:bg-neutral-800/50! border-neutral-100 dark:border-neutral-800! pl-11 text-sm font-bold placeholder:text-neutral-400 rounded-2xl focus-visible:ring-2 focus-visible:ring-[#0CC8A8]/20 transition-all shadow-none outline-none"
                                />
                            </div>
                            
                            <div className="flex items-center gap-2 p-1.5 bg-neutral-50 dark:bg-neutral-800/50 rounded-2xl border border-neutral-100 dark:border-neutral-800">
                                <Select value={state.filters.type || "all"} onValueChange={(val: any) => setFilter({ type: val })}>
                                    <SelectTrigger className="h-9 w-32 border-none bg-transparent font-black text-[10px] uppercase tracking-widest gap-2 shadow-none focus:ring-0">
                                        <Filter className="size-3 text-[#0CC8A8]" />
                                        <SelectValue placeholder="Type" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 rounded-xl">
                                        <SelectItem value="all" className="font-bold text-xs uppercase tracking-tight">All Types</SelectItem>
                                        <SelectItem value="income" className="font-bold text-xs uppercase tracking-tight text-emerald-500 text-center">Income</SelectItem>
                                        <SelectItem value="expense" className="font-bold text-xs uppercase tracking-tight">Expense</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {!isViewer && (
                                <Button variant="outline" className="h-12 rounded-2xl px-6 border-neutral-100 dark:border-neutral-800 font-black text-[10px] uppercase tracking-[0.2em] gap-2 hover:bg-[#0CC8A8] hover:text-white transition-all shadow-sm bg-white dark:bg-transparent">
                                    <Download className="size-4" />
                                    Export CSV
                                </Button>
                            )}
                        </div>
                    </CardHeader>
                    
                    <div className="relative overflow-hidden rounded-[1.5rem] border border-neutral-50 dark:border-neutral-800 shadow-sm">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-neutral-50 dark:bg-neutral-800/80 hover:bg-neutral-50 dark:hover:bg-neutral-800/80 border-b border-neutral-100 dark:border-neutral-800">
                                    <TableHead className="w-14 text-center"><Checkbox className="rounded" /></TableHead>
                                    <TableHead className="text-[11px] font-black uppercase text-neutral-400 tracking-[0.2em] h-14 pl-4">Activity Details</TableHead>
                                    <TableHead className="text-[11px] font-black uppercase text-neutral-400 tracking-[0.2em]">Classification</TableHead>
                                    <TableHead className="text-[11px] font-black uppercase text-neutral-400 tracking-[0.2em]">Transaction Index</TableHead>
                                    <TableHead className="text-[11px] font-black uppercase text-neutral-400 tracking-[0.2em]">Asset Value</TableHead>
                                    <TableHead className="text-[11px] font-black uppercase text-neutral-400 tracking-[0.2em] text-center">Execution Status</TableHead>
                                    <TableHead className="text-[11px] font-black uppercase text-neutral-400 tracking-[0.2em]">Timestamp</TableHead>
                                    <TableHead className="text-right pr-8"></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {transactions.length > 0 ? (
                                    transactions.map((tx) => {
                                        const Icon = tx.category === 'Technology' ? Laptop : 
                                                     tx.category === 'Travel' ? Plane : 
                                                     tx.category === 'Food' ? ShoppingCart : Zap
                                        
                                        return (
                                            <TableRow 
                                                key={tx.id} 
                                                className="border-neutral-100 dark:border-neutral-800 hover:bg-neutral-50/50 dark:hover:bg-neutral-800/30 transition-colors group cursor-pointer"
                                                onClick={() => { setSelectedTx(tx); setDialogOpen(true); }}
                                            >
                                                <TableCell className="w-14 text-center" onClick={(e) => e.stopPropagation()}><Checkbox className="rounded-md" /></TableCell>
                                                <TableCell className="py-6 pl-4">
                                                    <div className="flex items-center gap-4">
                                                        <div className={cn(
                                                            "size-12 rounded-[1.25rem] flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110",
                                                            tx.type === 'income' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-500' : 'bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400'
                                                        )}>
                                                            <Icon className="size-6" strokeWidth={2.5}/>
                                                        </div>
                                                        <div className="flex flex-col gap-0.5">
                                                            <span className="text-sm font-black text-neutral-900 dark:text-neutral-100 group-hover:text-[#0CC8A8] transition-colors uppercase tracking-tight">{tx.activity}</span>
                                                            <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest leading-none">Verified Merchant</span>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant="outline" className="text-[11px] font-black uppercase tracking-widest border-neutral-100 dark:border-neutral-800 bg-neutral-50/50 dark:bg-black/20 px-3 py-1.5 rounded-xl">
                                                        {tx.category}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>
                                                    <span className="text-[11px] font-black text-neutral-400 uppercase tracking-widest">{tx.id}</span>
                                                </TableCell>
                                                <TableCell className={cn(
                                                    "text-base font-black tracking-tighter",
                                                    tx.type === 'income' ? 'text-emerald-500' : 'text-neutral-900 dark:text-neutral-100'
                                                )}>
                                                    {tx.type === 'income' ? '+' : '-'}${tx.price.toLocaleString()}
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex justify-center">
                                                        <div className={cn(
                                                            "inline-flex items-center gap-2.5 px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-sm",
                                                            tx.status === 'Completed' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-500' : 
                                                            tx.status === 'Pending' ? 'bg-rose-50 text-rose-600 dark:bg-rose-500/20 dark:text-rose-50' : 'bg-amber-50 text-amber-600 dark:bg-amber-500/20 dark:text-amber-500'
                                                        )}>
                                                            <div className={cn("size-2 rounded-full shadow-current animate-pulse", 
                                                                tx.status === 'Completed' ? 'bg-emerald-600 dark:bg-emerald-500' : 
                                                                tx.status === 'Pending' ? 'bg-rose-600 dark:bg-rose-500' : 'bg-amber-600 dark:bg-amber-500'
                                                            )} />
                                                            {tx.status}
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="text-[11px] font-black text-neutral-400 uppercase tracking-widest opacity-80">{tx.date}</TableCell>
                                                <TableCell className="text-right pr-6" onClick={(e) => e.stopPropagation()}>
                                                    <div className="flex items-center justify-end gap-1">
                                                        <Button 
                                                            variant="ghost" 
                                                            size="icon" 
                                                            className="size-10 rounded-xl opacity-0 group-hover:opacity-100 transition-all hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-[#0CC8A8]"
                                                            onClick={() => { setSelectedTx(tx); setDialogOpen(true); }}
                                                        >
                                                            <EyeIcon className="size-5" />
                                                        </Button>
                                                        <Button variant="ghost" size="icon" className="size-10 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800">
                                                            <EllipsisVertical className="size-5 text-neutral-400" />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={8} className="h-[400px] text-center">
                                            <div className="flex flex-col items-center gap-6 text-neutral-400">
                                                <div className="size-20 rounded-[2rem] bg-neutral-50 dark:bg-neutral-800 flex items-center justify-center opacity-30 border-2 border-dashed border-neutral-200 dark:border-neutral-700">
                                                    <Search className="size-10" />
                                                </div>
                                                <div className="space-y-1">
                                                    <span className="text-lg font-black uppercase tracking-[0.3em] block text-neutral-900 dark:text-white">Zero Results Found</span>
                                                    <span className="text-xs font-bold opacity-60 uppercase tracking-widest">Modified parameters requested for optimization</span>
                                                </div>
                                                <Button 
                                                    variant="outline" 
                                                    onClick={() => setFilter({ search: "", type: "all" })}
                                                    className="rounded-2xl font-black text-[10px] uppercase tracking-widest px-8 border-neutral-100 dark:border-neutral-800"
                                                >
                                                    Reset Environment
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    {totalPages > 1 && (
                        <div className="flex flex-col sm:flex-row items-center justify-between px-8 py-8 mt-4 border-t border-neutral-100 dark:border-neutral-800 rounded-b-[2rem] gap-4">
                            <div className="text-[11px] font-black uppercase text-neutral-400 tracking-[0.2em]">
                                Sequence Segment {(page - 1) * state.filters.pageSize + 1} - {Math.min(page * state.filters.pageSize, total)} Of {total} Objects
                            </div>
                            <div className="flex gap-2">
                                <Button 
                                    variant="outline"
                                    size="icon"
                                    onClick={() => setFilter({ page: Math.max(1, page - 1) })}
                                    disabled={page === 1}
                                    className="size-11 rounded-2xl border-neutral-100 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800 disabled:opacity-30 transition-all active:scale-95 shadow-sm"
                                >
                                    <ChevronLeft className="size-5" />
                                </Button>
                                <div className="flex gap-1.5 px-2 py-2 rounded-2xl bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-100 dark:border-neutral-800 shadow-inner">
                                    {Array.from({ length: totalPages }).map((_, i) => (
                                        <button 
                                            key={i} 
                                            onClick={() => setFilter({ page: i + 1 })}
                                            className={cn(
                                                "size-7 rounded-xl transition-all font-black text-[10px] flex items-center justify-center uppercase tracking-tighter",
                                                page === i + 1 
                                                    ? "bg-[#0CC8A8] text-white shadow-lg shadow-[#0CC8A8]/30 scale-110" 
                                                    : "hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
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
                                    className="size-11 rounded-2xl border-neutral-100 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800 disabled:opacity-30 transition-all active:scale-95 shadow-sm"
                                >
                                    <ChevronRight className="size-5" />
                                </Button>
                            </div>
                        </div>
                    )}
                </Card>
            </div>

            <TransactionDetailsDialog 
                transaction={selectedTx}
                open={dialogOpen}
                onOpenChange={setDialogOpen}
            />
        </div>
    )
}

export default HistoryTabContent
