"use client"

import { Layers, Sparkles, AlertCircle, Settings, Shield, Info, Palette, Bell, Globe } from "lucide-react"
import { useApp, useRole } from "@/context/AppContext"
import { PROFILES } from "@/lib/constants"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"

export default function ManagePage() {
  const { state } = useApp()
  const { isAdmin } = useRole()
  const currentUser = PROFILES[state.activeProfileIndex]

  if (!isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-6 text-neutral-400">
        <div className="size-20 rounded-[2rem] bg-neutral-50 dark:bg-neutral-800 flex items-center justify-center opacity-30 border-2 border-dashed border-neutral-200 dark:border-neutral-700">
          <Shield className="size-10 text-rose-500" />
        </div>
        <div className="space-y-1 text-center">
          <span className="text-xl font-black uppercase tracking-[0.3em] block text-neutral-900 dark:text-white">Access Restricted</span>
          <span className="text-[11px] font-bold opacity-60 uppercase tracking-widest leading-relaxed">
            This module requires administrative privileges. <br />
            Please switch to an Admin profile to continue.
          </span>
        </div>
        <Button variant="outline" onClick={() => window.history.back()} className="rounded-2xl font-black text-[10px] uppercase tracking-widest px-8 border-neutral-100 dark:border-neutral-800">
          Return to Previous
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-0 animate-in fade-in duration-500">
      <div className="pb-0">
        <div className="flex flex-col gap-2 mb-8">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#0CC8A8]/10 text-[#0CC8A8] text-[10px] font-black uppercase tracking-widest w-fit mb-2">
            <Layers className="size-3" />
            Infrastructure Management
          </div>
          <h1 className="text-3xl md:text-[40px] font-bold text-text-primary tracking-tight flex items-center gap-3">
            System Administration
            <Sparkles className="w-8 h-8 text-[#0CC8A8] animate-pulse" />
          </h1>
          <p className="text-text-secondary text-[15px] max-w-[600px] mb-4">
            Configure system architectures, manage global environments, and monitor administrative logs.
          </p>
        </div>
      </div>

      <div className="pt-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="rounded-[2rem] p-6 shadow-sm border border-neutral-100 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden relative group opacity-60">
             <div className="absolute top-0 right-0 p-4">
                <Info className="size-5 text-neutral-300" />
            </div>
             <CardHeader className="p-0 mb-6">
                <div className="size-12 rounded-2xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
                    <Settings className="size-6 text-neutral-500" />
                </div>
                <CardTitle className="text-lg font-black uppercase tracking-tight">Environment Assets</CardTitle>
                <p className="text-xs text-neutral-400 font-bold uppercase tracking-widest">Configure global variables</p>
            </CardHeader>
            <div className="space-y-4">
                <div className="h-2 w-full bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                    <div className="h-full bg-[#0CC8A8] w-2/3" />
                </div>
                <div className="text-[10px] font-black text-neutral-400 uppercase tracking-widest flex justify-between">
                    <span>Usage 65%</span>
                    <span>Segment 12</span>
                </div>
            </div>
        </Card>

        <Card className="rounded-[2rem] p-6 shadow-sm border border-neutral-100 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden relative group opacity-60">
             <CardHeader className="p-0 mb-6">
                 <div className="size-12 rounded-2xl bg-[#0CC8A8]/10 flex items-center justify-center mb-4">
                    <Shield className="size-6 text-[#0CC8A8]" />
                </div>
                <CardTitle className="text-lg font-black uppercase tracking-tight">Security Protocols</CardTitle>
                <p className="text-xs text-neutral-400 font-bold uppercase tracking-widest">Active firewalls and encryption</p>
            </CardHeader>
            <div className="flex items-center gap-3 p-3 bg-emerald-500/5 rounded-2xl border border-emerald-500/10">
                <div className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">All systems active</span>
            </div>
        </Card>

        <Card className="rounded-[2rem] p-6 shadow-sm border border-neutral-100 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden relative group opacity-60">
             <CardHeader className="p-0 mb-6">
                 <div className="size-12 rounded-2xl bg-rose-500/10 flex items-center justify-center mb-4">
                    <AlertCircle className="size-6 text-rose-500" />
                </div>
                <CardTitle className="text-lg font-black uppercase tracking-tight">Audit Notifications</CardTitle>
                <p className="text-xs text-neutral-400 font-bold uppercase tracking-widest">Pending security reviews</p>
            </CardHeader>
             <div className="text-3xl font-black text-neutral-900 dark:text-white uppercase tracking-tighter">
                03
            </div>
        </Card>
      </div>
    </div>
  )
}
