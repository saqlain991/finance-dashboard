"use client"

import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, CartesianGrid, Cell } from "recharts"
import { useTransactions } from "@/context/AppContext"
import { useMemo } from "react"
import { formatCurrency } from "@/lib/utils"
import { CATEGORY_COLORS } from "@/lib/constants"
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from "@/components/ui/chart"

export function CategoryBars() {
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
      .slice(0, 6)
  }, [allFiltered])

  const chartConfig = useMemo(() => {
    return data.reduce((acc, item) => ({
      ...acc,
      [item.name]: { label: item.name, color: item.fill }
    }), {} as ChartConfig)
  }, [data])

  return (
    <div className="bg-surface-card dark:bg-surface-dark-card rounded-2xl p-6 shadow-sm border border-border h-full flex flex-col min-h-[400px]">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-semibold text-text-primary text-lg">Top Spending Categories</h3>
      </div>
      
      <div className="flex-1 w-full -ml-6">
        <ChartContainer config={chartConfig} className="w-full h-full min-h-[300px]">
          <BarChart data={data} layout="vertical" margin={{ top: 0, right: 30, left: 40, bottom: 0 }} barSize={16}>
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="var(--border-default)" opacity={0.5} />
            <XAxis type="number" hide />
            <YAxis 
              dataKey="name" 
              type="category" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 13, fill: "var(--text-primary)", fontWeight: 500 }}
              width={100}
            />
            <ChartTooltip cursor={{ fill: "transparent" }} content={<ChartTooltipContent hideLabel />} />
            <Bar dataKey="value" radius={[0, 4, 4, 0]}>
               {data.map((entry, index) => (
                 <Cell key={`cell-${index}`} fill={entry.fill} />
               ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </div>
    </div>
  )
}
