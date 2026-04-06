"use client"

import { FileText, Sparkles, AlertCircle, Laptop, Shield, MessageSquare, Info, Link, FileSearch } from "lucide-react"
import { useApp } from "@/context/AppContext"
import { PROFILES } from "@/lib/constants"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function ProgramPage() {
  const { state } = useApp()
  const currentUser = PROFILES[state.activeProfileIndex]

  return (
    <div className="flex flex-col gap-0 animate-in fade-in duration-500">
      <div className="pb-0">
        <div className="flex flex-col gap-2 mb-8">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#0CC8A8]/10 text-[#0CC8A8] text-[10px] font-black uppercase tracking-widest w-fit mb-2">
            <FileText className="size-3" />
            Infrastructure Ledger
          </div>
          <h1 className="text-3xl md:text-[40px] font-bold text-text-primary tracking-tight flex items-center gap-3">
            Program Architecture
            <Sparkles className="w-8 h-8 text-[#0CC8A8] animate-pulse" />
          </h1>
          <p className="text-text-secondary text-[15px] max-w-[600px] mb-4">
            Manage your programmatic segments, review system logs, and monitor execution parameters.
          </p>
        </div>
      </div>

       <div className="pt-0 flex flex-col gap-8">
        <Card className="rounded-[2.5rem] bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 p-12 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <FileSearch className="size-48" />
            </div>
            <div className="max-w-xl space-y-6 relative z-10">
                <div className="size-16 rounded-3xl bg-[#0CC8A8] flex items-center justify-center shadow-xl shadow-[#0CC8A8]/30 mb-8">
                    <Laptop className="size-8 text-white" />
                </div>
                <h3 className="text-3xl font-black uppercase tracking-tighter text-neutral-900 dark:text-white">Segment Module Locked</h3>
                <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400 leading-relaxed mb-8">
                    The programmatic architecture module is currently undergoing system maintenance to optimize high-density data processing. Please check back shortly for full ledger access.
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                    <Button className="bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 h-12 px-6 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all active:scale-95">
                        Download Manifest
                    </Button>
                    <Button variant="outline" className="h-12 px-6 rounded-2xl font-black text-[10px] uppercase tracking-widest border-neutral-100 dark:border-neutral-800 transition-all active:scale-95">
                        System Logs
                    </Button>
                </div>
            </div>
        </Card>
      </div>
    </div>
  )
}
