"use client"
import * as React from "react"
import { ArrowUpRight, ShieldCheck, X, LayoutDashboard, Activity, Layers, FileText, Users, Calendar, Settings, HelpCircle, LogOut, ChevronRight } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { useApp, useRole } from "@/context/AppContext"
import { PROFILES, NAV_ITEMS } from "@/lib/constants"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> { }

export function AppSidebar({ ...props }: AppSidebarProps) {
  const { state } = useApp()
  const { isAdmin } = useRole()
  const pathname = usePathname()
  const [showSecurityCard, setShowSecurityCard] = React.useState(true)

  const currentProfile = PROFILES[state.activeProfileIndex]

  // Filter NAV_ITEMS based on role
  const filteredNavItems = NAV_ITEMS.filter(item => {
    // If it's an admin only item, only show it to admins
    if ('adminOnly' in item && item.adminOnly) {
      return isAdmin
    }
    return true
  })

  return (
    <Sidebar {...props} className="border-r border-neutral-100 dark:border-neutral-800 bg-white/50 dark:bg-black/20 backdrop-blur-xl">
      <SidebarHeader className="px-0 pt-0">
        <SidebarMenu className="h-20 px-6 justify-center">
          <SidebarMenuItem>
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-4 group cursor-pointer">
                <div className="bg-[#0CC8A8] text-white flex aspect-square size-10 items-center justify-center rounded-2xl shadow-xl shadow-[#0CC8A8]/30 transition-all group-hover:scale-110 group-hover:rotate-3">
                  <ArrowUpRight className="size-6 stroke-[3]" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="font-black text-2xl tracking-tighter text-neutral-900 dark:text-white leading-none">Finexy<span className="text-[#0CC8A8]">.</span></span>
                  <span className="text-[10px] font-black uppercase text-[#0CC8A8] tracking-[0.3em] leading-none opacity-80">Premium</span>
                </div>
              </div>
              {/* <SidebarTrigger className="hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-xl transition-all" /> */}
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="gap-0 py-4">
        <SidebarGroup>
          <div className="px-6 mb-4">
            <span className="text-[11px] font-black uppercase text-neutral-400 tracking-[0.2em] leading-none">
              Primary Menu
            </span>
          </div>
          <SidebarGroupContent>
            <SidebarMenu className="px-3 gap-1.5">
              {filteredNavItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      isActive={isActive}
                      render={
                        <Link
                          href={item.href}
                          className="w-full flex items-center justify-between"
                        />
                      }
                      className={cn(
                        "h-12 px-4 rounded-[1.25rem] transition-all duration-300 group flex items-center justify-between",
                        isActive
                          ? "bg-neutral-100 dark:bg-neutral-800 text-[#0CC8A8] font-black shadow-sm"
                          : "text-neutral-500 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 hover:text-neutral-900 dark:hover:text-white"
                      )}
                    >
                      <div className="flex items-center gap-3.5">
                        <item.icon className={cn("size-5 transition-transform group-hover:scale-110", isActive && "text-[#0CC8A8] drop-shadow-[0_0_8px_rgba(12,200,168,0.4)]")} strokeWidth={isActive ? 2.5 : 2} />
                        <span className={cn("text-sm uppercase tracking-tight font-bold", isActive ? "text-[#0CC8A8]" : "text-neutral-600 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white")}>{item.label}</span>
                      </div>
                      {isActive && <div className="w-1.5 h-1.5 rounded-full bg-[#0CC8A8] shadow-[0_0_8px_rgba(12,200,168,0.6)]" />}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer removed for clean UI */}

      <SidebarRail />
    </Sidebar>
  )
}
