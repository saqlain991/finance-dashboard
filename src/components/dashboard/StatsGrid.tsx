"use client"

import { StatCard } from "./StatCard"
import { Briefcase, Coins, PiggyBank, ReceiptText } from "lucide-react"

export function StatsGrid() {
  return (
    <div className="grid grid-cols-2 gap-4 h-full">
      <StatCard
        title="Total Earnings"
        value="$950"
        trend={7}
        trendLabel="This month"
        icon={<Briefcase className="w-4 h-4" />}
        theme="orange"
      />
      <StatCard
        title="Total Spending"
        value="$700"
        trend={-5}
        trendLabel="This month"
        icon={<ReceiptText className="w-4 h-4" />}
      />
      <StatCard
        title="Total Income"
        value="$1,050"
        trend={8}
        trendLabel="This month"
        icon={<Coins className="w-4 h-4" />}
      />
      <StatCard
        title="Total Revenue"
        value="$850"
        trend={4}
        trendLabel="This month"
        icon={<PiggyBank className="w-4 h-4" />}
      />
    </div>
  )
}
