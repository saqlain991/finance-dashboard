"use client"

import { BALANCE } from "@/lib/constants"
import { formatCurrency } from "@/lib/utils"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export function MonthlyLimit() {
  const percentage = (BALANCE.spent / BALANCE.spendingLimit) * 100

  return (
    <div className="bg-surface-card dark:bg-surface-dark-card rounded-2xl p-6 shadow-sm border border-border h-full flex flex-col justify-center">
      <h3 className="font-semibold text-text-primary text-lg mb-8">Monthly Spending Limit</h3>
      
      <div className="relative mb-5 w-full h-3 bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
        <motion.div 
           initial={{ width: 0 }}
           animate={{ width: `${percentage}%` }}
           transition={{ duration: 1, ease: "easeOut" }}
           className="absolute top-0 left-0 h-full bg-brand-orange rounded-full shadow-[0_0_12px_rgba(232,75,28,0.4)]" 
        />
        <div 
           className="absolute top-0 h-full stripe-orange opacity-20"
           style={{ left: `${percentage}%`, right: 0 }}
        />
      </div>

      <div className="grid grid-cols-5 gap-1 mb-6">
        {[1,2,3,4,5].map(i => (
          <div key={i} className={cn(
            "h-1.5 rounded-full",
            percentage >= (i * 20) ? "bg-brand-orange/40" : "bg-gray-100 dark:bg-white/5"
          )} />
        ))}
      </div>

      <div className="flex justify-between items-center text-sm">
        <div className="font-bold text-text-primary">
          {formatCurrency(BALANCE.spent * 100)} <span className="text-text-secondary font-normal ml-1">spent out of</span>
        </div>
        <div className="font-semibold text-text-secondary">
          {formatCurrency(BALANCE.spendingLimit * 100)}
        </div>
      </div>
    </div>
  )
}
