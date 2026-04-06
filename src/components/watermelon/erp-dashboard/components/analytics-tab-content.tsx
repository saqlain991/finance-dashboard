"use client"

import React, { useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, DollarSign, Activity, Percent, Layers, PieChart as PieChartIcon, BarChart3, LineChart as LineChartIcon, ArrowUpRight, ArrowDownRight, Sparkles } from "lucide-react"
import {
    Bar,
    BarChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Area,
    AreaChart,
    Pie,
    PieChart,
    Cell,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip as RechartsTooltip,
} from "recharts"
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { useTransactions, useRole, useAnalyticsData } from "@/context/AppContext"
import { CATEGORY_COLORS } from "@/lib/constants"
import { cn } from "@/lib/utils"

const CATEGORY_COLORS_LIST = Object.values(CATEGORY_COLORS)

// Helper to filter out Recharts-specific props from reaching DOM elements
const sanitizeRechartsProps = (props: any) => {
    const { 
        allowEscapeViewBox, 
        animationDuration, 
        animationEasing, 
        filterNull, 
        activeCoordinate, 
        activePayload, 
        activeLabel, 
        viewBox,
        ...rest 
    } = props
    return rest
}

const AnalyticsTabContent = () => {
    const { allFiltered } = useTransactions()
    const { isAdmin } = useRole()
    const { chartData } = useAnalyticsData()

    const financialMetrics = useMemo(() => {
        const income = allFiltered.filter(t => t.type === 'income').reduce((acc, t) => acc + t.price, 0)
        const expenses = allFiltered.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.price, 0)
        const net = income - expenses
        const avg = allFiltered.length > 0 ? (income + expenses) / allFiltered.length : 0
        return { income, expenses, net, avg }
    }, [allFiltered])

    const categoryData = useMemo(() => {
        const counts: Record<string, number> = {}
        allFiltered.forEach(t => {
            if (t.type === 'expense') {
                counts[t.category] = (counts[t.category] || 0) + t.price
            }
        })
        return Object.entries(counts)
            .map(([name, value]) => ({ name, value }))
            .sort((a, b) => b.value - a.value)
    }, [allFiltered])

    const chartConfig = {
        profit: { label: "Profit", color: "#0CC8A8" },
        loss: { label: "Loss", color: "#18181B" },
    }

    const cardBorderStyles = "relative before:absolute before:inset-0 before:rounded-[inherit] dark:before:border dark:before:border-neutral-800/70 dark:before:[mask-image:linear-gradient(to_bottom,black_20%,transparent_60%)] before:pointer-events-none"

    const kpis = [
        { title: "Net Revenue", value: `$${financialMetrics.net.toLocaleString()}`, trend: "+12.4%", icon: DollarSign, color: "#0CC8A8", description: "After all deductions" },
        { title: "Profit Margin", value: "32.8%", trend: "+5.2%", icon: Percent, color: "#8B5CF6", description: "Operational efficiency" },
        { title: "Avg Check", value: `$${financialMetrics.avg.toFixed(2)}`, trend: "-2.1%", icon: Activity, color: "#F59E0B", description: "Per transaction unit" },
        { title: "Active Assets", value: "14 Nodes", trend: "Stable", icon: Layers, color: "#10B981", description: "Managed infrastructure" },
    ]

    return (
        <div className='flex flex-col gap-8 px-7 max-md:px-5 py-8 pb-20 bg-neutral-50/30 dark:bg-transparent min-h-screen'>
            <div className="max-w-[1440px] mx-auto w-full space-y-8">
                {/* KPI Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {kpis.map((kpi, idx) => (
                        <Card key={idx} className={cn(
                            "bg-white dark:bg-neutral-900/40 border border-neutral-100 dark:border-none shadow-sm rounded-[1.5rem] overflow-hidden group hover:shadow-xl hover:shadow-[#0CC8A8]/5 transition-all duration-500 hover:-translate-y-1",
                            cardBorderStyles
                        )}>
                            <CardContent className="p-6 space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="size-10 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700 flex items-center justify-center transition-all group-hover:scale-110 group-hover:bg-[#0CC8A8] group-hover:text-white">
                                        <kpi.icon className="size-5" strokeWidth={2.5}/>
                                    </div>
                                    <Badge variant="outline" className={cn(
                                        "px-2 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-widest border-none",
                                        kpi.trend.startsWith('+') ? 'bg-emerald-50 text-emerald-500 text-center' : 'bg-rose-50 text-rose-500'
                                    )}>
                                        {kpi.trend === 'Stable' ? 'STABLE' : kpi.trend}
                                    </Badge>
                                </div>
                                <div>
                                    <h4 className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em] mb-1">{kpi.title}</h4>
                                    <div className="text-2xl font-black text-neutral-900 dark:text-neutral-100 tracking-tighter">{kpi.value}</div>
                                </div>
                                <div className="pt-2 border-t border-neutral-50 dark:border-neutral-800 text-[10px] font-bold text-neutral-400 uppercase tracking-tight">
                                    {kpi.description}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Growth & Trend Analysis */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <Card className={cn(
                        "bg-white dark:bg-neutral-900/40 border border-neutral-100 dark:border-none p-8 shadow-sm rounded-[2rem]",
                        cardBorderStyles
                    )}>
                        <CardHeader className="p-0 flex flex-row items-center justify-between gap-4 mb-8">
                            <div className="space-y-1">
                                <CardTitle className="text-lg font-black uppercase tracking-tight">Profit Trajectory<span className="text-[#0CC8A8]">.</span></CardTitle>
                                <p className="text-xs text-neutral-500 font-bold uppercase tracking-widest opacity-60">Comparative Growth Analysis</p>
                            </div>
                            <div className="flex gap-2">
                                <div className="flex items-center gap-1.5 bg-neutral-50 dark:bg-neutral-800 px-3 py-1.5 rounded-xl border border-neutral-100 dark:border-neutral-800">
                                    <ArrowUpRight className="size-3.5 text-[#0CC8A8]" />
                                    <span className="text-[10px] font-black uppercase tracking-widest">+15.4%</span>
                                </div>
                            </div>
                        </CardHeader>
                        <div className="h-[300px] min-h-[300px] w-full">
                            <ChartContainer config={chartConfig}>
                                <AreaChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#0CC8A8" stopOpacity={0.15}/>
                                            <stop offset="95%" stopColor="#0CC8A8" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="rgba(0,0,0,0.03)" />
                                    <XAxis 
                                        dataKey="month" 
                                        axisLine={false} 
                                        tickLine={false} 
                                        tick={{ fill: '#A3A3A3', fontSize: 10, fontWeight: 900 }}
                                        dy={10}
                                    />
                                    <YAxis hide />
                                    <ChartTooltip content={<ChartTooltipContent />} />
                                    <Area 
                                        type="monotone" 
                                        dataKey="profit" 
                                        stroke="#0CC8A8" 
                                        strokeWidth={3} 
                                        fillOpacity={1} 
                                        fill="url(#colorProfit)" 
                                        animationDuration={1000}
                                    />
                                </AreaChart>
                            </ChartContainer>
                        </div>
                    </Card>

                    <Card className={cn(
                        "bg-white dark:bg-neutral-900/40 border border-neutral-100 dark:border-none p-8 shadow-sm rounded-[2rem]",
                        cardBorderStyles
                    )}>
                        <CardHeader className="p-0 flex flex-row items-center justify-between gap-4 mb-8">
                            <div className="space-y-1">
                                <CardTitle className="text-lg font-black uppercase tracking-tight">Operations Balance<span className="text-rose-500">.</span></CardTitle>
                                <p className="text-xs text-neutral-500 font-bold uppercase tracking-widest opacity-60">Income vs Overhead</p>
                            </div>
                        </CardHeader>
                        <div className="h-[300px] min-h-[300px] w-full">
                            <ChartContainer config={chartConfig}>
                                <BarChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                                    <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="rgba(0,0,0,0.03)" />
                                    <XAxis 
                                        dataKey="month" 
                                        axisLine={false} 
                                        tickLine={false} 
                                        tick={{ fill: '#A3A3A3', fontSize: 10, fontWeight: 900 }}
                                        dy={10}
                                    />
                                    <YAxis hide />
                                    <ChartTooltip content={<ChartTooltipContent />} />
                                    <Bar dataKey="profit" fill="#0CC8A8" radius={[4, 4, 0, 0]} barSize={20} />
                                    <Bar dataKey="loss" fill="#18181B" radius={[4, 4, 0, 0]} barSize={20} />
                                </BarChart>
                            </ChartContainer>
                        </div>
                    </Card>
                </div>

                {/* Categorical & Velocity Analysis */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <Card className={cn(
                        "lg:col-span-1 bg-white dark:bg-neutral-900/40 border border-neutral-100 dark:border-none p-8 shadow-sm rounded-[2rem]",
                        cardBorderStyles
                    )}>
                        <CardHeader className="p-0 mb-8">
                            <CardTitle className="text-lg font-black uppercase tracking-tight">Asset Allocation<span>.</span></CardTitle>
                            <p className="text-xs text-neutral-500 font-bold uppercase tracking-widest opacity-60">Category Distribution</p>
                        </CardHeader>
                        <div className="h-[240px] min-h-[240px] w-full relative">
                            {categoryData.length > 0 ? (
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={categoryData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={90}
                                            paddingAngle={8}
                                            dataKey="value"
                                            stroke="none"
                                        >
                                            {categoryData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={CATEGORY_COLORS_LIST[index % CATEGORY_COLORS_LIST.length]} />
                                            ))}
                                        </Pie>
                                        <RechartsTooltip content={(props: any) => (
                                            <div className="bg-white dark:bg-neutral-900 p-3 rounded-2xl shadow-2xl border-none font-black text-[10px]" {...sanitizeRechartsProps(props)} />
                                        )} />
                                    </PieChart>
                                </ResponsiveContainer>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-full text-neutral-400 gap-2">
                                    <Activity className="size-8 opacity-20" />
                                    <span className="text-[10px] font-black uppercase tracking-widest opacity-40">Insufficient Data</span>
                                </div>
                            )}
                        </div>
                        <div className="mt-8 space-y-3">
                            {categoryData.slice(0, 4).map((item, idx) => (
                                <div key={idx} className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="size-2.5 rounded-full" style={{ backgroundColor: CATEGORY_COLORS_LIST[idx % CATEGORY_COLORS_LIST.length] }} />
                                        <span className="text-[11px] font-black text-neutral-500 uppercase tracking-tight">{item.name}</span>
                                    </div>
                                    <span className="text-[12px] font-black text-neutral-900 dark:text-neutral-100">${item.value.toLocaleString()}</span>
                                </div>
                            ))}
                        </div>
                    </Card>

                    <Card className={cn(
                        "lg:col-span-2 bg-white dark:bg-neutral-900/40 border border-neutral-100 dark:border-none p-8 shadow-sm rounded-[2rem]",
                        cardBorderStyles
                    )}>
                        <CardHeader className="p-0 flex flex-row items-center justify-between gap-4 mb-8">
                            <div className="space-y-1">
                                <CardTitle className="text-lg font-black uppercase tracking-tight">Activity Velocity<span className="text-[#0CC8A8]">.</span></CardTitle>
                                <p className="text-xs text-neutral-500 font-bold uppercase tracking-widest opacity-60">Real-time engagement index</p>
                            </div>
                        </CardHeader>
                        <div className="h-[340px] min-h-[340px] w-full">
                            <ChartContainer config={chartConfig}>
                                <LineChart data={chartData} margin={{ top: 0, right: 40, left: -20, bottom: 0 }}>
                                    <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="rgba(0,0,0,0.03)" />
                                    <XAxis 
                                        dataKey="month" 
                                        axisLine={false} 
                                        tickLine={false} 
                                        tick={{ fill: '#A3A3A3', fontSize: 10, fontWeight: 900 }}
                                        dy={10}
                                    />
                                    <YAxis hide />
                                    <ChartTooltip content={<ChartTooltipContent />} />
                                    <Line 
                                        type="stepAfter" 
                                        dataKey="profit" 
                                        stroke="#0CC8A8" 
                                        strokeWidth={4} 
                                        dot={{ fill: '#0CC8A8', strokeWidth: 2, r: 4, stroke: '#fff' }}
                                        activeDot={{ r: 6, strokeWidth: 0 }}
                                    />
                                    <Line 
                                        type="monotone" 
                                        dataKey="loss" 
                                        stroke="#18181B" 
                                        strokeWidth={2} 
                                        strokeDasharray="5 5"
                                        dot={false}
                                    />
                                </LineChart>
                            </ChartContainer>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default AnalyticsTabContent;
