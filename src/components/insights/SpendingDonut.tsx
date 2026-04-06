"use client"

import { PieChart, Pie, Cell, Tooltip as RechartsTooltip, ResponsiveContainer } from "recharts"
import { CATEGORY_COLORS } from "@/lib/constants"
import { useTransactions } from "@/context/AppContext"
import { useMemo } from "react"
import { formatCurrency } from "@/lib/utils"
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from "@/components/ui/chart"

export function SpendingDonut() {
  const { allFiltered } = useTransactions()
  
  const data = useMemo(() => {
    const expenses = allFiltered.filter(t => t.type === "expense")
    const grouped = expenses.reduce((acc, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + curr.price
      return acc
    }, {} as Record<string, number>)
    
    return Object.entries(grouped)
      .map(([name, value]) => ({ 
        name, 
        value,
        fill: CATEGORY_COLORS[name as keyof typeof CATEGORY_COLORS] || CATEGORY_COLORS.Other
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5)
  }, [allFiltered])

  const chartConfig = useMemo(() => {
    return data.reduce((acc, item) => ({
      ...acc,
      [item.name]: { label: item.name, color: item.fill }
    }), {} as ChartConfig)
  }, [data])

  return (
    <div className="bg-surface-card dark:bg-surface-dark-card rounded-2xl p-6 shadow-sm border border-border h-[400px] flex flex-col">
      <h3 className="font-semibold text-text-primary text-lg mb-2">Spending by Category</h3>
      <div className="flex-1 w-full relative">
        <ChartContainer config={chartConfig} className="w-full h-full min-h-[300px]">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={110}
              paddingAngle={2}
              dataKey="value"
              nameKey="name"
              stroke="none"
              cornerRadius={4}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
          </PieChart>
        </ChartContainer>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none flex-col">
          <span className="text-text-secondary text-xs font-medium">Top Category</span>
          <span className="text-text-primary font-bold text-xl">{data[0]?.name || "N/A"}</span>
        </div>
      </div>
    </div>
  )
}
