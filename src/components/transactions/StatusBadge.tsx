"use client"

import { getStatusColor } from "@/lib/utils"
import { TransactionStatus } from "@/types"
import { cn } from "@/lib/utils"

export function StatusBadge({ status, className }: { status: TransactionStatus; className?: string }) {
  const { bg, text, dot } = getStatusColor(status)
  return (
    <div className={cn("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold w-max", bg, text, className)}>
      <span className={cn("w-1.5 h-1.5 rounded-full", dot)}></span>
      {status}
    </div>
  )
}
