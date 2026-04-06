import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Mail, RefreshCcw, Calendar, Download, LayoutDashboard, Database, TrendingUp, Loader2 } from "lucide-react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import OverviewTabContent from "@/components/watermelon/erp-dashboard/components/overview-tab-content"
import HistoryTabContent from "@/components/watermelon/erp-dashboard/components/history-tab-content"
import AnalyticsTabContent from "@/components/watermelon/erp-dashboard/components/analytics-tab-content"
import { useRole } from "@/context/AppContext"
import { cn } from "@/lib/utils"

export default function DashboardPageView() {
    const { isAdmin } = useRole()
    const [isRefreshing, setIsRefreshing] = useState(false)

    const handleReload = () => {
        setIsRefreshing(true)
        setTimeout(() => {
            setIsRefreshing(false)
        }, 1000)
    }

    return (
        <div className='flex flex-col relative'>
            {isRefreshing && (
                <div className="absolute inset-0 z-[60] bg-white/80 dark:bg-[#0F0F0F]/90 backdrop-blur-md flex items-center justify-center rounded-[2.5rem] transition-all duration-300 animate-in fade-in zoom-in-95">
                    <div className="flex flex-col items-center gap-6 p-10 bg-white dark:bg-neutral-900 rounded-[2rem] shadow-2xl border border-neutral-100 dark:border-neutral-800">
                        <div className="relative">
                            <RefreshCcw className="size-12 text-[#0CC8A8] animate-spin" />
                            <div className="absolute inset-0 size-12 rounded-full border-4 border-[#0CC8A8]/20 border-t-[#0CC8A8] animate-spin" />
                        </div>
                        <div className="text-center space-y-2">
                            <h3 className="text-sm font-black uppercase tracking-[0.3em] text-[#0CC8A8]">Synchronizing Data</h3>
                            <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest opacity-60">Optimizing ERP Environment</p>
                        </div>
                    </div>
                </div>
            )}

            <Tabs defaultValue="overview" className="w-full">
                <div className="flex flex-col md:flex-row md:items-center justify-between min-h-[4rem] border-b border-neutral-100 dark:border-neutral-800 px-7 max-md:p-3 py-3 md:py-0 gap-6 bg-transparent">

                    <TabsList
                        className="
                bg-neutral-100/60 dark:bg-neutral-900/60
                min-h-[50px]
                px-2
                flex items-center justify-start md:justify-center gap-2
                rounded-xl
                border border-neutral-300/60 dark:border-neutral-700
                shadow-sm
                overflow-x-auto overflow-y-hidden 
                max-w-full no-scrollbar flex-nowrap whitespace-nowrap
            "
                    >
                        <TabsTrigger
                            value="overview"
                            className="
                    group flex items-center gap-3
                    px-6 h-[38px]
                    rounded-lg
                    transition-all duration-300
                    cursor-pointer

                    text-sm font-semibold uppercase tracking-wide

                    text-neutral-500 dark:text-neutral-400
                    hover:text-[#0CC8A8]

                    data-[state=active]:bg-white 
                    dark:data-[state=active]:bg-neutral-800
                    data-[state=active]:text-[#0CC8A8]
                    data-[state=active]:shadow-sm
                "
                        >
                            <LayoutDashboard className="size-4" />
                            <span>Overview</span>
                        </TabsTrigger>

                        <TabsTrigger
                            value="history"
                            className="
                    group flex items-center gap-3
                    px-6 h-[38px]
                    rounded-lg
                    transition-all duration-300
                    cursor-pointer

                    text-sm font-semibold uppercase tracking-wide

                    text-neutral-500 dark:text-neutral-400
                    hover:text-[#0CC8A8]

                    data-[state=active]:bg-white 
                    dark:data-[state=active]:bg-neutral-800
                    data-[state=active]:text-[#0CC8A8]
                    data-[state=active]:shadow-sm
                "
                        >
                            <Database className="size-5" />
                            <span>History</span>
                        </TabsTrigger>

                        <TabsTrigger
                            value="analytics"
                            className="
                    group flex items-center gap-3
                    px-6 h-[38px]
                    rounded-lg
                    transition-all duration-300
                    cursor-pointer

                    text-sm font-semibold uppercase tracking-wide

                    text-neutral-500 dark:text-neutral-400
                    hover:text-[#0CC8A8]

                    data-[state=active]:bg-white 
                    dark:data-[state=active]:bg-neutral-800
                    data-[state=active]:text-[#0CC8A8]
                    data-[state=active]:shadow-sm
                "
                        >
                            <TrendingUp className="size-5" />
                            <span>Analytics</span>
                        </TabsTrigger>
                    </TabsList>

                    <div className="flex items-center gap-2 max-md:w-full max-md:justify-end">
                        <Button
                            variant="ghost"
                            onClick={handleReload}
                            disabled={isRefreshing}
                            className="
                                h-[44px] px-5
                                rounded-xl
                                flex items-center gap-2.5

                                text-neutral-500
                                bg-neutral-50 dark:bg-neutral-800/50
                                border border-neutral-200 dark:border-neutral-700

                                hover:bg-neutral-100 dark:hover:bg-neutral-800
                                hover:text-[#0CC8A8]

                                transition-all active:scale-95 disabled:opacity-50
                            "
                        >
                            <RefreshCcw
                                className={cn(
                                    "size-4",
                                    isRefreshing && "animate-spin text-[#0CC8A8]"
                                )}
                            />
                            {/* <span className="text-sm font-semibold">Reload</span> */}
                        </Button>


                        <Select defaultValue="monthly">
                            <SelectTrigger
                                className="min-h-[44px] px-5 w-fit bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 px-3 gap-2 text-foreground rounded-xl focus:ring-0 shadow-none! transition-all cursor-pointer outline-none text-xs font-bold"
                            >
                                <Calendar className="size-4 text-[#0CC8A8]" />
                                <SelectValue placeholder="Select period" />
                            </SelectTrigger>
                            <SelectContent align="end" sideOffset={5} className="bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-neutral-100 min-w-[160px]">
                                <SelectItem value="daily">Daily</SelectItem>
                                <SelectItem value="weekly">Weekly</SelectItem>
                                <SelectItem value="monthly">Monthly</SelectItem>
                                <SelectItem value="yearly">Yearly</SelectItem>
                            </SelectContent>
                        </Select>

                        {isAdmin && (
                            <DropdownMenu>
                                <DropdownMenuTrigger
                                    className="
                            flex items-center gap-2 rounded-xl text-white hover:bg-[#0AA88D]
                            bg-[#0CC8A8] h-9 px-4 font-bold text-xs shadow-lg shadow-[#0CC8A8]/20 transition-all active:scale-95
                        "
                                >
                                    <Download className="size-4" />
                                    <span>Export Profile</span>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-40 border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 z-50 rounded-xl">
                                    <DropdownMenuItem className="cursor-pointer focus:bg-neutral-100 dark:focus:bg-neutral-800 font-medium text-xs">
                                        Download CSV
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="cursor-pointer focus:bg-neutral-100 dark:focus:bg-neutral-800 font-medium text-xs">
                                        Download PDF
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        )}
                    </div>
                </div>

                <TabsContent value="overview" className="mt-0 p-0 animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <OverviewTabContent />
                </TabsContent>
                <TabsContent value="history" className="mt-0 p-0 animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <HistoryTabContent />
                </TabsContent>
                <TabsContent value="analytics" className="mt-0 p-0 animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <AnalyticsTabContent />
                </TabsContent>
            </Tabs>
        </div>
    )
}
