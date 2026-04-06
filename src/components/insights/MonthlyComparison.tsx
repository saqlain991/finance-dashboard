"use client"

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { CHART_DATA } from "@/lib/constants"
import { formatCurrency } from "@/lib/utils"
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from "@/components/ui/chart"

const chartConfig = {
  profit: {
    label: "Profit",
    color: "var(--brand-orange)",
  },
  loss: {
    label: "Loss",
    color: "var(--text-primary)",
  },
} satisfies ChartConfig

export function MonthlyComparison() {
  return (
    <div className="bg-surface-card dark:bg-surface-dark-card rounded-2xl p-6 shadow-sm border border-border h-full flex flex-col min-h-[400px]">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="font-semibold text-text-primary text-lg">Monthly Revenue vs Expenses</h3>
          <p className="text-sm text-text-secondary">Track how much you're earning vs spending</p>
        </div>
      </div>
      
      <div className="flex-1 w-full -ml-4">
        <ChartContainer config={chartConfig} className="w-full h-full min-h-[300px]">
          <AreaChart data={CHART_DATA} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-profit)" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="var(--color-profit)" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorLoss" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-loss)" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="var(--color-loss)" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-default)" opacity={0.5} />
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "var(--text-secondary)" }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "var(--text-secondary)" }} tickFormatter={(value) => `${value / 1000}k`} dx={-10} />
            <ChartTooltip content={<ChartTooltipContent labelFormatter={(v) => v} indicator="dot" />} />
            <Area type="monotone" dataKey="loss" stroke="var(--color-loss)" fillOpacity={1} fill="url(#colorLoss)" className="text-gray-900 dark:text-gray-300" strokeWidth={2} />
            <Area type="monotone" dataKey="profit" stroke="var(--color-profit)" fillOpacity={1} fill="url(#colorProfit)" strokeWidth={2} />
          </AreaChart>
        </ChartContainer>
      </div>
    </div>
  )
}
