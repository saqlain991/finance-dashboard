"use client"

import React, { useState, useMemo } from "react"
import {
  Search, Bell, HelpCircle, ChevronDown, LayoutDashboard, Calendar, Mail,
  FileText, Users, Layers, Settings, Sun, Moon, LogOut, ArrowUpRight,
  ArrowDownRight, CreditCard, MoreVertical, Smartphone, Hotel, Plane,
  ShoppingCart, Code, Activity, Briefcase, CheckCircle2,
  TrendingUp, AlertCircle, Edit, Trash2, Plus, Sparkles, Filter, MoreHorizontal,
  ArrowRight, Download, Laptop, Zap, Gift, Shield
} from "lucide-react"
import { motion, AnimatePresence, Reorder } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, PieChart, Pie, Cell, ResponsiveContainer } from "recharts"
import { useApp, useRole, useTransactions } from "@/context/AppContext"
import { PROFILES, TRANSACTION_CATEGORIES } from "@/lib/constants"
import { cn } from "@/lib/utils"

/* -------------------------------------------------------------------------- */
/*                                COMPONENTS                                  */
/* -------------------------------------------------------------------------- */

// 1. Profile Switcher Component
const ProfileSwitcher = () => {
  const { state, dispatch } = useApp()
  const { role } = useRole()
  const [open, setOpen] = useState(false)
  const currentProfile = PROFILES[state.activeProfileIndex]

  return (
    <div className="relative">
      <div
        onClick={() => setOpen(!open)}
        className="flex items-center gap-3 bg-white dark:bg-zinc-900 rounded-full p-1 pr-4 border border-zinc-200 dark:border-zinc-800 cursor-pointer hover:shadow-sm transition-all active:scale-95"
      >
        <Avatar className="w-8 h-8">
          <AvatarImage src={currentProfile.avatar || ""} />
          <AvatarFallback className="bg-[#0CC8A8] text-white font-bold">{currentProfile.initials}</AvatarFallback>
        </Avatar>
        <div className="hidden sm:block text-left">
          <div className="text-sm font-bold text-zinc-900 dark:text-white leading-tight">{currentProfile.name}</div>
          <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">{role}</div>
        </div>
        <ChevronDown className={cn("w-4 h-4 text-zinc-400 transition-transform", open && "rotate-180")} />
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute top-full mt-2 right-0 w-64 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl z-50 p-2"
          >
            <div className="px-3 py-2 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Switch Account</div>
            {PROFILES.map((profile, idx) => (
              <button
                key={profile.email}
                onClick={() => {
                  dispatch({ type: "SET_PROFILE", payload: idx })
                  setOpen(false)
                }}
                className={cn(
                  "w-full flex items-center gap-3 p-2 rounded-xl transition-colors mb-1",
                  state.activeProfileIndex === idx ? "bg-zinc-100 dark:bg-zinc-800" : "hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                )}
              >
                <Avatar className="w-9 h-9">
                  <AvatarFallback className={cn("text-xs font-bold", state.activeProfileIndex === idx ? "bg-[#0CC8A8] text-white" : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500")}>
                    {profile.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="text-left flex-1 overflow-hidden">
                  <div className="text-sm font-bold truncate dark:text-white">{profile.name}</div>
                  <div className="text-[10px] text-zinc-500 font-medium truncate">{profile.role}</div>
                </div>
                {state.activeProfileIndex === idx && <CheckCircle2 className="w-4 h-4 text-[#0CC8A8]" />}
              </button>
            ))}
            <div className="h-px bg-zinc-100 dark:bg-zinc-800 my-2 mx-2"></div>
            <button className="w-full flex items-center gap-2 p-2 px-3 text-sm font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-colors">
              <LogOut className="w-4 h-4" /> Log out
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// 2. Main Dashboard Component
export default function FinexyDashboard() {
  const { state, dispatch, setFilter } = useApp()
  const { role, isAdmin, isEditor } = useRole()
  const { transactions, allFiltered } = useTransactions()
  const currentProfile = PROFILES[state.activeProfileIndex]

  // KPI Items for Draggable Group
  const [kpiIds, setKpiIds] = useState(["e", "s", "i", "r"])
  const kpis = useMemo(() => {
    const data = {
      e: { title: "Total Earnings", val: "$950", trend: "+7%", icon: Briefcase, color: "bg-[#0CC8A8]", text: "text-white" },
      s: { title: "Total Spending", val: "$700", trend: "-5%", icon: CreditCard, color: "bg-white", text: "text-zinc-900" },
      i: { title: "Total Income", val: "$1,050", trend: "+8%", icon: Activity, color: "bg-white", text: "text-zinc-900" },
      r: { title: "Total Revenue", val: "$850", trend: "+4%", icon: BarChart, color: "bg-white", text: "text-zinc-900" },
    }
    return kpiIds.map(id => ({ ...data[id], id }))
  }, [kpiIds])

  // Chart Data
  const chartConfig = {
    profit: { label: "Profit", color: "#0CC8A8" },
    loss: { label: "Loss", color: "#18181B" },
  }

  // Handlers
  const handleExport = (format) => {
    const data = JSON.stringify(state.transactions, null, 2)
    const blob = new Blob([data], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `finexy_transactions.${format}`
    link.click()
  }

  return (
    <div className="min-h-screen bg-[#F5F5F7] dark:bg-[#0F0F10] text-[#1D1D1F] dark:text-[#F5F5F7] flex font-sans selection:bg-[#0CC8A8]/20">

      {/* SIDEBAR - SLIM & CIRCULAR ICONS */}
      <aside className="w-[88px] hidden lg:flex flex-col items-center py-8 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl border-r border-zinc-200/50 dark:border-zinc-800/50 z-30 sticky top-0 h-screen">
        <div className="w-12 h-12 rounded-[18px] bg-[#0CC8A8] flex items-center justify-center text-white shadow-lg shadow-[#0CC8A8]/30 mb-12 cursor-pointer hover:scale-105 transition-transform">
          <ArrowUpRight className="w-7 h-7 stroke-[2.5]" />
        </div>

        <nav className="flex flex-col gap-6 flex-1">
          {[LayoutDashboard, Calendar, Mail, FileText, Users, Layers, Settings].map((Icon, i) => (
            <button key={i} className={cn(
              "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 group",
              i === 0 ? "bg-[#0CC8A8] text-white shadow-md shadow-[#0CC8A8]/20" : "text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800"
            )}>
              <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>
          ))}
        </nav>

        <div className="flex flex-col gap-6 mt-auto pt-6 border-t border-zinc-100 dark:border-zinc-800 w-full items-center">
          <button className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"><HelpCircle className="w-6 h-6" /></button>
          <button className="text-zinc-400 hover:text-red-500 transition-colors"><LogOut className="w-6 h-6" /></button>
        </div>
      </aside>

      {/* MAIN CONTAINER */}
      <main className="flex-1 flex flex-col md:flex-row relative">

        {/* LEFT PANEL / SIDEBAR PANEL (Greetings, Balance, Wallets) */}
        <div className="w-full md:w-[380px] p-6 lg:p-8 shrink-0 bg-white dark:bg-zinc-900 border-r border-zinc-100 dark:border-zinc-800 layout-scroll h-full lg:sticky lg:top-0">
          <div className="flex flex-col gap-8">

            {/* GREETING */}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-3xl font-bold tracking-tight">Good morning, {currentProfile.name.split(" ")[0]}</h1>
                <Sparkles className="w-6 h-6 text-[#0CC8A8] animate-pulse" />
              </div>
              <p className="text-sm text-zinc-500 font-medium leading-relaxed">Stay on top of your tasks, monitor progress, and track status.</p>
            </div>

            {/* TOTAL BALANCE CARD */}
            <Card className="rounded-[32px] overflow-hidden border-none shadow-xl shadow-zinc-200/50 dark:shadow-none bg-white dark:bg-zinc-800/50 relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#0CC8A8]/5 rounded-full blur-3xl -mr-10 -mt-10"></div>
              <CardContent className="p-8 relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <span className="text-sm font-bold text-zinc-400 uppercase tracking-widest">Total Balance</span>
                  <Badge variant="outline" className="rounded-xl border-zinc-200 dark:border-zinc-700 font-bold bg-zinc-50 dark:bg-zinc-800 flex gap-2 py-1 px-3">
                    <span className="text-xs">🇺🇸 USD</span>
                    <ChevronDown className="w-3 h-3 text-zinc-400" />
                  </Badge>
                </div>

                <div className="mb-2">
                  <h2 className="text-[44px] font-bold tracking-tight text-zinc-900 dark:text-white">$689,372.00</h2>
                </div>

                <div className="flex items-center gap-2 mb-8">
                  <Badge className="bg-emerald-50 text-emerald-600 hover:bg-emerald-50 border-none font-bold">
                    <ArrowUpRight className="w-3 h-3 mr-1" /> 5%
                  </Badge>
                  <span className="text-xs font-bold text-zinc-400 uppercase tracking-tighter">than last month</span>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <Button
                    disabled={!isAdmin && !isEditor}
                    className="bg-[#18181B] dark:bg-[#0CC8A8] hover:bg-[#27272A] text-white rounded-2xl h-14 font-bold shadow-lg shadow-zinc-200 dark:shadow-[#0CC8A8]/20 transition-all active:scale-95"
                  >
                    <ArrowUpRight className="w-4 h-4 mr-2" /> Transfer
                  </Button>
                  <Button
                    variant="outline"
                    disabled={!isAdmin && !isEditor}
                    className="rounded-2xl border-zinc-200 dark:border-zinc-700 h-14 font-bold bg-white dark:bg-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-all active:scale-95 text-zinc-900 dark:text-white"
                  >
                    <Zap className="w-4 h-4 mr-2 text-[#0CC8A8]" /> Request
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* WALLETS */}
            <div className="space-y-4">
              <div className="flex justify-between items-center px-1">
                <h3 className="font-bold text-zinc-500 uppercase text-[11px] tracking-[0.15em]">Wallets | Total 6 wallets</h3>
                <button className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"><MoreHorizontal className="w-4 h-4" /></button>
              </div>
              <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none">
                {[
                  { curr: "USD", flag: "🇺🇸", bal: "$22,678", limit: "$10k", color: "emerald", active: true },
                  { curr: "EUR", flag: "🇪🇺", bal: "€18,345", limit: "€8k", color: "blue", active: true },
                  { curr: "GBP", flag: "🇬🇧", bal: "£15,000", limit: "£7.5k", color: "orange", active: false }
                ].map((w, i) => (
                  <div key={i} className="min-w-[140px] flex-1 bg-white dark:bg-zinc-800/30 border border-zinc-100 dark:border-zinc-800 p-4 rounded-2xl hover:border-zinc-200 transition-colors shadow-sm">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-xs font-bold text-zinc-400">{w.flag} {w.curr}</span>
                      <MoreVertical className="w-3 h-3 text-zinc-300" />
                    </div>
                    <div className="text-lg font-bold mb-1">{w.bal}</div>
                    <div className="text-[10px] text-zinc-400 font-medium">Limit is {w.limit} a month</div>
                    <div className={cn("text-[10px] font-bold mt-3 inline-block", w.active ? "text-emerald-500" : "text-zinc-400")}>{w.active ? "Active" : "Inactive"}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* MONTHLY SPENDING LIMIT */}
            <div className="bg-white dark:bg-zinc-900 p-4 pt-0">
              <div className="flex justify-between items-center mb-4 px-1">
                <h3 className="font-bold text-[#1D1D1F] dark:text-white text-base">Monthly Spending Limit</h3>
              </div>
              <div className="space-y-4">
                <div className="h-4 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden relative border border-zinc-50 dark:border-zinc-800 shadow-inner">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "35%" }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="h-full bg-[#0CC8A8] rounded-full shadow-[0_0_10px_rgba(12,200,168,0.3)]"
                  />
                </div>
                <div className="flex justify-between text-xs font-bold text-zinc-400 tracking-tighter uppercase px-1">
                  <span><span className="text-zinc-900 dark:text-white font-black">$1,400.00</span> spent out of</span>
                  <span className="text-zinc-900 dark:text-white opacity-40">$5,500.00</span>
                </div>
              </div>
            </div>

            {/* MY CARDS */}
            <div className="space-y-4">
              <div className="flex justify-between items-center px-1">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-[#0CC8A8]" />
                  <h3 className="font-bold text-base">My Cards</h3>
                </div>
                <button
                  disabled={!isAdmin && !isEditor}
                  className="text-xs font-bold text-zinc-400 hover:text-[#0CC8A8] flex items-center transition-colors disabled:opacity-50"
                >
                  <Plus className="w-3 h-3 mr-1" /> Add new
                </button>
              </div>
              <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-none">
                {[
                  { num: "**** **** 8782", exp: "09/29", cvv: "611", type: "Mastercard", active: true, color: "bg-zinc-950 text-white" },
                  { num: "**** **** 4356", exp: "12/28", cvv: "442", type: "Visa", active: true, color: "bg-[#0CC8A8] text-white" }
                ].map((c, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -5 }}
                    className={cn("min-w-[240px] h-[154px] p-6 rounded-[28px] flex flex-col justify-between shadow-lg shadow-zinc-200 dark:shadow-none", c.color)}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2 px-2 py-1 bg-white/20 backdrop-blur-md rounded-lg">
                        <Activity className="w-3 h-3" />
                        <span className="text-[10px] font-bold text-white uppercase">Active</span>
                      </div>
                      {c.type === "Mastercard" ? (
                        <div className="flex -space-x-2">
                          <div className="w-6 h-6 rounded-full bg-red-500/80"></div>
                          <div className="w-6 h-6 rounded-full bg-orange-500/80"></div>
                        </div>
                      ) : (
                        <div className="italic font-bold text-xl opacity-90">VISA</div>
                      )}
                    </div>
                    <div>
                      <div className="text-lg font-medium tracking-[0.2em] mb-4">{c.num}</div>
                      <div className="flex justify-between">
                        <div className="flex flex-col">
                          <span className="text-[8px] opacity-60 uppercase font-bold tracking-widest mb-1 leading-none">EXP</span>
                          <span className="text-[11px] font-bold leading-none">{c.exp}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[8px] opacity-60 uppercase font-bold tracking-widest mb-1 leading-none">CVV</span>
                          <span className="text-[11px] font-bold leading-none">{c.cvv}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* CONTENT GRID */}
        <div className="flex-1 p-6 lg:p-8 space-y-8 layout-scroll">

          {/* TOP HEADER MENU */}
          <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10">
            <div className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-800/50 p-1.5 rounded-full overflow-x-auto scrollbar-none border border-zinc-200/50 dark:border-zinc-800/50 shadow-inner">
              {["Overview", "Activity", "Manage", "Program", "Account", "Reports"].map((tab, i) => (
                <button key={i} className={cn(
                  "px-6 py-2.5 rounded-full text-sm font-bold transition-all whitespace-nowrap active:scale-95",
                  i === 0 ? "bg-[#18181B] dark:bg-zinc-900 text-white shadow-xl shadow-zinc-300 dark:shadow-none" : "text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
                )}>
                  {tab}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-3 bg-white dark:bg-zinc-900 p-2 px-4 rounded-full border border-zinc-200/50 dark:border-zinc-800/50 shadow-sm focus-within:ring-2 focus-within:ring-[#0CC8A8]/30 transition-all">
                <Search className="w-5 h-5 text-zinc-400" />
                <input placeholder="Search everywhere..." className="bg-transparent border-none outline-none text-sm font-medium w-40 md:w-60" />
              </div>
              <button className="relative w-11 h-11 flex items-center justify-center rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 transition-colors shadow-sm active:scale-90">
                <Bell className="w-5 h-5 text-zinc-500" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
              </button>
              <ProfileSwitcher />
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            {/* KPI GRID (Draggable Group) */}
            <div className="lg:col-span-12 xl:col-span-8 flex flex-col gap-6">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Layers className="w-5 h-5 text-zinc-400" />
                  <h3 className="font-bold text-base text-zinc-500 uppercase tracking-widest">Dashboard Insights</h3>
                </div>
                <div className="text-[10px] bg-zinc-100 dark:bg-zinc-800 px-3 py-1 rounded-full text-zinc-400 font-bold uppercase tracking-widest">Drag to reorder</div>
              </div>

              <Reorder.Group axis="x" values={kpiIds} onReorder={setKpiIds} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
                {kpis.map((kpi) => {
                  const Icon = kpi.icon
                  return (
                    <Reorder.Item key={kpi.id} value={kpi.id} className="cursor-grab active:cursor-grabbing">
                      <Card className={cn(
                        "rounded-[32px] border-none shadow-xl shadow-zinc-200/40 dark:shadow-none h-[180px] p-6 flex flex-col justify-between transition-transform duration-300",
                        kpi.color, kpi.text
                      )}>
                        <div className="flex justify-between items-start">
                          <span className={cn("text-xs font-bold uppercase tracking-widest opacity-60", kpi.text)}>{kpi.title}</span>
                          <div className={cn("w-10 h-10 rounded-full flex items-center justify-center shadow-sm", kpi.id === "e" ? "bg-white/20" : "bg-zinc-50 dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700")}>
                            <Icon className={cn("w-5 h-5", kpi.id === "e" ? "text-white" : "text-[#0CC8A8]")} />
                          </div>
                        </div>
                        <div>
                          <div className="text-3xl font-bold tracking-tight mb-2">{kpi.val}</div>
                          <div className="flex items-center gap-2">
                            <Badge className={cn(
                              "font-bold py-0.5 rounded-lg",
                              kpi.trend.startsWith("+") ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-500"
                            )}>
                              {kpi.trend.startsWith("+") ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
                              {kpi.trend.replace("+", "").replace("-", "")}
                            </Badge>
                            <span className="text-[10px] font-bold opacity-40 uppercase">This month</span>
                          </div>
                        </div>
                      </Card>
                    </Reorder.Item>
                  )
                })}
              </Reorder.Group>
            </div>

            {/* CHART AREA */}
            <div className="lg:col-span-12 xl:col-span-4">
              <Card className="rounded-[40px] border-none shadow-2xl shadow-zinc-200/50 dark:shadow-none bg-white dark:bg-zinc-900 p-8 h-full min-h-[400px]">
                <div className="flex flex-col gap-6 h-full">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold tracking-tight mb-1 flex items-center gap-2">
                        Total Income
                        <TrendingUp className="w-5 h-5 text-emerald-500" />
                      </h3>
                      <p className="text-xs text-zinc-400 font-bold uppercase tracking-tighter">View your income in certain period</p>
                    </div>
                    <div className="flex items-center gap-4 bg-zinc-50 dark:bg-zinc-800 p-2 rounded-xl border border-zinc-100 dark:border-zinc-800 shadow-inner">
                      <div className="flex items-center gap-2 text-[10px] font-bold uppercase text-zinc-500 tracking-tighter">
                        <div className="w-3 h-3 rounded-sm bg-[#0CC8A8]"></div> Profit
                      </div>
                      <div className="flex items-center gap-2 text-[10px] font-bold uppercase text-zinc-500 tracking-tighter">
                        <div className="w-3 h-3 rounded-sm bg-[#18181B] dark:bg-white"></div> Loss
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 w-full mt-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={state.transactions.slice(0, 8).map((t, i) => ({
                        month: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"][i],
                        profit: t.type === 'income' ? t.price / 100 : Math.random() * 500,
                        loss: t.type === 'expense' ? t.price / 1000 : Math.random() * 200
                      }))}>
                        <CartesianGrid strokeDasharray="6 6" vertical={false} stroke="#F1F1F4" />
                        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 700, fill: "#A1A1AA" }} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 700, fill: "#A1A1AA" }} />
                        <ChartTooltip cursor={{ fill: 'transparent' }} content={<ChartTooltipContent />} />
                        <Bar dataKey="loss" stackId="a" fill="#18181B" radius={[0, 0, 0, 0]} barSize={34} />
                        {/* Using a custom shape or standard bar with Teal as per rules */}
                        <Bar dataKey="profit" stackId="a" fill="#0CC8A8" radius={[12, 12, 0, 0]} barSize={34} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </Card>
            </div>

            {/* TABLE AREA */}
            <div className="lg:col-span-12 xl:col-span-12">
              <Card className="rounded-[40px] border-none shadow-2xl shadow-zinc-200/40 dark:shadow-none bg-white dark:bg-zinc-900 overflow-hidden">
                <div className="p-8 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-zinc-100 dark:border-zinc-800">
                  <div>
                    <h3 className="text-2xl font-bold tracking-tight mb-1">Recent Activities</h3>
                    <p className="text-xs text-zinc-400 font-bold uppercase tracking-widest">Manage your transactions and history</p>
                  </div>
                  <div className="flex items-center flex-wrap gap-3">
                    <div className="relative">
                      <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                      <input
                        placeholder="Search activities..."
                        value={state.filters.search}
                        onChange={(e) => setFilter({ search: e.target.value })}
                        className="bg-zinc-50 dark:bg-zinc-800 border-none rounded-2xl p-3 pl-10 text-sm font-medium focus:ring-2 focus:ring-[#0CC8A8]/30 transition-all w-full sm:w-60"
                      />
                    </div>
                    <div className="flex bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-1 gap-1">
                      {["all", "income", "expense"].map((t) => (
                        <button
                          key={t}
                          onClick={() => setFilter({ type: t })}
                          className={cn(
                            "px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all",
                            state.filters.type === t ? "bg-zinc-900 dark:bg-zinc-700 text-white" : "text-zinc-500 hover:bg-zinc-50"
                          )}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={() => handleExport('json')}
                      className="flex items-center gap-2 p-3 px-4 rounded-2xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 text-sm font-bold shadow-sm hover:bg-zinc-50 transition-colors active:scale-95"
                    >
                      <Download className="w-4 h-4 text-zinc-500" /> Export
                    </button>
                    {(isAdmin || isEditor) && (
                      <button className="flex items-center gap-2 p-3 px-6 rounded-2xl bg-[#18181B] dark:bg-[#0CC8A8] text-white text-sm font-bold shadow-xl shadow-zinc-200 transition-all hover:scale-105 active:scale-95">
                        <Plus className="w-5 h-5" /> Add new activity
                      </button>
                    )}
                  </div>
                </div>

                <div className="overflow-x-auto scrollbar-none">
                  <Table>
                    <TableHeader className="bg-zinc-50 dark:bg-transparent">
                      <TableRow className="border-b border-zinc-100 dark:border-zinc-800">
                        <TableHead className="py-6 px-8 text-[11px] font-black uppercase text-zinc-400 tracking-[0.2em] w-12"><input type="checkbox" className="w-4 h-4 accent-[#0CC8A8]" /></TableHead>
                        <TableHead className="py-6 text-[11px] font-black uppercase text-zinc-400 tracking-[0.2em]">Order ID</TableHead>
                        <TableHead className="py-6 text-[11px] font-black uppercase text-zinc-400 tracking-[0.2em]">Activity</TableHead>
                        <TableHead className="py-6 text-[11px] font-black uppercase text-zinc-400 tracking-[0.2em]">Price</TableHead>
                        <TableHead className="py-6 text-[11px] font-black uppercase text-zinc-400 tracking-[0.2em]">Status</TableHead>
                        <TableHead className="py-6 text-[11px] font-black uppercase text-zinc-400 tracking-[0.2em]">Date</TableHead>
                        <TableHead className="py-6 pr-8 text-right"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {transactions.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={7} className="h-64 text-center">
                            <div className="flex flex-col items-center gap-3 opacity-30">
                              <Activity className="w-12 h-12" />
                              <span className="font-bold uppercase tracking-widest text-xs">No entries found for your search</span>
                            </div>
                          </TableCell>
                        </TableRow>
                      ) : (
                        transactions.map((tx, i) => (
                          <motion.tr
                            key={tx.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="group hover:bg-zinc-50 dark:hover:bg-zinc-800/50 border-b border-zinc-100/50 dark:border-zinc-800/50 transition-colors cursor-pointer"
                          >
                            <TableCell className="py-5 px-8 select-none"><input type="checkbox" className="w-4 h-4 accent-[#0CC8A8]" /></TableCell>
                            <TableCell className="py-5 text-sm font-bold text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors capitalize">{tx.id.replace("_", "-")}</TableCell>
                            <TableCell className="py-5">
                              <div className="flex items-center gap-3">
                                <div className={cn(
                                  "w-11 h-11 rounded-2xl flex items-center justify-center text-xl shadow-sm border border-zinc-100 dark:border-zinc-800",
                                  tx.type === 'income' ? 'bg-emerald-50 dark:bg-emerald-500/10' : 'bg-zinc-100 dark:bg-zinc-800/50'
                                )}>
                                  {tx.category === 'Technology' ? <Laptop className="w-5 h-5 text-blue-500" /> :
                                    tx.category === 'Travel' ? <Plane className="w-5 h-5 text-indigo-500" /> :
                                      tx.category === 'Food' ? <ShoppingCart className="w-5 h-5 text-orange-500" /> :
                                        <Zap className="w-5 h-5 text-[#0CC8A8]" />}
                                </div>
                                <div>
                                  <div className="text-sm font-bold text-zinc-900 dark:text-white mb-0.5">{tx.activity}</div>
                                  <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{tx.category}</div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="py-5 text-sm font-bold tracking-tight">${tx.price.toLocaleString()}</TableCell>
                            <TableCell className="py-5 text-[10px] font-bold">
                              <div className={cn(
                                "inline-flex items-center gap-2 px-3 py-1.5 rounded-full border shadow-sm",
                                tx.status === 'Completed' ? 'bg-emerald-50/50 text-emerald-600 border-emerald-100 dark:bg-emerald-500/10 dark:border-emerald-500/20' :
                                  tx.status === 'Pending' ? 'bg-red-50/50 text-red-500 border-red-100 dark:bg-red-500/10 dark:border-red-500/20' :
                                    'bg-amber-50/50 text-amber-600 border-amber-100 dark:bg-amber-500/10 dark:border-amber-500/20'
                              )}>
                                <span className={cn("w-1.5 h-1.5 rounded-full", tx.status === 'Completed' ? "bg-emerald-500" : tx.status === 'Pending' ? "bg-red-500" : "bg-amber-500")}></span>
                                {tx.status}
                              </div>
                            </TableCell>
                            <TableCell className="py-5 text-sm font-bold text-zinc-400">{tx.date.split(" ")[0]} {tx.date.split(" ")[1]}</TableCell>
                            <TableCell className="py-5 pr-8 text-right">
                              {(isAdmin || isEditor) && (
                                <div className="flex items-center justify-end gap-2">
                                  <button
                                    onClick={(e) => { e.stopPropagation(); /* handle edit */ }}
                                    className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-500/10 text-zinc-400 hover:text-emerald-500 transition-colors"
                                  >
                                    <Edit className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      if (confirm("Delete this transaction?")) {
                                        dispatch({ type: "DELETE_TRANSACTION", payload: tx.id })
                                      }
                                    }}
                                    disabled={isEditor && tx.type === 'income'} // Example: Editor can't delete income
                                    className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10 text-zinc-400 hover:text-red-500 transition-colors disabled:opacity-30"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              )}
                            </TableCell>
                          </motion.tr>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </Card>
            </div>

          </div>

          {/* INSIGHTS FOOTER SECTION */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 pb-12">
            <Card className="rounded-[40px] border-none shadow-xl bg-gradient-to-br from-[#18181B] to-[#27272A] dark:from-zinc-900 dark:to-zinc-950 p-8 text-white group hover:shadow-2xl transition-all cursor-pointer">
              <div className="flex flex-col h-full justify-between gap-12">
                <div className="flex justify-between items-start">
                  <div className="w-14 h-14 rounded-3xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10 group-hover:bg-[#0CC8A8] transition-colors">
                    <Zap className="w-8 h-8" />
                  </div>
                  <ArrowRight className="w-6 h-6 opacity-40 group-hover:translate-x-2 transition-transform" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">Insight Score</h4>
                  <div className="text-4xl font-extrabold tracking-tighter mb-4">A- Grade <span className="text-[#0CC8A8]">+12.4%</span></div>
                  <p className="text-xs text-zinc-500 font-medium leading-relaxed">Your financial health is in excellent shape this month compared to the last quarter.</p>
                </div>
              </div>
            </Card>

            <Card className="rounded-[40px] border-none shadow-xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 p-8 group hover:shadow-2xl transition-all cursor-pointer">
              <div className="flex flex-col h-full justify-between gap-12">
                <div className="flex justify-between items-start">
                  <div className="w-14 h-14 rounded-3xl bg-[#0CC8A8]/10 flex items-center justify-center border border-[#0CC8A8]/10 group-hover:bg-[#0CC8A8] group-hover:text-white transition-all text-[#0CC8A8]">
                    <Gift className="w-8 h-8" />
                  </div>
                  <ArrowRight className="w-6 h-6 opacity-40 group-hover:translate-x-2 transition-transform" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">Rewards Active</h4>
                  <div className="text-4xl font-extrabold tracking-tighter mb-4">3,450 <span className="text-zinc-300 dark:text-zinc-600">Points</span></div>
                  <p className="text-xs text-zinc-400 font-medium leading-relaxed">You have accumulated enough points to redeem for a <span className="text-zinc-900 dark:text-white font-bold">Premium Subscription</span>.</p>
                </div>
              </div>
            </Card>

            <Card className="rounded-[40px] border-none shadow-xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 p-8 group hover:shadow-2xl transition-all cursor-pointer">
              <div className="flex flex-col h-full justify-between gap-12">
                <div className="flex justify-between items-start">
                  <div className="w-14 h-14 rounded-3xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center border border-zinc-200 dark:border-zinc-800 group-hover:bg-[#18181B] dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-black transition-all">
                    <Shield className="w-8 h-8" />
                  </div>
                  <ArrowRight className="w-6 h-6 opacity-40 group-hover:translate-x-2 transition-transform" />
                </div>

              </div>
            </Card>
          </section>

        </div>
      </main>
    </div>
  )
}
