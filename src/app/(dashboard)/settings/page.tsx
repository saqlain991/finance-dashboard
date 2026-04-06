"use client"

import { Settings, Sparkles, User, Bell, Shield, Globe, Palette, LogOut, ChevronRight, Moon, Sun, Smartphone } from "lucide-react"
import { useApp } from "@/context/AppContext"
import { PROFILES } from "@/lib/constants"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/shared/ThemeToggle"

export default function SettingsPage() {
  const { state } = useApp()
  const currentUser = PROFILES[state.activeProfileIndex]

  return (
    <div className="flex flex-col gap-0 animate-in fade-in duration-500">
      <div className="pb-0">
        <div className="flex flex-col gap-2 mb-8">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#0CC8A8]/10 text-[#0CC8A8] text-[10px] font-black uppercase tracking-widest w-fit mb-2">
            <Settings className="size-3" />
            Global Configurations
          </div>
          <h1 className="text-3xl md:text-[40px] font-bold text-text-primary tracking-tight flex items-center gap-3">
            System Preferences
            <Sparkles className="w-8 h-8 text-[#0CC8A8] animate-pulse" />
          </h1>
          <p className="text-text-secondary text-[15px] max-w-[600px] mb-4">
            Manage your environment's look and feel, security protocols, and notification segments.
          </p>
        </div>
      </div>

      <div className="pb-12 max-w-full space-y-6">
        <Card className="rounded-[2rem] bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 p-8 shadow-sm">
          <h3 className="text-lg font-black uppercase tracking-tight text-neutral-900 dark:text-white mb-6">Visual Environment</h3>
          <div className="flex items-center justify-between p-4 bg-neutral-50 dark:bg-neutral-800/50 rounded-2xl border border-neutral-100 dark:border-neutral-800">
            <div className="flex items-center gap-4">
              <div className="size-10 rounded-xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-500">
                {state.theme === 'dark' ? <Moon className="size-5" /> : <Sun className="size-5" />}
              </div>
              <div>
                <div className="text-xs font-black uppercase tracking-widest leading-none mb-1">Theme Preferences</div>
                <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Toggle dark and light segments</div>
              </div>
            </div>
            <ThemeToggle />
          </div>
        </Card>

        <Card className="rounded-[2rem] bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 p-8 shadow-sm">
          <h3 className="text-lg font-black uppercase tracking-tight text-neutral-900 dark:text-white mb-6">Security & Identity</h3>
          <div className="space-y-3">
            {[
              { label: "Two-Factor Authentication", icon: Shield, status: "Active" },
              { label: "Device Management", icon: Smartphone, status: "03 Nodes" },
              { label: "Email Notifications", icon: Bell, status: "Instant" }
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-4 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 rounded-2xl transition-all cursor-pointer group border border-transparent hover:border-neutral-100 dark:hover:border-neutral-800">
                <div className="flex items-center gap-4">
                  <div className="size-10 rounded-xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-500 group-hover:text-[#0CC8A8] transition-colors">
                    <item.icon className="size-5" />
                  </div>
                  <div className="text-xs font-black uppercase tracking-widest leading-none">{item.label}</div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#0CC8A8] opacity-70">{item.status}</span>
                  <ChevronRight className="size-4 text-neutral-300" />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Button variant="ghost" className="w-full h-14 rounded-[1.5rem] text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 font-black text-xs uppercase tracking-widest gap-2">
          <LogOut className="size-4" />
          Sign Out of All Sessions
        </Button>
      </div>
    </div>
  )
}
