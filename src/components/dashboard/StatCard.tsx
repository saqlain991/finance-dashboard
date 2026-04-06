import { cn } from "@/lib/utils"
import { ReactNode } from "react"
import { ArrowUpRight, ArrowDownRight, Minus } from "lucide-react"

interface StatCardProps {
  title: string
  value: string
  trend: number
  trendLabel: string
  icon: ReactNode
  theme?: "default" | "orange"
  className?: string
}

export function StatCard({ title, value, trend, trendLabel, icon, theme = "default", className }: StatCardProps) {
  const isPositive = trend > 0
  const isNeutral = trend === 0
  const isOrange = theme === "orange"

  return (
    <div className={cn(
      "rounded-2xl p-5 border border-border flex flex-col min-h-[140px] justify-between transition-colors hover:border-brand-orange/30 shadow-sm",
      isOrange ? "bg-brand-orange text-white border-transparent" : "bg-surface-card dark:bg-surface-dark-card text-text-primary",
      className
    )}>
      <div className="flex justify-between items-start mb-2">
        <h3 className={cn("text-sm font-medium", isOrange ? "text-white/90" : "text-text-secondary")}>
          {title}
        </h3>
        <div className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center",
          isOrange ? "bg-white/20 text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400"
        )}>
          {icon}
        </div>
      </div>

      <div>
        <div className="text-3xl font-bold tracking-tight mb-2">
          {value}
        </div>

        <div className="flex items-center gap-1.5 text-xs font-medium">
          <span className={cn(
            "flex items-center px-1.5 py-0.5 rounded-full",
            isOrange
              ? "bg-white/20 text-white"
              : isPositive
                ? "bg-green-100 text-green-700 dark:bg-green-950/50 dark:text-green-400"
                : isNeutral
                  ? "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                  : "bg-red-100 text-red-600 dark:bg-red-950/50 dark:text-red-400"
          )}>
            {isPositive && <ArrowUpRight className="w-3 h-3 mr-0.5 inline-block" />}
            {!isPositive && !isNeutral && <ArrowDownRight className="w-3 h-3 mr-0.5 inline-block" />}
            {isNeutral && <Minus className="w-3 h-3 mr-0.5 inline-block" />}
            {Math.abs(trend)}%
          </span>
          <span className={cn(isOrange ? "text-white/80" : "text-text-secondary")}>
            {trendLabel}
          </span>
        </div>
      </div>
    </div>
  )
}
