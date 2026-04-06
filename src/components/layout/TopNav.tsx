"use client"

import { USER } from "@/lib/constants"
import { Bell, Search, Menu, ChevronDown, User, Shield, ShieldAlert, Sparkles } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { NOTIFICATIONS, PROFILES } from "@/lib/constants"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { usePathname } from "next/navigation"
import { Sidebar } from "@/components/layout/Sidebar"
import { useApp, useRole } from "@/context/AppContext"
import { useState, useEffect } from "react"
import { ThemeToggle } from "@/components/shared/ThemeToggle"
import { cn } from "@/lib/utils"

export function TopNav() {
  const pathname = usePathname()
  const pageTitle = pathname.split("/").pop() || "Overview"
  const { state, dispatch, setRole } = useApp()
  const { isAdmin } = useRole()
  const currentUser = PROFILES[state.activeProfileIndex]
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])
  
  return (
    <header className={cn(
      "h-[88px] flex items-center justify-between px-4 lg:px-8 shrink-0 z-30 transition-all duration-300 sticky top-0",
      scrolled ? "bg-white/70 dark:bg-[#0F0F10]/70 backdrop-blur-xl border-b border-white/20 dark:border-white/5 shadow-sm" : "bg-transparent border-transparent"
    )}>
      <div className="flex items-center gap-4 lg:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger className="p-2 -ml-2 rounded-xl text-text-primary hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer outline-none border-none">
            <Menu className="w-6 h-6" />
            <span className="sr-only">Open Menu</span>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-[100px] border-none bg-transparent m-0 sm:max-w-[100px] shadow-2xl">
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            <div className="h-full">
              <Sidebar className="w-full border-r-0 h-full !bg-surface-card dark:!bg-surface-dark-card shadow-xl" />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <div className="flex items-center gap-4">
        <h2 className="text-[22px] lg:text-[28px] font-bold capitalize hidden lg:flex items-center gap-2 text-text-primary tracking-tight">
          {pageTitle.replace("-", " ")}
          {pageTitle === "overview" && <Sparkles className="w-6 h-6 text-brand-orange animate-pulse" />}
        </h2>
      </div>

      <div className="flex items-center gap-2 sm:gap-4 ml-auto">
        <div className="relative hidden md:block w-56 lg:w-[320px]">
          <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search here..." 
            className="w-full pl-10 pr-4 py-2.5 border border-white/40 dark:border-white/10 rounded-[14px] bg-white/50 dark:bg-black/20 backdrop-blur-md focus:bg-white dark:focus:bg-black/40 focus:outline-none focus:ring-2 focus:ring-brand-orange/50 text-sm transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] cursor-text"
          />
        </div>

        <Popover>
          <PopoverTrigger className="relative p-2.5 text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 transition-all duration-300 rounded-[14px] hover:bg-white/80 dark:hover:bg-white/10 cursor-pointer outline-none active:scale-95 bg-transparent border-none">
              <Bell className="w-[22px] h-[22px]" />
              {NOTIFICATIONS.some(n => !n.read) && (
                <span className="absolute top-2.5 right-2.5 w-[9px] h-[9px] bg-[#EF4444] rounded-full border-2 border-white dark:border-[#0F0F10] block shadow-sm shadow-red-500/50"></span>
              )}
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0 rounded-2xl bg-white/90 dark:bg-[#1A1A1E]/90 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-2xl" align="end">
            <div className="p-4 border-b border-border/50 flex justify-between items-center">
              <h4 className="font-bold text-sm">Notifications</h4>
              <button className="text-[11px] text-brand-orange font-bold hover:underline">Mark all as read</button>
            </div>
            <div className="max-h-[350px] overflow-y-auto overflow-x-hidden scrollbar-hide py-1">
              {NOTIFICATIONS.map((n) => (
                <div key={n.id} className="px-4 py-3 hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors cursor-pointer group">
                  <div className="flex gap-3">
                    <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                      n.type === 'income' ? 'bg-green-100 dark:bg-green-500/20 text-green-600' : 
                      n.type === 'expense' ? 'bg-red-100 dark:bg-red-500/20 text-red-600' :
                      'bg-blue-100 dark:bg-blue-500/20 text-blue-600'
                    )}>
                      {n.type === 'income' ? <Sparkles className="w-4 h-4" /> : <Bell className="w-4 h-4" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-0.5">
                        <p className={cn("text-xs font-bold truncate", !n.read && "text-text-primary")}>{n.title}</p>
                        <span className="text-[10px] text-text-secondary">{n.time}</span>
                      </div>
                      <p className="text-[11px] text-text-secondary line-clamp-2">{n.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-3 border-t border-border/50 text-center">
              <button className="text-xs font-semibold text-text-secondary hover:text-text-primary transition-colors">View all notifications</button>
            </div>
          </PopoverContent>
        </Popover>
        
        <div className="hidden sm:block">
          <ThemeToggle />
        </div>

        <div className="h-8 w-[1px] bg-border mx-1 md:mx-2 hidden sm:block"></div>

        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 lg:gap-3 hover:bg-white/60 dark:hover:bg-white/5 p-1 lg:pl-1 lg:pr-4 rounded-full transition-all duration-300 outline-none cursor-pointer group border border-transparent hover:border-white/40 dark:hover:border-white/10 shadow-sm hover:shadow-md">
            <Avatar className="w-[42px] h-[42px] border-[2px] border-white dark:border-[#2A2A2E] shadow-sm transition-transform duration-300 group-hover:scale-105">
              <AvatarImage src={currentUser.avatar ?? ""} alt={currentUser.name} />
              <AvatarFallback className="bg-gradient-to-br from-brand-orange to-orange-600 text-white font-bold text-sm">
                {currentUser.initials}
              </AvatarFallback>
            </Avatar>
            <div className="hidden xl:flex flex-col items-start justify-center">
              <span className="text-sm font-bold text-text-primary leading-[1.2]">{currentUser.name}</span>
              <span className="text-[11px] uppercase tracking-wider font-bold text-text-secondary leading-[1.2] flex items-center gap-1.5 mt-1">
                {currentUser.role === 'admin' ? <Shield className="w-3 h-3 text-brand-orange" /> : <User className="w-3 h-3 text-text-secondary" />}
                {currentUser.role === 'admin' ? "Admin" : "Viewer"}
              </span>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-400 hidden lg:block group-hover:text-text-primary transition-transform duration-300 group-data-[state=open]:rotate-180 ml-1" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64 p-2 rounded-[20px] bg-white/80 dark:bg-[#1A1A1E]/80 backdrop-blur-2xl border border-white/20 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.4)]">
            <DropdownMenuLabel className="font-normal px-3 py-2.5">
              <div className="flex flex-col space-y-1.5">
                <p className="text-sm font-bold leading-none">{currentUser.name}</p>
                <p className="text-xs font-medium leading-none text-text-secondary">{currentUser.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="my-1.5 opacity-50" />
            <div className="px-1 py-1">
              <div className="px-2 py-2 mb-1">
                <span className="text-[10px] font-bold text-text-secondary uppercase tracking-[0.1em] px-1">Switch Account</span>
              </div>
              {PROFILES.map((profile, idx) => (
                <DropdownMenuItem 
                  key={profile.email} 
                  onClick={() => dispatch({ type: "SET_PROFILE", payload: idx })}
                  className="rounded-xl flex items-center justify-between group cursor-pointer py-2 px-2 hover:bg-gray-100 dark:hover:bg-white/5 transition-standard mb-0.5"
                >
                  <div className="flex items-center gap-2.5 flex-1 min-w-0">
                    <Avatar className="w-8 h-8 border border-border/50">
                      <AvatarFallback className={cn("text-[10px] font-bold", state.activeProfileIndex === idx ? "bg-brand-orange text-white" : "bg-gray-100 dark:bg-gray-800")}>{profile.initials}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col min-w-0">
                      <span className="text-xs font-bold truncate">{profile.name}</span>
                      <span className="text-[10px] text-text-secondary truncate">{profile.role}</span>
                    </div>
                  </div>
                  {state.activeProfileIndex === idx && <div className="w-1.5 h-1.5 rounded-full bg-brand-orange shadow-[0_0_8px_rgba(232,75,28,0.5)]" />}
                </DropdownMenuItem>
              ))}
            </div>
            
            <DropdownMenuSeparator className="my-1.5 opacity-50" />
            <div className="px-3 py-2 flex items-center justify-between bg-surface-page/50 dark:bg-black/20 rounded-xl my-1 border border-border/50">
              <span className="text-[11px] font-bold text-text-secondary uppercase tracking-wider">Active Role</span>
              <button 
                onClick={(e) => { e.preventDefault(); setRole(isAdmin ? "viewer" : "admin") }}
                className={`text-[11px] px-2.5 py-1.5 rounded-lg border font-bold cursor-pointer transition-all flex items-center gap-1.5 active:scale-95 ${isAdmin ? 'bg-orange-50/80 text-brand-orange border-brand-orange/30 dark:bg-brand-orange/10 dark:border-brand-orange/30 shadow-sm shadow-brand-orange/10' : 'bg-white shadow-sm text-gray-700 border-gray-200 dark:bg-gray-800/80 dark:border-gray-700 dark:text-gray-300'}`}
              >
                {isAdmin ? <ShieldAlert className="w-3.5 h-3.5" /> : <User className="w-3.5 h-3.5" />}
                {isAdmin ? "ADMIN" : "VIEWER"}
              </button>
            </div>
            <DropdownMenuSeparator className="my-1.5 opacity-50" />
            <DropdownMenuItem className="cursor-pointer rounded-xl py-2.5 px-3 font-semibold text-sm hover:bg-gray-100 dark:hover:bg-white/5 transition-colors focus:bg-gray-100 dark:focus:bg-white/5">
              Profile Settings
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer rounded-xl py-2.5 px-3 font-semibold text-sm hover:bg-gray-100 dark:hover:bg-white/5 transition-colors focus:bg-gray-100 dark:focus:bg-white/5">
              Preferences
            </DropdownMenuItem>
            <DropdownMenuSeparator className="my-1.5 opacity-50" />
            <DropdownMenuItem className="text-red-600 focus:bg-red-50 focus:text-red-700 dark:text-red-400 dark:focus:bg-red-500/10 dark:focus:text-red-300 cursor-pointer rounded-xl py-2.5 px-3 font-bold text-sm transition-colors">
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
