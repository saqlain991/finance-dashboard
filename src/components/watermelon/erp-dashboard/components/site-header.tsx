"use client"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Mail, Bell, Search, Sparkles, LogOut, Settings, User, ChevronDown, ShieldAlert, Shield, MessageSquare } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuGroup,
} from "@/components/ui/dropdown-menu"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { useApp, useRole } from "@/context/AppContext"
import { PROFILES, NOTIFICATIONS, MESSAGES } from "@/lib/constants"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ThemeToggle } from "@/components/shared/ThemeToggle"

export default function SiteHeader() {
    const { state, dispatch, setRole } = useApp()
    const { isAdmin } = useRole()
    const pathname = usePathname()
    const currentProfile = PROFILES[state.activeProfileIndex]

    const pathParts = pathname.split("/").filter(Boolean)
    const breadcrumbLabel = pathParts[0] ? pathParts[0].charAt(0).toUpperCase() + pathParts[0].slice(1) : "Dashboard"

    return (
        <header className="flex h-18 shrink-0 items-center justify-between border-b border-neutral-100 dark:border-neutral-800 px-7 max-md:px-5 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-xl sticky top-0 z-50">
            <div className="flex items-center gap-4">
                <SidebarTrigger className="hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors" />
                <Separator orientation="vertical" className="h-6 bg-neutral-100 dark:border-neutral-800 hidden sm:block" />
                <Breadcrumb className="hidden sm:block">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <span className="text-sm font-bold text-neutral-400 uppercase tracking-widest">Dashboard</span>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator className="text-neutral-300" />
                        <BreadcrumbItem>
                            <span className="text-sm font-bold text-neutral-900 dark:text-white uppercase tracking-widest">{breadcrumbLabel}</span>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>

            <div className="flex items-center gap-4">
                {/* Search Bar */}
                <div className="hidden lg:flex items-center gap-3 bg-neutral-50 dark:bg-neutral-800/50 px-4 py-2 rounded-xl border border-neutral-200 dark:border-neutral-800 focus-within:border-[#0CC8A8] focus-within:ring-2 focus-within:ring-[#0CC8A8]/20 transition-all w-80">
                    <Search className="size-4 text-neutral-400" />
                    <input
                        placeholder="Search transactions..."
                        className="bg-transparent border-none outline-none text-sm font-medium w-full placeholder:text-neutral-400 text-foreground"
                    />
                </div>

                <div className="flex items-center gap-2">
                    <Popover>
                        <PopoverTrigger 
                          render={
                            <Button variant="ghost" size="icon" className="size-10 rounded-xl text-neutral-500 hover:text-[#0CC8A8] hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-all border border-transparent hover:border-neutral-100 dark:hover:border-neutral-700 relative">
                                <Mail className="size-5" />
                                {MESSAGES.some(m => !m.read) && (
                                    <span className="absolute top-2.5 right-2.5 size-2 rounded-full bg-[#0CC8A8] border-2 border-white dark:border-neutral-900 shadow-sm shadow-[#0CC8A8]/50" />
                                )}
                            </Button>
                          }
                        />
                        <PopoverContent className="w-80 p-0 rounded-2xl bg-white dark:bg-[#1A1A1E] border border-neutral-100 dark:border-neutral-800 shadow-2xl" align="end">
                            <div className="p-4 border-b border-neutral-100 dark:border-neutral-800 flex justify-between items-center">
                                <h4 className="font-bold text-sm">Messages</h4>
                                <button className="text-[11px] text-[#0CC8A8] font-bold hover:underline">View All</button>
                            </div>
                            <div className="max-h-[350px] overflow-y-auto overflow-x-hidden py-1">
                                {MESSAGES.map((m) => (
                                    <div key={m.id} className="px-4 py-3 hover:bg-neutral-100 dark:hover:bg-white/5 transition-colors cursor-pointer group">
                                        <div className="flex gap-3">
                                            <Avatar className="size-9 rounded-xl border border-neutral-100 dark:border-neutral-800">
                                                <AvatarFallback className="bg-neutral-100 dark:bg-neutral-800 text-[10px] font-black text-neutral-500 uppercase">
                                                    {m.initials}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex justify-between items-center mb-0.5">
                                                    <p className={cn("text-xs font-black uppercase tracking-tight", !m.read ? "text-neutral-900 dark:text-white" : "text-neutral-500")}>{m.sender}</p>
                                                    <span className="text-[9px] font-bold text-neutral-400 uppercase">{m.time}</span>
                                                </div>
                                                <p className={cn("text-[11px] line-clamp-1 leading-relaxed", !m.read ? "text-neutral-700 dark:text-neutral-300 font-bold" : "text-neutral-500")}>{m.snippet}</p>
                                            </div>
                                            {!m.read && <div className="size-1.5 rounded-full bg-[#0CC8A8] mt-2 shrink-0" />}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </PopoverContent>
                    </Popover>

                    <Popover>
                        <PopoverTrigger 
                          render={
                            <Button variant="ghost" size="icon" className="size-10 rounded-xl text-neutral-500 hover:text-[#0CC8A8] hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-all relative border border-transparent hover:border-neutral-100 dark:hover:border-neutral-700">
                                <Bell className="size-5" />
                                {NOTIFICATIONS.some(n => !n.read) && (
                                    <span className="absolute top-2.5 right-2.5 size-2 rounded-full bg-rose-500 border-2 border-white dark:border-neutral-900 shadow-sm shadow-rose-500/50" />
                                )}
                            </Button>
                          }
                        />
                        <PopoverContent className="w-80 p-0 rounded-2xl bg-white dark:bg-[#1A1A1E] border border-neutral-100 dark:border-neutral-800 shadow-2xl" align="end">
                            <div className="p-4 border-b border-neutral-100 dark:border-neutral-800 flex justify-between items-center">
                                <h4 className="font-bold text-sm">Notifications</h4>
                                <button className="text-[11px] text-[#0CC8A8] font-bold hover:underline">Mark all as read</button>
                            </div>
                            <div className="max-h-[350px] overflow-y-auto overflow-x-hidden py-1">
                                {NOTIFICATIONS.map((n) => (
                                    <div key={n.id} className="px-4 py-3 hover:bg-neutral-50 dark:hover:bg-white/5 transition-colors cursor-pointer group">
                                        <div className="flex gap-3">
                                            <div className={cn(
                                                "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                                                n.type === 'income' ? 'bg-emerald-50 text-emerald-600' :
                                                    n.type === 'expense' ? 'bg-rose-50 text-rose-600' :
                                                        'bg-blue-50 text-blue-600'
                                            )}>
                                                {n.type === 'income' ? <Sparkles className="size-4" /> : <Bell className="size-4" />}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex justify-between items-start mb-0.5">
                                                    <p className={cn("text-xs font-bold truncate", !n.read && "text-neutral-900 dark:text-white")}>{n.title}</p>
                                                    <span className="text-[10px] text-neutral-400">{n.time}</span>
                                                </div>
                                                <p className="text-[11px] text-neutral-500 line-clamp-2 leading-relaxed">{n.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </PopoverContent>
                    </Popover>

                    <Separator orientation="vertical" className="h-6 bg-neutral-100 dark:border-neutral-800 mx-2" />
                    <ThemeToggle />
                </div>

                <Separator orientation="vertical" className="h-6 bg-neutral-100 dark:border-neutral-800" />

                <DropdownMenu>
                    <DropdownMenuTrigger
                      render={
                        <button type="button" className="flex items-center gap-3 p-1 pr-3 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all active:scale-95 border border-transparent hover:border-neutral-100 dark:hover:border-neutral-700 outline-none">
                            <Avatar className="size-8 rounded-lg shadow-sm">
                                <AvatarImage src={currentProfile.avatar || ""} />
                                <AvatarFallback className="bg-[#0CC8A8] text-white text-xs font-black">
                                    {currentProfile.initials}
                                </AvatarFallback>
                            </Avatar>
                            <div className="text-left hidden sm:block">
                                <div className="text-[10px] font-black text-neutral-400 uppercase tracking-widest leading-none mb-1">Active Profile</div>
                                <div className="text-xs font-bold text-neutral-900 dark:text-white leading-none flex items-center gap-1.5">
                                    {currentProfile.name.split(" ")[0]}
                                    <ChevronDown className="size-3 text-neutral-400" />
                                </div>
                            </div>
                        </button>
                      }
                    />
                    <DropdownMenuContent align="end" className="w-72 p-2 rounded-2xl border-neutral-100 dark:border-neutral-800 shadow-xl overflow-hidden bg-white dark:bg-[#121214]">
                        <DropdownMenuGroup>
                            <DropdownMenuLabel className="px-3 py-2 text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em]">Manage Accounts</DropdownMenuLabel>
                            {PROFILES.map((profile, idx) => (
                                <DropdownMenuItem
                                    key={profile.email}
                                    onClick={() => dispatch({ type: "SET_PROFILE", payload: idx })}
                                    className={cn(
                                        "flex items-center gap-3 p-3 rounded-xl transition-all cursor-pointer mb-1 group",
                                        state.activeProfileIndex === idx ? "bg-neutral-50 dark:bg-neutral-800/60 text-[#0CC8A8] border border-neutral-100 dark:border-neutral-700" : "hover:bg-neutral-50 dark:hover:bg-neutral-800 border border-transparent"
                                    )}
                                >
                                    <Avatar className="size-10 rounded-xl">
                                        <AvatarImage src={profile.avatar || ""} />
                                        <AvatarFallback className={cn("text-[10px] font-black", state.activeProfileIndex === idx ? "bg-[#0CC8A8] text-white" : "bg-neutral-100 dark:bg-neutral-800 text-neutral-500")}>
                                            {profile.initials}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1 overflow-hidden">
                                        <div className="text-xs font-black uppercase tracking-tight truncate">{profile.name}</div>
                                        <div className="text-[10px] text-neutral-400 truncate tracking-tight font-bold">{profile.email}</div>
                                        <div className="text-[9px] text-[#0CC8A8] font-black uppercase tracking-widest mt-1 opacity-70 flex items-center gap-1">
                                            <Shield className="size-2.5" />
                                            {profile.role}
                                        </div>
                                    </div>
                                    {state.activeProfileIndex === idx ? (
                                        <div className="size-5 rounded-full bg-[#0CC8A8]/10 flex items-center justify-center">
                                            <Sparkles className="size-3 text-[#0CC8A8]" />
                                        </div>
                                    ) : (
                                        <div className="size-5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center">
                                            <ChevronDown className="size-3 text-neutral-500 -rotate-90" />
                                        </div>
                                    )}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuGroup>

                        <DropdownMenuSeparator className="bg-neutral-100 dark:bg-neutral-800 my-2" />

                        <div className="px-1 py-1">
                            <div className="px-3 py-2 flex items-center justify-between bg-neutral-50 dark:bg-white/5 rounded-xl border border-neutral-100 dark:border-white/5">
                                <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-tight">Active Role</span>
                                <button
                                    onClick={(e) => { e.preventDefault(); setRole(isAdmin ? "viewer" : "admin") }}
                                    className={cn(
                                        "text-[10px] px-3 py-1 rounded-lg border font-black cursor-pointer transition-all flex items-center gap-1.5 active:scale-95 uppercase tracking-tighter shadow-sm",
                                        isAdmin
                                            ? "bg-[#0CC8A8] text-white border-[#0CC8A8]"
                                            : "bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-neutral-200 dark:border-neutral-700"
                                    )}
                                >
                                    {isAdmin ? <ShieldAlert className="size-3" /> : <User className="size-3" />}
                                    {isAdmin ? "Admin" : "Viewer"}
                                </button>
                            </div>
                        </div>

                        <DropdownMenuSeparator className="bg-neutral-100 dark:bg-neutral-800 my-2" />
                        <DropdownMenuItem className="p-3 rounded-xl transition-all cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-800 group">
                            <div className="flex items-center gap-3 text-neutral-500 group-hover:text-neutral-900 dark:group-hover:text-white">
                                <Settings className="size-4" />
                                <span className="text-xs font-bold uppercase tracking-widest text-[10px]">Preferences</span>
                            </div>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="p-3 rounded-xl transition-all cursor-pointer hover:bg-rose-50 dark:hover:bg-rose-500/10 group">
                            <div className="flex items-center gap-3 text-rose-500 font-black text-[10px] uppercase tracking-widest">
                                <LogOut className="size-4" />
                                <span>Sign Out</span>
                            </div>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    )
}
