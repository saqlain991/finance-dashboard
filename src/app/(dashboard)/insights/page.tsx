"use client"

import { Calendar, Sparkles, TrendingUp, BarChart, PieChart, Download, Filter, FileText, Activity } from "lucide-react"
import { useApp } from "@/context/AppContext"
import { PROFILES } from "@/lib/constants"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function InsightsPage() {
  const { state } = useApp()
  const currentUser = PROFILES[state.activeProfileIndex]

  return (
    <div className="flex flex-col gap-0 animate-in fade-in duration-500">
      <div className="pb-0">
        <div className="flex flex-col gap-2 mb-8">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#0CC8A8]/10 text-[#0CC8A8] text-[10px] font-black uppercase tracking-widest w-fit mb-2">
            <Calendar className="size-3" />
            Financial Intelligence
          </div>
          <h1 className="text-3xl md:text-[40px] font-bold text-text-primary tracking-tight flex items-center gap-3">
            Financial Insights
            <Sparkles className="w-8 h-8 text-[#0CC8A8] animate-pulse" />
          </h1>
          <p className="text-text-secondary text-[15px] max-w-[600px] mb-4">
            Analyze your programmatic performance, review yearly trends, and download detailed financial reports.
          </p>
        </div>
      </div>

      <div className="pb-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="rounded-[2.5rem] bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 p-8 shadow-sm group">
            <div className="size-14 rounded-2xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mb-6 transition-transform group-hover:scale-110">
                <BarChart className="size-6 text-[#0CC8A8]" />
            </div>
            <h3 className="text-xl font-black uppercase tracking-tight text-neutral-900 dark:text-white mb-2">Annual Performance Report</h3>
            <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-6 leading-relaxed">
                Complete data segment for the 2026 fiscal year including all verified transactions.
            </p>
            <Button className="w-full h-12 rounded-2xl bg-[#0CC8A8] hover:bg-[#0AA88D] text-white font-black text-[10px] uppercase tracking-widest gap-2">
                <Download className="size-4" />
                Download PDF Report
            </Button>
        </Card>

        <Card className="rounded-[2.5rem] bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 p-8 shadow-sm group">
            <div className="size-14 rounded-2xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mb-6 transition-transform group-hover:scale-110">
                <FileText className="size-6 text-neutral-500" />
            </div>
            <h3 className="text-xl font-black uppercase tracking-tight text-neutral-900 dark:text-white mb-2">Infrastructure Variance</h3>
            <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-6 leading-relaxed">
                Analysis of programmatic spending and resource allocation across segments.
            </p>
            <Button variant="outline" className="w-full h-12 rounded-2xl border-neutral-100 dark:border-neutral-800 font-black text-[10px] uppercase tracking-widest gap-2 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-all">
                <TrendingUp className="size-4" />
                View Intelligence Dashboard
            </Button>
        </Card>
      </div>
    </div>
  )
}
