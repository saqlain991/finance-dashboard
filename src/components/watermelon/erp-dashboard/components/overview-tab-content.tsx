"use client"

import React, { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowUp, ArrowDown, Search, Download, ChevronsUpDown, EyeIcon, EllipsisVertical, CreditCard, DollarSign, Wallet, TrendingUp, Laptop, Plane, ShoppingCart, Zap, Plus, GripVertical, AlertCircle, Info, TrendingDown, Sparkles } from "lucide-react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
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
    ResponsiveContainer,
    Tooltip as RechartsTooltip,
} from "recharts"
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from '@/components/ui/button'
import { Checkbox } from "@/components/ui/checkbox"
import { useApp, useTransactions, useRole } from "@/context/AppContext"
import { BALANCE, CHART_DATA, CATEGORY_COLORS } from "@/lib/constants"
import { cn } from "@/lib/utils"
import { TransactionDetailsDialog } from "./transaction-details-dialog"
import { Transaction } from "@/types"

// DND Imports
import {
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { restrictToVerticalAxis } from '@dnd-kit/modifiers'

// --- Types & Constants ---

const CATEGORY_COLORS_LIST = Object.values(CATEGORY_COLORS)

// --- Sortable Wrapper Component ---

interface SortableItemProps {
  id: string
  children: React.ReactNode
}

function SortableItem({ id, children }: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 1,
    opacity: isDragging ? 0.6 : 1,
  }

  return (
    <div ref={setNodeRef} style={style} className="relative group/sortable">
      <div 
        {...attributes} 
        {...listeners} 
        className="absolute -left-6 top-6 p-1 opacity-0 group-hover/sortable:opacity-100 transition-opacity cursor-grab active:cursor-grabbing z-20 text-neutral-400 hover:text-[#0CC8A8]"
      >
        <GripVertical className="size-5" />
      </div>
      {children}
    </div>
  )
}

// --- Main Component ---

const OverviewTabContent = () => {
    const { state, setFilter } = useApp()
    const { transactions, allFiltered } = useTransactions()
    const { isAdmin, isViewer } = useRole()
    
    // Dialog State
    const [selectedTx, setSelectedTx] = useState<Transaction | null>(null)
    const [dialogOpen, setDialogOpen] = useState(false)

    // DND State
    const [items, setItems] = useState(['stats', 'insights', 'charts', 'table'])
    
    const sensors = useSensors(
      useSensor(PointerSensor, {
        activationConstraint: {
          distance: 8,
        },
      }),
      useSensor(KeyboardSensor, {
        coordinateGetter: sortableKeyboardCoordinates,
      })
    )

    const handleDragEnd = (event: DragEndEvent) => {
      const { active, over } = event
      if (over && active.id !== over.id) {
        setItems((items) => {
          const oldIndex = items.indexOf(active.id as string)
          const newIndex = items.indexOf(over.id as string)
          return arrayMove(items, oldIndex, newIndex)
        })
      }
    }

    const cardBorderStyles = "relative before:absolute before:inset-0 before:rounded-[inherit] dark:before:border dark:before:border-neutral-800/70 dark:before:[mask-image:linear-gradient(to_bottom,black_20%,transparent_60%)] before:pointer-events-none"

    // --- Derived Data for Charts & Insights ---

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

    const financialMetrics = useMemo(() => {
        const income = allFiltered.filter(t => t.type === 'income').reduce((acc, t) => acc + t.price, 0)
        const expenses = allFiltered.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.price, 0)
        return { income, expenses }
    }, [allFiltered])

    const insights = useMemo(() => {
        if (categoryData.length === 0) return null
        const highest = categoryData[0]
        const totalExpense = financialMetrics.expenses
        
        return {
            highestCategory: highest.name,
            highestAmount: highest.value,
            totalExpense,
            comparison: 15.4 // Mock comparison value
        }
    }, [categoryData, financialMetrics])

    const stats = [
        {
            title: "Total Balance",
            value: `$${BALANCE.total.toLocaleString()}`,
            trend: `${BALANCE.monthlyChange}%`,
            description: "vs last month",
            trendType: BALANCE.monthlyChange >= 0 ? "up" : "down",
            icon: DollarSign,
            color: "#0CC8A8"
        },
        {
            title: "Total Income",
            value: `$${financialMetrics.income.toLocaleString()}`,
            trend: "12.5%",
            description: "vs last month",
            trendType: "up",
            icon: ArrowUp,
            color: "#10B981"
        },
        {
            title: "Total Expenses",
            value: `$${financialMetrics.expenses.toLocaleString()}`,
            trend: "3.2%",
            description: "vs last month",
            trendType: "down",
            icon: ArrowDown,
            color: "#EF4444"
        },
        {
            title: "Spending Limit",
            value: `$${BALANCE.spendingLimit.toLocaleString()}`,
            trend: "Stable",
            description: "Monthly cap",
            trendType: "up",
            icon: TrendingUp,
            color: "#6366F1"
        },
    ]

    const salesConfig = {
        profit: { label: "Profit", color: "#0CC8A8" },
        loss: { label: "Loss", color: "#18181B" }
    }

    // --- Render Functions ---

    const renderStats = () => (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {stats.map((stat, index) => {
                const Icon = stat.icon
                return (
                    <Card
                        key={index}
                        className={cn(
                            "bg-white dark:bg-neutral-800/40 border border-neutral-100 dark:border-none shadow-sm rounded-2xl pt-5 pb-4 px-5 min-w-0 transition-all duration-300 hover:shadow-xl hover:shadow-[#0CC8A8]/5 hover:-translate-y-1",
                            cardBorderStyles
                        )}
                    >
                        <CardContent className="p-0 flex flex-col gap-4 min-w-0">
                            <div className="flex items-center justify-between">
                                <div className="text-neutral-400 text-[11px] font-black uppercase tracking-[0.1em]">
                                    {stat.title}
                                </div>
                                <div className="size-9 rounded-xl flex items-center justify-center bg-neutral-50 dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700 shadow-sm">
                                    <Icon className="size-4.5" style={{ color: stat.color }} />
                                </div>
                            </div>
                            <div className="flex flex-col gap-1">
                                <div className="text-neutral-900 dark:text-neutral-100 text-2xl font-black tracking-tight">
                                    {stat.value}
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Badge
                                        className={cn(
                                            "rounded-lg border-none px-1.5 py-0.5 text-[10px] font-black flex items-center gap-0.5",
                                            stat.trendType === 'up'
                                                ? 'bg-emerald-500/10 text-emerald-500'
                                                : 'bg-rose-500/10 text-rose-500'
                                        )}
                                    >
                                        {stat.trendType === 'up' ? <ArrowUp className="size-3" /> : <ArrowDown className="size-3" />}
                                        {stat.trend}
                                    </Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )
            })}
        </div>
    )

    const renderInsights = () => (
        <Card className={cn(
            "bg-gradient-to-br from-[#0CC8A8]/10 via-transparent to-transparent border border-[#0CC8A8]/20 dark:border-none shadow-md rounded-[2rem] overflow-hidden",
            cardBorderStyles
        )}>
            <CardContent className="p-8 flex flex-col lg:flex-row items-center gap-8">
                <div className="flex-1 space-y-3 text-center lg:text-left">
                    <div className="flex items-center gap-3 justify-center lg:justify-start">
                        <div className="size-10 rounded-2xl bg-[#0CC8A8] flex items-center justify-center shadow-lg shadow-[#0CC8A8]/30">
                            <Sparkles className="size-5 text-white" />
                        </div>
                        <h3 className="text-xl font-black text-neutral-900 dark:text-white uppercase tracking-tight">Smart Insights</h3>
                    </div>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 font-medium max-w-md leading-relaxed">
                        Your spending is <span className="text-[#0CC8A8] font-bold">15.4% lower</span> than last month. 
                        You're doing a great job at managing your {insights?.highestCategory.toLowerCase()} expenses.
                    </p>
                </div>
                
                <div className="flex flex-wrap justify-center gap-5">
                    <div className="bg-white/80 dark:bg-neutral-800/80 backdrop-blur-xl p-5 rounded-3xl border border-neutral-100 dark:border-neutral-700 min-w-[220px] shadow-sm transform transition-transform hover:scale-105">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="size-6 rounded-lg bg-[#0CC8A8]/10 flex items-center justify-center">
                                <TrendingUp className="size-3 text-[#0CC8A8]" />
                            </div>
                            <span className="text-[10px] font-black uppercase text-neutral-400 tracking-[0.15em]">Top Expense</span>
                        </div>
                        <div className="text-xl font-black text-neutral-900 dark:text-white mb-1">
                            {insights?.highestCategory || 'N/A'}
                        </div>
                        <div className="flex items-center gap-1.5 font-black text-xs text-[#0CC8A8]">
                            <DollarSign className="size-3" />
                            {insights?.highestAmount.toLocaleString()} Total
                        </div>
                    </div>

                    <div className="bg-white/80 dark:bg-neutral-800/80 backdrop-blur-xl p-5 rounded-3xl border border-neutral-100 dark:border-neutral-700 min-w-[220px] shadow-sm transform transition-transform hover:scale-105">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="size-6 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                                <TrendingDown className="size-3 text-emerald-500" />
                            </div>
                            <span className="text-[10px] font-black uppercase text-neutral-400 tracking-[0.15em]">Efficiency</span>
                        </div>
                        <div className="text-xl font-black text-neutral-900 dark:text-white mb-1">
                            -{insights?.comparison}% Reduced
                        </div>
                        <div className="text-[11px] text-emerald-500 font-black uppercase tracking-widest">
                            Above Average
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )

    const renderCharts = () => (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 min-w-0">
            <Card className={cn(
                "lg:col-span-2 bg-white dark:bg-neutral-900/40 border border-neutral-100 dark:border-none p-8 shadow-sm rounded-[2rem]",
                cardBorderStyles
            )}>
                <CardHeader className="p-0 flex flex-row items-center justify-between gap-4 space-y-0 mb-8">
                    <div className="space-y-1">
                        <CardTitle className="text-neutral-900 dark:text-neutral-100 text-lg font-black uppercase tracking-tight">Financial Performance</CardTitle>
                        <p className="text-xs text-neutral-500 font-bold uppercase tracking-widest opacity-60">Profit vs Loss Analysis</p>
                    </div>
                    <div className="flex items-center gap-5">
                        <div className="flex items-center gap-2">
                            <div className="size-2.5 rounded-full bg-[#0CC8A8] shadow-[0_0_8px_rgba(12,200,168,0.4)]" />
                            <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Profit</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="size-2.5 rounded-full bg-neutral-900 dark:bg-white" />
                            <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Loss</span>
                        </div>
                    </div>
                </CardHeader>
                <ChartContainer config={salesConfig} className="h-[280px] w-full">
                    <BarChart data={CHART_DATA} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                        <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="rgba(0,0,0,0.03)" />
                        <XAxis
                            dataKey="month"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#A3A3A3', fontSize: 11, fontWeight: 800 }}
                            dy={10}
                        />
                        <YAxis hide />
                        <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                        <Bar dataKey="profit" fill="#0CC8A8" radius={[6, 6, 0, 0]} barSize={28} />
                        <Bar dataKey="loss" fill="#18181B" radius={[6, 6, 0, 0]} barSize={28} />
                    </BarChart>
                </ChartContainer>
            </Card>

            <Card className={cn(
                "bg-white dark:bg-neutral-900/40 border border-neutral-100 dark:border-none p-8 shadow-sm rounded-[2rem]",
                cardBorderStyles
            )}>
                <CardHeader className="p-0 space-y-1 mb-8">
                    <CardTitle className="text-neutral-900 dark:text-neutral-100 text-lg font-black uppercase tracking-tight">Spending</CardTitle>
                    <p className="text-xs text-neutral-500 font-bold uppercase tracking-widest opacity-60">By Category</p>
                </CardHeader>
                <div className="h-[200px] w-full flex items-center justify-center relative">
                    {categoryData.length > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={categoryData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={55}
                                    outerRadius={85}
                                    paddingAngle={8}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {categoryData.map((entry, index) => (
                                        <Cell 
                                          key={`cell-${index}`} 
                                          fill={CATEGORY_COLORS_LIST[index % CATEGORY_COLORS_LIST.length]} 
                                          className="hover:opacity-80 transition-opacity cursor-pointer shadow-xl"
                                        />
                                    ))}
                                </Pie>
                                <RechartsTooltip 
                                    content={({ active, payload }) => {
                                      if (active && payload && payload.length) {
                                        return (
                                          <div className="bg-neutral-900 dark:bg-neutral-800 p-3 rounded-2xl shadow-2xl border-none">
                                            <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-1">{payload[0].name}</p>
                                            <p className="text-sm font-black text-white">${payload[0].value.toLocaleString()}</p>
                                          </div>
                                        )
                                      }
                                      return null
                                    }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="flex flex-col items-center gap-2 text-neutral-400">
                            <AlertCircle className="size-8 opacity-20" />
                            <span className="text-xs font-black uppercase tracking-widest opacity-50">No Data</span>
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
        </div>
    )

    const renderTable = () => (
        <Card className={cn(
            "bg-white dark:bg-neutral-900/40 border border-neutral-100 dark:border-none p-6 shadow-sm rounded-[2rem]",
            cardBorderStyles
        )}>
            <CardHeader className="p-0 flex flex-col lg:flex-row items-center justify-between pb-8 gap-6">
                <div className="space-y-1 text-center lg:text-left">
                    <CardTitle className="text-neutral-900 dark:text-neutral-100 text-xl font-black uppercase tracking-tight">Recent Transactions</CardTitle>
                    <p className="text-xs text-neutral-500 font-bold uppercase tracking-widest opacity-60">Status of your latest payments</p>
                </div>
                <div className="flex flex-wrap items-center justify-center lg:justify-end gap-3 w-full lg:w-auto">
                    <div className="relative group/search flex-1 min-w-[240px] lg:flex-none lg:w-72">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-neutral-400 group-focus-within/search:text-[#0CC8A8] transition-colors z-10 pointer-events-none" />
                        <Input
                            placeholder="Search activity..."
                            value={state.filters.search}
                            onChange={(e) => setFilter({ search: e.target.value })}
                            className="h-11! w-full bg-neutral-50 dark:bg-neutral-800/50! border-neutral-100 dark:border-neutral-800! pl-11 text-sm font-bold placeholder:text-neutral-400 rounded-2xl focus-visible:ring-2 focus-visible:ring-[#0CC8A8]/20 transition-all shadow-none outline-none"
                        />
                    </div>
                    {isAdmin && (
                        <Button 
                            className="bg-[#0CC8A8] hover:bg-[#0AA88D] text-white h-11 rounded-2xl px-6 font-black text-xs gap-2 shadow-lg shadow-[#0CC8A8]/30 transition-all active:scale-95 border-none"
                            onClick={(e) => { e.stopPropagation(); alert("Add Transaction Mock") }}
                        >
                            <Plus className="size-4" strokeWidth={3} />
                            Add Transaction
                        </Button>
                    )}
                    <div className="flex items-center gap-2">
                         <Select value={state.filters.type || "all"} onValueChange={(val: any) => setFilter({ type: val })}>
                            <SelectTrigger className="h-11 px-5 rounded-2xl bg-neutral-50 dark:bg-neutral-800 border-neutral-100 dark:border-neutral-800 font-black text-xs gap-3">
                                <SelectValue placeholder="Type" />
                            </SelectTrigger>
                            <SelectContent className="bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 rounded-2xl">
                                <SelectItem value="all" className="font-bold">All Types</SelectItem>
                                <SelectItem value="income" className="font-bold">Income</SelectItem>
                                <SelectItem value="expense" className="font-bold">Expense</SelectItem>
                            </SelectContent>
                        </Select>
                        {!isViewer && (
                            <Button variant="outline" className="h-11 rounded-2xl px-5 border-neutral-100 dark:border-neutral-800 font-black text-xs gap-2 hover:bg-neutral-50 dark:hover:bg-neutral-800 bg-white dark:bg-transparent">
                                <Download className="size-4" />
                                Export
                            </Button>
                        )}
                    </div>
                </div>
            </CardHeader>
            <div className="relative overflow-hidden rounded-[1.5rem] border border-neutral-50 dark:border-neutral-800 shadow-sm">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-neutral-50 dark:bg-neutral-800/80 hover:bg-neutral-50 dark:hover:bg-neutral-800/80 border-b border-neutral-100 dark:border-neutral-800">
                            <TableHead className="w-14 text-center"><Checkbox className="rounded" /></TableHead>
                            <TableHead className="text-[10px] font-black uppercase text-neutral-400 tracking-[0.2em] h-12 pl-4">Activity</TableHead>
                            <TableHead className="text-[10px] font-black uppercase text-neutral-400 tracking-[0.2em]">Category</TableHead>
                            <TableHead className="text-[10px] font-black uppercase text-neutral-400 tracking-[0.2em]">Price</TableHead>
                            <TableHead className="text-[10px] font-black uppercase text-neutral-400 tracking-[0.2em] text-center">Status</TableHead>
                            <TableHead className="text-[10px] font-black uppercase text-neutral-400 tracking-[0.2em]">Date</TableHead>
                            <TableHead className="text-right pr-8"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {transactions.length > 0 ? (
                          transactions.slice(0, 10).map((tx) => {
                            const Icon = tx.category === 'Technology' ? Laptop : 
                                         tx.category === 'Travel' ? Plane : 
                                         tx.category === 'Food' ? ShoppingCart : Zap
                            
                            return (
                                <TableRow 
                                    key={tx.id} 
                                    className="border-neutral-100 dark:border-neutral-800 hover:bg-neutral-50/50 dark:hover:bg-neutral-800/30 transition-colors group cursor-pointer"
                                    onClick={() => { setSelectedTx(tx); setDialogOpen(true); }}
                                >
                                    <TableCell className="w-14 text-center" onClick={(e) => e.stopPropagation()}><Checkbox className="rounded-md" /></TableCell>
                                    <TableCell className="py-5 pl-4">
                                        <div className="flex items-center gap-4">
                                            <div className={cn(
                                                "size-11 rounded-2xl flex items-center justify-center shadow-sm transition-all duration-300 group-hover:scale-105",
                                                tx.type === 'income' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-500' : 'bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400'
                                            )}>
                                                <Icon className="size-5.5" />
                                            </div>
                                            <div className="flex flex-col gap-0.5">
                                                <span className="text-sm font-black text-neutral-900 dark:text-neutral-100 group-hover:text-[#0CC8A8] transition-colors">{tx.activity}</span>
                                                <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest leading-none">{tx.id}</span>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className="text-[10px] font-black uppercase tracking-widest border-neutral-100 dark:border-neutral-800 bg-white/50 dark:bg-transparent px-2.5 py-1 rounded-lg">
                                            {tx.category}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className={cn(
                                        "text-sm font-black",
                                        tx.type === 'income' ? 'text-emerald-500' : 'text-neutral-900 dark:text-neutral-100'
                                    )}>
                                        {tx.type === 'income' ? '+' : '-'}${tx.price.toLocaleString()}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex justify-center">
                                            <div className={cn(
                                                "inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-tight shadow-sm",
                                                tx.status === 'Completed' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-500' : 
                                                tx.status === 'Pending' ? 'bg-rose-50 text-rose-600 dark:bg-rose-500/20 dark:text-rose-50' : 'bg-amber-50 text-amber-600 dark:bg-amber-500/20 dark:text-amber-500'
                                            )}>
                                                <div className={cn("size-2 rounded-full shadow-current animate-pulse", 
                                                    tx.status === 'Completed' ? 'bg-emerald-600 dark:bg-emerald-500' : 
                                                    tx.status === 'Pending' ? 'bg-rose-600 dark:bg-rose-500' : 'bg-amber-600 dark:bg-amber-500'
                                                )} />
                                                {tx.status}
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-[11px] font-black text-neutral-400 uppercase tracking-widest">{tx.date}</TableCell>
                                    <TableCell className="text-right pr-6" onClick={(e) => e.stopPropagation()}>
                                        <div className="flex items-center justify-end gap-1">
                                            <Button 
                                                variant="ghost" 
                                                size="icon" 
                                                className="size-9 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity hover:bg-neutral-100 dark:hover:bg-neutral-800"
                                                onClick={() => { setSelectedTx(tx); setDialogOpen(true); }}
                                            >
                                                <EyeIcon className="size-4.5 text-neutral-400" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="size-9 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800">
                                                <EllipsisVertical className="size-4.5 text-neutral-400" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )
                          })
                        ) : (
                          <TableRow>
                            <TableCell colSpan={7} className="h-80 text-center">
                              <div className="flex flex-col items-center gap-4 text-neutral-400">
                                <div className="size-16 rounded-3xl bg-neutral-50 dark:bg-neutral-800 flex items-center justify-center opacity-30">
                                    <Search className="size-8" />
                                </div>
                                <div className="space-y-1">
                                    <span className="text-sm font-black uppercase tracking-[0.2em] block">No Data Found</span>
                                    <span className="text-[11px] font-bold opacity-60">Try adjusting your filters</span>
                                </div>
                              </div>
                            </TableCell>
                          </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </Card>
    )

    const componentsMap: Record<string, () => React.ReactNode> = {
        stats: renderStats,
        insights: renderInsights,
        charts: renderCharts,
        table: renderTable
    }

    return (
        <div className='flex flex-col gap-8 px-7 max-md:px-5 py-8 pb-20 bg-neutral-50/30 dark:bg-transparent min-h-screen'>
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
                modifiers={[restrictToVerticalAxis]}
            >
                <SortableContext
                    items={items}
                    strategy={verticalListSortingStrategy}
                >
                    <div className="flex flex-col gap-8 w-full max-w-[1440px] mx-auto">
                        {items.map((id) => (
                            <SortableItem key={id} id={id}>
                                {componentsMap[id]()}
                            </SortableItem>
                        ))}
                    </div>
                </SortableContext>
            </DndContext>

            <TransactionDetailsDialog 
                transaction={selectedTx}
                open={dialogOpen}
                onOpenChange={setDialogOpen}
            />
        </div>
    )
}

export default OverviewTabContent
