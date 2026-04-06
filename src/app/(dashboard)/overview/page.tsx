"use client"

import DashboardPageView from "@/components/watermelon/erp-dashboard/DashboardPageView"
import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"
import { useApp } from "@/context/AppContext"
import { PROFILES } from "@/lib/constants"

export default function OverviewPage() {
  const { state } = useApp()
  const currentUser = PROFILES[state.activeProfileIndex]

  const hour = new Date().getHours()
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening"

  return (
    <div className="flex flex-col gap-0">
      <div className="pb-0">
        <div className="flex flex-col gap-2 mb-6">
          <h1 className="text-3xl md:text-[40px] font-bold text-text-primary tracking-tight flex items-center gap-3">
            {greeting}, {currentUser.name.split(" ")[0]}
            <Sparkles className="w-8 h-8 text-[#0CC8A8] animate-pulse" />
          </h1>
          <p className="text-text-secondary text-[15px] max-w-[600px]">
            Welcome to your new ERP-powered dashboard. Your finances are tracked in real-time.
          </p>
        </div>
      </div>
      
      <DashboardPageView />
    </div>
  )
}
