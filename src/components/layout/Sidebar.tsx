"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { HelpCircle, LogOut } from "lucide-react"

import { NAV_ITEMS } from "@/lib/constants"
import { useRole } from "@/context/AppContext"
import { cn } from "@/lib/utils"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export function Sidebar({ className }: { className?: string }) {
  const pathname = usePathname()
  const { isAdmin } = useRole()

  return (
    <aside className={cn("flex flex-col h-full bg-white/60 dark:bg-[#1A1A1E]/60 backdrop-blur-xl border-r border-white/20 dark:border-white/5 py-8 px-4 items-center shrink-0 shadow-[4px_0_24px_rgba(0,0,0,0.02)] dark:shadow-[4px_0_24px_rgba(0,0,0,0.2)]", className)}>
      {/* Brand Logo */}
      <Link href="/overview" className="mb-10 w-12 h-12 rounded-[16px] bg-gradient-to-br from-brand-orange to-orange-600 flex items-center justify-center shadow-lg shadow-brand-orange/30 text-white font-bold text-2xl cursor-pointer hover:scale-105 transition-transform duration-300">
        F
      </Link>

      <nav className="flex-1 w-full space-y-4 flex flex-col items-center">
        <TooltipProvider delay={100}>
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
            if ('adminOnly' in item && item.adminOnly && !isAdmin) return null

            return (
              <Tooltip key={item.id}>
                <TooltipTrigger className={cn(
                  "relative flex items-center justify-center w-[52px] h-[52px] rounded-[16px] transition-all duration-300 group outline-none",
                  isActive 
                    ? "text-white shadow-md shadow-brand-orange/20"
                    : "text-gray-400 hover:text-gray-700 hover:bg-white/80 dark:hover:bg-white/10 dark:hover:text-gray-200"
                )}>
                  {isActive && (
                    <motion.div
                      layoutId="active-indicator-sb"
                      className="absolute inset-0 bg-brand-orange rounded-[16px]"
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <item.icon className={cn("w-6 h-6 relative z-10 transition-transform duration-300 group-hover:scale-110", isActive && "text-white")} />
                </TooltipTrigger>
                <TooltipContent side="right" sideOffset={16} className="bg-surface-card dark:bg-surface-dark-card border-border shadow-xl rounded-xl px-4 py-2 text-sm font-semibold">
                  <p>{item.label}</p>
                </TooltipContent>
              </Tooltip>
            )
          })}
        </TooltipProvider>
      </nav>

      <div className="flex flex-col items-center gap-4 mt-auto">
        <TooltipProvider delay={100}>
          <Tooltip>
            <TooltipTrigger className="flex items-center justify-center w-[52px] h-[52px] rounded-[16px] text-gray-400 hover:text-gray-700 hover:bg-white/80 dark:hover:bg-white/10 dark:hover:text-gray-200 transition-all duration-300 group outline-none">
              <HelpCircle className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={16} className="bg-surface-card dark:bg-surface-dark-card border-border shadow-xl rounded-xl px-4 py-2 font-semibold"><p>Help</p></TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger className="flex items-center justify-center w-[52px] h-[52px] rounded-[16px] text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 dark:hover:text-red-400 transition-all duration-300 group outline-none">
              <LogOut className="w-6 h-6 transition-transform duration-300 group-hover:scale-110 group-hover:-translate-x-0.5" />
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={16} className="bg-surface-card dark:bg-surface-dark-card border-border shadow-xl rounded-xl px-4 py-2 font-semibold"><p>Log Out</p></TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </aside>
  )
}
