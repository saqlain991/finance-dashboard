"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Home, Search, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-screen w-full bg-surface-page dark:bg-[#0F0F10] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background ambient glow effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[#0CC8A8]/5 blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] rounded-full bg-blue-500/5 blur-[100px] pointer-events-none z-0"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-[540px] w-full text-center space-y-8 relative z-10"
      >
        <div className="flex flex-col items-center gap-6">
          <div className="size-24 rounded-[2.5rem] bg-white dark:bg-neutral-900 shadow-2xl flex items-center justify-center border border-neutral-100 dark:border-neutral-800 rotate-6 hover:rotate-0 transition-transform duration-500">
            <AlertTriangle className="size-12 text-rose-500" />
          </div>
          
          <div className="space-y-2">
            <h1 className="text-7xl md:text-9xl font-black text-neutral-900 dark:text-white tracking-tighter">
              404<span className="text-[#0CC8A8]">.</span>
            </h1>
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-neutral-800 dark:text-neutral-100">
              Environment Not Found
            </h2>
          </div>
        </div>

        <p className="text-neutral-500 dark:text-neutral-400 font-medium leading-relaxed">
          The segment you are looking for has been moved, deleted, or never existed in the current ERP architecture. Please verify the URL or return to the main dashboard.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link href="/overview" className="w-full sm:w-auto">
            <Button className="w-full bg-[#0CC8A8] hover:bg-[#0AA88D] text-white h-14 px-8 rounded-2xl font-black text-[13px] uppercase tracking-widest gap-3 shadow-lg shadow-[#0CC8A8]/20 transition-all active:scale-95">
              <Home className="size-5" />
              Go Back Home
            </Button>
          </Link>
          <Button 
            variant="outline" 
            onClick={() => window.history.back()}
            className="w-full sm:w-auto h-14 px-8 rounded-2xl font-black text-[13px] uppercase tracking-widest gap-3 border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-all"
          >
            <ArrowLeft className="size-5" />
            Previous Page
          </Button>
        </div>
      </motion.div>

      {/* Decorative elements */}
      <div className="absolute top-1/2 left-10 -translate-y-1/2 hidden lg:block opacity-20">
        <div className="flex flex-col gap-8">
            {[1, 2, 3].map(i => (
                <div key={i} className="size-px w-20 bg-gradient-to-r from-transparent via-neutral-400 to-transparent"></div>
            ))}
        </div>
      </div>
    </div>
  )
}
