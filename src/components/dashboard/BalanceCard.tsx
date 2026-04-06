"use client"

import { useApp } from "@/context/AppContext"
import { BALANCE } from "@/lib/constants"
import { formatCurrency, getTrendIcon } from "@/lib/utils"
import { ArrowLeftRight, ArrowDownUp } from "lucide-react"
import { AnimatedNumber } from "@/components/shared/AnimatedNumber"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function BalanceCard() {
  const { state, dispatch } = useApp()
  const { trendValue, icon, color } = { 
    trendValue: "+5%", 
    ...getTrendIcon(BALANCE.monthlyChange) 
  }

  return (
    <div className="bg-surface-card dark:bg-surface-dark-card rounded-2xl p-6 shadow-sm border border-border flex flex-col h-full relative overflow-hidden">
      <div className="flex justify-between items-start mb-2 z-10">
        <h3 className="text-text-secondary font-medium">Total Balance</h3>
        <Select 
          value={state.currency} 
          onValueChange={(val: string | null) => val && dispatch({ type: "SET_CURRENCY", payload: val as any })}
        >
          <SelectTrigger className="w-24 h-8 bg-surface-page dark:bg-[#242428] border-none rounded-lg text-xs font-semibold focus:ring-0">
            <SelectValue placeholder="Currency" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="USD">🇺🇸 USD</SelectItem>
            <SelectItem value="EUR">🇩🇪 EUR</SelectItem>
            <SelectItem value="GBP">🇬🇧 GBP</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="my-4 z-10 flex flex-col gap-1.5">
        <AnimatedNumber 
          value={BALANCE.total} 
          formatFn={(val) => formatCurrency(val, state.currency)}
          className="text-4xl md:text-[40px] font-bold text-text-primary tracking-tight"
        />
        <div className="flex items-center gap-2 text-sm mt-1">
          <span className={`inline-flex items-center font-medium px-2 py-0.5 rounded-full ${color === 'text-green-500' ? 'bg-green-100 dark:bg-green-950/40 text-green-600 dark:text-green-400' : ''}`}>
            {icon} {Math.abs(BALANCE.monthlyChange)}%
          </span>
          <span className="text-text-secondary">than last month</span>
        </div>
      </div>

      <div className="flex gap-3 mt-auto z-10">
        <button className="flex-1 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-transform hover:scale-[1.02] active:scale-[0.98]">
          <ArrowLeftRight className="w-4 h-4" /> Transfer
        </button>
        <button className="flex-1 bg-surface-page dark:bg-[#242428] hover:bg-gray-100 dark:hover:bg-gray-800 text-text-primary font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-transform hover:scale-[1.02] active:scale-[0.98]">
          <ArrowDownUp className="w-4 h-4" /> Request
        </button>
      </div>
    </div>
  )
}
