"use client"

import { TransactionTable } from "@/components/transactions/TransactionTable"
import { TransactionFilters } from "@/components/transactions/TransactionFilters"

export default function ActivityPage() {
  return (
    <div className="flex flex-col gap-6 animate-fade-in min-h-[calc(100vh-140px)]">
      <div className="flex flex-col gap-1 mb-2">
        <h1 className="text-3xl font-bold text-text-primary tracking-tight">Activity</h1>
        <p className="text-text-secondary text-sm">Review your latest transactions and history.</p>
      </div>
      
      <TransactionFilters />
      <TransactionTable />
    </div>
  )
}
