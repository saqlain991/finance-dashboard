import { Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import { useApp } from "@/context/AppContext"
import type { CreditCard } from "@/types"

export function MyCards() {
  const { state, dispatch } = useApp()
  const { cards } = state

  const handleAddCard = () => {
    const newCard: CreditCard = {
      id: `c${Date.now()}`,
      lastFour: Math.floor(1000 + Math.random() * 9000).toString(),
      expiry: "12/29",
      cvv: Math.floor(100 + Math.random() * 900).toString(),
      type: Math.random() > 0.5 ? "visa" : "mastercard",
      theme: Math.random() > 0.5 ? "dark" : "orange",
      status: "Active",
      nfc: true,
    }
    dispatch({ type: "ADD_CARD", payload: newCard })
  }

  return (
    <div className="bg-surface-card dark:bg-[#1A1A1E]/60 backdrop-blur-xl rounded-2xl p-6 shadow-sm border border-white/20 dark:border-white/5 h-full flex flex-col">
      <div className="flex justify-between items-center mb-5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded border border-border flex items-center justify-center">
            <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="0.5" y="0.5" width="17" height="13" rx="1.5" stroke="currentColor"/>
              <path d="M0.5 4.5H17.5" stroke="currentColor"/>
            </svg>
          </div>
          <h3 className="font-bold text-text-primary text-lg tracking-tight">My Cards</h3>
        </div>
        <button 
          onClick={handleAddCard}
          className="flex items-center gap-1.5 text-brand-orange hover:bg-brand-orange/10 px-3 py-1.5 rounded-lg font-bold text-xs transition-all active:scale-95 cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Add new
        </button>
      </div>

      <div className="flex items-center gap-4 overflow-x-auto pb-4 -mx-1 px-1 no-scrollbar flex-1 scroll-smooth">
        {cards.map((card) => (
          <div 
             key={card.id} 
             className={cn(
               "relative min-w-[280px] h-[180px] rounded-2xl p-6 flex flex-col justify-between overflow-hidden cursor-pointer transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1 shadow-lg",
               card.theme === 'dark' ? 'bg-gradient-to-br from-[#1A1A1E] to-[#2A2A2E] text-white shadow-black/20' : 'bg-gradient-to-br from-brand-orange to-orange-600 text-white shadow-brand-orange/30'
             )}
          >
            {card.theme === 'orange' && (
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />
            )}
            
            <div className="flex justify-between items-start relative z-10">
              <div className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 4"/>
                </svg>
                <span className="text-xs font-semibold px-2 py-0.5 bg-white/20 rounded-full backdrop-blur-sm">
                  {card.status}
                </span>
              </div>
              <div className="w-10 h-6 flex relative">
                <div className="w-6 h-6 rounded-full bg-red-500/80 absolute right-4 mix-blend-multiply"></div>
                <div className="w-6 h-6 rounded-full bg-yellow-500/80 absolute right-0 mix-blend-multiply"></div>
              </div>
            </div>

            <div className="mt-8 relative z-10 space-y-4">
              <div className="flex justify-between text-xs text-white/80">
                <span>Card Number</span>
                <span className="opacity-0">EXP {card.expiry}</span>
              </div>
              
              <div className="flex justify-between items-end">
                <div className="font-mono text-[15px] tracking-[0.15em] flex gap-2">
                  <span>****</span>
                  <span>****</span>
                  <span>****</span>
                  <span>{card.lastFour}</span>
                </div>
              </div>

              <div className="flex gap-6 text-xs mt-2">
                <div>
                  <span className="block text-white/70 mb-0.5">EXP</span>
                  <span className="font-medium tracking-wide">{card.expiry}</span>
                </div>
                <div>
                  <span className="block text-white/70 mb-0.5">CVV</span>
                  <span className="font-medium tracking-wide">{card.cvv}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
