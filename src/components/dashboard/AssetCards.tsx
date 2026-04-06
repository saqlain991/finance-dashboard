"use client"

import { WalletsCard } from "./WalletsCard"
import { MyCards } from "./MyCards"
import { useApp } from "@/context/AppContext"
import { motion } from "framer-motion"
import { CreditCard, Wallet, Plus } from "lucide-react"
import { formatAmount, cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreVertical, ChevronDown } from "lucide-react"
import type { CreditCard as CardType, Wallet as WalletType } from "@/types"

export function AssetCards() {
  const { state, dispatch } = useApp()
  const { wallets, cards } = state

  const handleWalletAction = (id: string, type: "add" | "subtract") => {
    dispatch({ type: "UPDATE_WALLET_BALANCE", payload: { id, amount: 500, type } })
  }

  const handleAddCard = () => {
    const newCard: CardType = {
      id: `c${Date.now()}`,
      lastFour: Math.floor(1000 + Math.random() * 9000).toString(),
      expiry: "12/29",
      cvv: "000",
      type: "visa",
      theme: "orange",
      status: "Active",
      nfc: true,
    }
    dispatch({ type: "ADD_CARD", payload: newCard })
  }

  return (
    <div className="bg-surface-card dark:bg-[#1A1A1E]/60 backdrop-blur-xl rounded-3xl p-6 shadow-sm border border-white/20 dark:border-white/5">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-text-primary text-xl tracking-tight">Financial Assets</h3>
        <button 
          onClick={handleAddCard}
          className="text-xs font-bold text-brand-orange hover:bg-brand-orange/10 px-4 py-2 rounded-xl transition-all active:scale-95 cursor-pointer flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" /> Add card
        </button>
      </div>

      <div className="flex items-stretch gap-6 overflow-x-auto pb-4 no-scrollbar scroll-smooth">
        {/* Wallets */}
        <div className="flex gap-4">
          {wallets.map((wallet) => (
            <div key={wallet.id} className="min-w-[240px] bg-white/40 dark:bg-white/5 border border-white/40 dark:border-white/10 rounded-2xl p-5 flex flex-col group relative">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white dark:bg-white/10 flex items-center justify-center text-xl shadow-sm">
                    {wallet.flag}
                  </div>
                  <div>
                    <span className="font-bold text-sm block leading-none">{wallet.currency}</span>
                    <span className="text-[10px] text-text-secondary font-bold uppercase tracking-wider">{wallet.status}</span>
                  </div>
                </div>
              </div>
              <div className="mt-auto">
                <div className="text-[22px] font-black mb-1 text-text-primary tracking-tight">
                  {new Intl.NumberFormat('en-US', { style: 'currency', currency: wallet.currency }).format(wallet.amount)}
                </div>
                <div className="flex gap-2 mt-4 text-[11px] font-bold">
                  <button onClick={() => handleWalletAction(wallet.id, "subtract")} className="flex-1 py-1.5 bg-white/60 dark:bg-white/10 rounded-lg hover:bg-brand-orange hover:text-white transition-all cursor-pointer">Transfer</button>
                  <button onClick={() => handleWalletAction(wallet.id, "add")} className="flex-1 py-1.5 bg-brand-orange text-white rounded-lg hover:bg-orange-600 transition-all cursor-pointer">Request</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="w-[1px] bg-border shrink-0 opacity-50" />

        {/* Cards */}
        <div className="flex gap-4">
          {cards.map((card) => (
            <div 
              key={card.id} 
              className={cn(
                "min-w-[280px] h-[160px] rounded-2xl p-5 flex flex-col justify-between overflow-hidden shadow-lg border border-white/10",
                card.theme === 'dark' ? 'bg-gradient-to-br from-[#1A1A1E] to-[#2A2A2E] text-white' : 'bg-gradient-to-br from-brand-orange to-orange-600 text-white'
              )}
            >
              <div className="flex justify-between items-start">
                <span className="text-[10px] uppercase font-black tracking-widest bg-white/20 px-2 py-0.5 rounded-full">{card.type}</span>
                <div className="w-8 h-5 flex relative">
                  <div className="w-5 h-5 rounded-full bg-red-500/60 absolute right-3 mix-blend-screen" />
                  <div className="w-5 h-5 rounded-full bg-yellow-500/60 absolute right-0 mix-blend-screen" />
                </div>
              </div>
              <div>
                <div className="text-[15px] font-mono tracking-widest mb-1.5 font-bold">**** **** **** {card.lastFour}</div>
                <div className="text-[9px] opacity-70 uppercase font-black tracking-widest">{card.expiry}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
