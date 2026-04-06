"use client"

import { Activity, Sparkles, Filter, ChevronLeft, ChevronRight, Search, Download } from "lucide-react"
import { useApp } from "@/context/AppContext"
import { PROFILES } from "@/lib/constants"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import HistoryTabContent from "@/components/watermelon/erp-dashboard/components/history-tab-content"

export default function TransactionsPage() {
  const { state } = useApp()
  const currentUser = PROFILES[state.activeProfileIndex]

  return (
    <div className="flex flex-col gap-0 animate-in fade-in duration-500">
      <div className="pb-0">
        <div className="flex flex-col gap-2 mb-8">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#0CC8A8]/10 text-[#0CC8A8] text-[10px] font-black uppercase tracking-widest w-fit mb-2">
            <Activity className="size-3" />
            Financial Ledger
          </div>
          <h1 className="text-3xl md:text-[40px] font-bold text-text-primary tracking-tight flex items-center gap-3">
            Transaction Activity
            <Sparkles className="w-8 h-8 text-[#0CC8A8] animate-pulse" />
          </h1>
          <p className="text-text-secondary text-[15px] max-w-[600px] mb-4">
            A comprehensive history of all your recorded financial activities and asset movements.
          </p>
        </div>
      </div>
      
      <div className="px-0">
        <HistoryTabContent />
      </div>
    </div>
  )
}
