"use client"

import { CHART_DATA } from "@/lib/constants"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts"

import { formatCurrency } from "@/lib/utils"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from "@/components/ui/chart"

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

export function IncomeChart() {
  return (
    <div className="bg-surface-card dark:bg-surface-dark-card rounded-2xl p-6 shadow-sm border border-border h-full flex flex-col">

      {/* Header */}
      <div className="flex flex-col mb-6">
        <h3 className="font-semibold text-text-primary text-xl">
          Total Income
        </h3>
        <p className="text-sm text-text-secondary mt-1">
          View your income in a certain period of time
        </p>
      </div>

      {/* Legend */}
      <div className="flex justify-between items-center mb-6 text-sm">
        <div className="font-medium">Profit and Loss</div>

        <div className="flex items-center gap-4">
          {Object.entries(chartConfig).map(([key, item]) => (
            <div key={key} className="flex items-center gap-1.5">
              <div
                className="w-2.5 h-2.5 rounded"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-text-secondary">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="flex-1 w-full min-h-[250px]">
        <ChartContainer config={chartConfig} className="w-full h-full">
          <BarChart data={CHART_DATA} barGap={4}>

            <CartesianGrid
              vertical={false}
              stroke="var(--border-default)"
              strokeDasharray="3 3"
              opacity={0.4}
            />

            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "var(--text-secondary)" }}
              dy={10}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "var(--text-secondary)" }}
              tickFormatter={(value) => `${value / 1000}k`}
              dx={-10}
            />

            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(_, payload) =>
                    payload?.[0]?.payload?.month
                  }
                  formatter={(value: number) =>
                    formatCurrency(value * 100)
                  }
                />
              }
            />

            {/* Bars (clean + config-driven colors) */}
            <Bar
              dataKey="loss"
              stackId="a"
              fill="var(--color-loss)"
              radius={[0, 0, 6, 6]}
              maxBarSize={28}
            />

            <Bar
              dataKey="profit"
              stackId="a"
              fill="var(--color-profit)"
              radius={[6, 6, 0, 0]}
              maxBarSize={28}
            />

          </BarChart>
        </ChartContainer>
      </div>
    </div>
  )
}