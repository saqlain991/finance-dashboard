import { InsightMetric } from "@/types"
import { cn } from "@/lib/utils"

export function InsightCard({ insight }: { insight: InsightMetric }) {
  const isPositive = insight.trend === 'up'
  const isNeutral = insight.trend === 'neutral'
  
  return (
    <div className="bg-surface-card dark:bg-surface-dark-card rounded-xl p-5 border border-border flex justify-between items-center transition-transform hover:-translate-y-1 hover:shadow-sm">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-2xl border border-border/50">
          {insight.icon}
        </div>
        <div>
          <h4 className="text-text-secondary text-sm font-medium mb-1">{insight.label}</h4>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-text-primary tracking-tight">{insight.value}</span>
            <span className="text-xs text-text-secondary hidden sm:inline-block">{insight.subtext}</span>
          </div>
        </div>
      </div>
      
      {insight.trendValue && (
        <div className={cn(
          "px-2.5 py-1 rounded-lg text-xs font-semibold",
          isPositive ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" :
          isNeutral ? "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400" :
          "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
        )}>
          {isPositive ? "↑ " : isNeutral ? "→ " : "↓ "}
          {insight.trendValue}
        </div>
      )}
    </div>
  )
}
