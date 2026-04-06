"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { Transaction, TransactionFormData } from "@/types"
import { useApp } from "@/context/AppContext"
import { STATUS_OPTIONS, TYPE_OPTIONS, TRANSACTION_CATEGORIES } from "@/lib/constants"
import { generateId } from "@/lib/utils"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

export function TransactionForm({
  transaction,
  isOpen,
  onClose,
}: {
  transaction?: Transaction | null
  isOpen: boolean
  onClose: () => void
}) {
  const { dispatch } = useApp()
  const { register, handleSubmit, setValue, watch, reset } = useForm<TransactionFormData>({
    defaultValues: transaction ? {
      activity: transaction.activity,
      category: transaction.category,
      type: transaction.type,
      price: String(transaction.price / 100),
      status: transaction.status,
      icon: transaction.icon,
      date: transaction.date,
    } : {
      activity: "",
      category: "",
      type: "expense",
      price: "",
      status: "Pending",
      icon: "📄",
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute:'2-digit' }),
    }
  })

  // Basic implementation to satisfy the prompt for Add/Edit form
  const onSubmit = (data: TransactionFormData) => {
    const payload: Transaction = {
      id: transaction ? transaction.id : generateId(),
      activity: data.activity,
      category: data.category,
      type: data.type,
      price: Math.round(parseFloat(data.price) * 100),
      status: data.status,
      icon: data.icon,
      date: data.date,
      createdAt: transaction ? transaction.createdAt : new Date().toISOString(),
    }
    
    if (transaction) {
      dispatch({ type: "UPDATE_TRANSACTION", payload })
    } else {
      dispatch({ type: "ADD_TRANSACTION", payload })
    }
    
    reset()
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open: boolean) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{transaction ? "Edit Transaction" : "Adding new element"}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Activity Name</label>
            <Input {...register("activity", { required: true })} placeholder="e.g. Graphic Design Services" />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Amount</label>
              <Input type="number" step="0.01" {...register("price", { required: true })} placeholder="0.00" />
            </div>
            <div className="space-y-2">
               <label className="text-sm font-medium">Icon (Emoji)</label>
               <Input {...register("icon", { required: true })} placeholder="🎨" />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <Select value={watch('category')} onValueChange={(v: string | null) => v && setValue('category', v)}>
                <SelectTrigger><SelectValue placeholder="Category" /></SelectTrigger>
                <SelectContent>
                  {TRANSACTION_CATEGORIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Type</label>
              <Select value={watch('type')} onValueChange={(v: string | null) => v && setValue('type', v as "income" | "expense")}>
                <SelectTrigger><SelectValue placeholder="Type" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="income">Income</SelectItem>
                  <SelectItem value="expense">Expense</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Status</label>
            <Select value={watch('status')} onValueChange={(v: string | null) => v && setValue('status', v as any)}>
              <SelectTrigger><SelectValue placeholder="Status" /></SelectTrigger>
              <SelectContent>
                {STATUS_OPTIONS.filter(o => o !== 'all').map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          <div className="pt-4 flex justify-end gap-2">
            <Button variant="outline" type="button" onClick={onClose}>Cancel</Button>
            <Button type="submit" className="bg-brand-orange hover:bg-brand-orange-hover text-white">Save changes</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
