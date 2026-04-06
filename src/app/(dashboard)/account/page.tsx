"use client"

import { Users, Sparkles, User, BadgeCheck, Shield, Mail, Globe, MapPin, Edit3 } from "lucide-react"
import { useApp } from "@/context/AppContext"
import { PROFILES } from "@/lib/constants"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function AccountPage() {
  const { state } = useApp()
  const currentUser = PROFILES[state.activeProfileIndex]

  return (
    <div className="flex flex-col gap-0 animate-in fade-in duration-500">
      <div className="pb-0">
        <div className="flex flex-col gap-2 mb-8">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#0CC8A8]/10 text-[#0CC8A8] text-[10px] font-black uppercase tracking-widest w-fit mb-2">
            <Users className="size-3" />
            User Identity
          </div>
          <h1 className="text-3xl md:text-[40px] font-bold text-text-primary tracking-tight flex items-center gap-3">
            Account Management
            <Sparkles className="w-8 h-8 text-[#0CC8A8] animate-pulse" />
          </h1>
          <p className="text-text-secondary text-[15px] max-w-[600px] mb-4">
            Manage your personal identity, review access logs, and update your programmatic credentials.
          </p>
        </div>
      </div>

      <div className="pb-12 max-w-5xl">
        <Card className="rounded-[2.5rem] bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 p-8 shadow-sm overflow-hidden relative">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-8 border-b border-neutral-100 dark:border-neutral-800 pb-12 mb-8 mt-4">
                <Avatar className="size-32 rounded-[2.5rem] shadow-2xl border-4 border-white dark:border-neutral-800 ring-1 ring-neutral-100 dark:ring-neutral-700">
                    <AvatarImage src={currentUser.avatar || ""} />
                    <AvatarFallback className="bg-[#0CC8A8] text-white text-3xl font-black">{currentUser.initials}</AvatarFallback>
                </Avatar>
                <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-3">
                        <h2 className="text-3xl font-black text-neutral-900 dark:text-white uppercase tracking-tighter">{currentUser.name}</h2>
                        <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 text-emerald-500 rounded-xl text-[10px] font-black uppercase tracking-widest border border-emerald-500/10">
                            <BadgeCheck className="size-3" />
                            Verified Identity
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-6 text-sm text-neutral-500 font-medium">
                        <div className="flex items-center gap-2">
                            <Mail className="size-4" />
                            {currentUser.email}
                        </div>
                        <div className="flex items-center gap-2">
                            <Globe className="size-4" />
                            Finexy Corporate
                        </div>
                         <div className="flex items-center gap-2 capitalize">
                            <Shield className="size-4" />
                            {currentUser.role} Role
                        </div>
                    </div>
                    <div className="pt-2">
                        <Button className="h-11 px-6 rounded-2xl bg-[#0CC8A8] hover:bg-[#0AA88D] text-white font-black text-[10px] uppercase tracking-widest transition-all">
                            Edit Experience Profile
                        </Button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                    { label: "Active Nodes", value: "24", icon: Globe },
                    { label: "Security Level", value: "Level 4", icon: Shield },
                    { label: "Uptime Rating", value: "99.9%", icon: Sparkles }
                ].map((stat, i) => (
                    <div key={i} className="p-6 rounded-[2rem] bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-100 dark:border-neutral-800">
                        <div className="flex items-center gap-2 text-neutral-400 mb-2">
                            <stat.icon className="size-3.5" />
                            <span className="text-[10px] font-black uppercase tracking-widest leading-none">{stat.label}</span>
                        </div>
                        <div className="text-2xl font-black text-neutral-900 dark:text-white">{stat.value}</div>
                    </div>
                ))}
            </div>
        </Card>
      </div>
    </div>
  )
}
