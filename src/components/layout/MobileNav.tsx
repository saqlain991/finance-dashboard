"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { NAV_ITEMS } from "@/lib/constants"
import { useRole } from "@/context/AppContext"
import { cn } from "@/lib/utils"

export function MobileNav() {
  const pathname = usePathname()
  const { isAdmin } = useRole()

  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 bg-surface-card dark:bg-surface-dark-card border-t border-border flex items-center justify-around px-2 z-50 md:hidden">
      {NAV_ITEMS.slice(0, 5).map((item) => {
        const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
        if ('adminOnly' in item && item.adminOnly && !isAdmin) return null

        return (
          <Link
            key={item.id}
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center w-full h-full gap-1",
              isActive ? "text-brand-orange" : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            )}
          >
            <item.icon className={cn("w-5 h-5", isActive && "text-brand-orange")} />
            <span className="text-[10px] font-medium">{item.label}</span>
          </Link>
        )
      })}
    </div>
  )
}
