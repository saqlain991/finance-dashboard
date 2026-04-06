"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Transaction } from "@/types"
import { cn } from "@/lib/utils"
import { Calendar, DollarSign, Tag, Info, Hash, ArrowUpCircle, ArrowDownCircle, Laptop, Plane, ShoppingCart, Zap, Clock, ShieldCheck } from "lucide-react"

interface TransactionDetailsDialogProps {
  transaction: Transaction | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function TransactionDetailsDialog({
  transaction,
  open,
  onOpenChange,
}: TransactionDetailsDialogProps) {
  if (!transaction) return null

  const Icon = transaction.category === 'Technology' ? Laptop : 
               transaction.category === 'Travel' ? Plane : 
               transaction.category === 'Food' ? ShoppingCart : Zap

  const isIncome = transaction.type === 'income'

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px] p-0 overflow-hidden border-neutral-100 dark:border-neutral-800 rounded-[2rem] bg-white dark:bg-[#0F0F10] shadow-2xl">
        <DialogHeader className="p-8 pb-4">
          <div className="flex items-center justify-between mb-4">
             <div className={cn(
                "size-14 rounded-[1.5rem] flex items-center justify-center shadow-xl",
                isIncome ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-500' : 'bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400'
            )}>
                <Icon className="size-7" strokeWidth={2.5} />
            </div>
            <Badge variant="outline" className={cn(
                "px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-widest border-none",
                transaction.status === 'Completed' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-500' : 
                transaction.status === 'Pending' ? 'bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-50' : 'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-500'
            )}>
                {transaction.status}
            </Badge>
          </div>
          <DialogTitle className="text-2xl font-black tracking-tight text-neutral-900 dark:text-white leading-tight">
            {transaction.activity}
          </DialogTitle>
          <DialogDescription className="text-xs font-bold text-neutral-400 uppercase tracking-widest mt-1">
            Transaction ID: {transaction.id}
          </DialogDescription>
        </DialogHeader>

        <div className="px-8 pb-8 space-y-6">
          <div className="bg-neutral-50 dark:bg-neutral-900/50 rounded-[1.5rem] p-6 border border-neutral-100 dark:border-neutral-800">
            <div className="flex flex-col items-center justify-center gap-1">
                <span className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em] mb-1">Total Amount</span>
                <div className={cn(
                    "text-4xl font-black tracking-tighter flex items-center gap-1",
                    isIncome ? 'text-emerald-500' : 'text-neutral-900 dark:text-white'
                )}>
                    {isIncome ? '+' : '-'}${transaction.price.toLocaleString()}
                </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5 p-4 rounded-2xl bg-neutral-50/50 dark:bg-neutral-900/30 border border-neutral-100/50 dark:border-neutral-800/50">
                <div className="flex items-center gap-2 text-neutral-400">
                    <Calendar className="size-3" />
                    <span className="text-[9px] font-black uppercase tracking-widest leading-none">Date</span>
                </div>
                <div className="text-xs font-bold text-neutral-900 dark:text-neutral-100">{transaction.date}</div>
            </div>
            <div className="space-y-1.5 p-4 rounded-2xl bg-neutral-50/50 dark:bg-neutral-900/30 border border-neutral-100/50 dark:border-neutral-800/50">
                <div className="flex items-center gap-2 text-neutral-400">
                    <Tag className="size-3" />
                    <span className="text-[9px] font-black uppercase tracking-widest leading-none">Category</span>
                </div>
                <div className="text-xs font-bold text-neutral-900 dark:text-neutral-100">{transaction.category}</div>
            </div>
            <div className="space-y-1.5 p-4 rounded-2xl bg-neutral-50/50 dark:bg-neutral-900/30 border border-neutral-100/50 dark:border-neutral-800/50">
                <div className="flex items-center gap-2 text-neutral-400">
                    <Clock className="size-3" />
                    <span className="text-[9px] font-black uppercase tracking-widest leading-none">Time</span>
                </div>
                <div className="text-xs font-bold text-neutral-900 dark:text-neutral-100">14:32 PM</div>
            </div>
            <div className="space-y-1.5 p-4 rounded-2xl bg-neutral-50/50 dark:bg-neutral-900/30 border border-neutral-100/50 dark:border-neutral-800/50">
                <div className="flex items-center gap-2 text-neutral-400">
                    <ShieldCheck className="size-3 text-[#0CC8A8]" />
                    <span className="text-[9px] font-black uppercase tracking-widest leading-none">Verified</span>
                </div>
                <div className="text-xs font-bold text-emerald-500">Yes</div>
            </div>
          </div>

          <div className="space-y-3">
             <div className="flex items-center gap-2 text-neutral-400 px-1">
                <Info className="size-3" />
                <span className="text-[9px] font-black uppercase tracking-widest">Description</span>
            </div>
            <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400 leading-relaxed bg-neutral-50 dark:bg-neutral-900/30 p-4 rounded-2xl border border-neutral-100 dark:border-neutral-800">
              This transaction was processed securely. No additional notes provided for this activity. You can add notes in the settings section.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
