"use client"

import { formatAmount } from "@/lib/utils"
import { Wallet as WalletIcon, MoreVertical, Plus, CreditCard, ChevronDown } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

import { useApp } from "@/context/AppContext"
import { motion } from "framer-motion"

export function WalletsCard() {
  const { state, dispatch } = useApp()
  const { wallets } = state

  const handleAction = (id: string, type: "add" | "subtract") => {
    dispatch({ 
      type: "UPDATE_WALLET_BALANCE", 
      payload: { id, amount: 500, type } 
    })
  }

  return (
    <div className="bg-surface-card dark:bg-[#1A1A1E]/60 backdrop-blur-xl rounded-2xl p-6 shadow-sm border border-white/20 dark:border-white/5 h-full flex flex-col">
      <div className="flex justify-between flex-row items-center mb-5">
        <h3 className="font-bold text-text-primary text-lg">Wallets <span className="text-text-secondary font-normal text-sm ml-1">| {wallets.length} active</span></h3>
      </div>

      <div className="flex items-stretch gap-4 overflow-x-auto pb-4 -mx-1 px-1 scroll-smooth no-scrollbar flex-1">
        {wallets.map((wallet) => (
          <div key={wallet.id} className="min-w-[240px] flex-1 bg-white/40 dark:bg-white/5 border border-white/40 dark:border-white/10 rounded-2xl p-5 flex flex-col hover:border-brand-orange/40 transition-all duration-300 group relative">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white dark:bg-white/10 flex items-center justify-center text-xl shadow-sm">
                  {wallet.flag}
                </div>
                <div>
                  <span className="font-bold text-sm tracking-wide block leading-none">{wallet.currency}</span>
                  <span className="text-[10px] text-text-secondary font-bold uppercase tracking-wider">{wallet.status}</span>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger className="text-gray-400 hover:text-brand-orange hover:bg-brand-orange/10 p-1.5 rounded-lg transition-colors cursor-pointer outline-none">
                  <MoreVertical className="w-4 h-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="rounded-xl p-1.5">
                  <DropdownMenuItem className="rounded-lg cursor-pointer py-2 px-3 text-sm font-medium">View Details</DropdownMenuItem>
                  <DropdownMenuItem className="rounded-lg cursor-pointer py-2 px-3 text-sm font-medium">Wallet Settings</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="mt-auto">
              <div className="text-[22px] font-black mb-1 text-text-primary tracking-tight">
                {new Intl.NumberFormat('en-US', { style: 'currency', currency: wallet.currency }).format(wallet.amount)}
              </div>
              <div className="text-[11px] text-text-secondary mb-5 flex items-center gap-1.5 font-medium">
                <div className="w-1 h-1 rounded-full bg-brand-orange" />
                Limit: {formatAmount(wallet.limitPerMonth).replace('$', '')} / month
              </div>

              <div className="flex gap-2">
                <button 
                  onClick={() => handleAction(wallet.id, "subtract")}
                  className="flex-1 py-2 px-3 bg-white/60 dark:bg-white/10 border border-white/40 dark:border-white/10 rounded-xl text-[11px] font-bold hover:bg-brand-orange hover:text-white hover:border-brand-orange transition-all active:scale-95 cursor-pointer shadow-sm"
                >
                  Transfer
                </button>
                <button 
                  onClick={() => handleAction(wallet.id, "add")}
                  className="flex-1 py-2 px-3 bg-brand-orange text-white rounded-xl text-[11px] font-bold hover:bg-orange-600 transition-all active:scale-95 cursor-pointer shadow-md shadow-brand-orange/20"
                >
                  Request
                </button>
              </div>
            </div>
          </div>
        ))}
        
        {/* Skeleton for "Add Wallet" */}
        <button 
          onClick={() => dispatch({ 
            type: "ADD_WALLET", 
            payload: { 
              id: `w${Date.now()}`, 
              currency: "EUR", 
              flag: "🇪🇺", 
              amount: 0, 
              limitPerMonth: 5000, 
              status: "Active" 
            } 
          })}
          className="min-w-[120px] rounded-2xl border-2 border-dashed border-border/50 hover:border-brand-orange/40 hover:bg-brand-orange/5 transition-all flex flex-col items-center justify-center gap-2 group cursor-pointer"
        >
          <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center group-hover:scale-110 transition-transform">
            <Plus className="w-5 h-5 text-text-secondary group-hover:text-brand-orange" />
          </div>
          <span className="text-[11px] font-bold text-text-secondary group-hover:text-brand-orange uppercase tracking-wider">New Wallet</span>
        </button>
      </div>
    </div>
  )
}
