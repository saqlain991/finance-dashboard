"use client"

import { useTransactions } from "@/context/AppContext"
import { Search, Filter, MoreHorizontal } from "lucide-react"
import { formatCurrency, getStatusColor, formatDate } from "@/lib/utils"
import { Checkbox } from "@/components/ui/checkbox"

export function RecentActivities() {
  const { transactions } = useTransactions()
  const displayTransactions = transactions.slice(0, 5)

  return (
    <div className="bg-surface-card dark:bg-surface-dark-card rounded-2xl p-6 shadow-sm border border-border h-full flex flex-col">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h3 className="font-semibold text-text-primary text-lg">Recent Activities</h3>
        
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search" 
              className="w-full pl-9 pr-4 py-2 border border-border rounded-xl bg-surface-page dark:bg-[#242428] focus:outline-none focus:ring-1 focus:ring-brand-orange/50 text-sm"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-xl text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors shrink-0">
            Filter <Filter className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left whitespace-nowrap">
          <thead className="text-xs text-text-secondary bg-gray-50/50 dark:bg-gray-800/30">
            <tr>
              <th className="px-4 py-3 rounded-l-lg font-medium w-12 text-center">
                <Checkbox />
              </th>
              <th className="px-4 py-3 font-medium">Order ID</th>
              <th className="px-4 py-3 font-medium">Activity</th>
              <th className="px-4 py-3 font-medium">Price</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Date</th>
              <th className="px-4 py-3 rounded-r-lg font-medium w-12 text-center"></th>
            </tr>
          </thead>
          <tbody>
            {displayTransactions.map((tx) => {
              const { bg, text, dot } = getStatusColor(tx.status)
              
              return (
                <tr key={tx.id} className="border-b border-border/50 last:border-0 hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors">
                  <td className="px-4 py-4 text-center">
                    <Checkbox />
                  </td>
                  <td className="px-4 py-4 text-text-secondary font-medium">
                    {tx.id.replace('INV_', 'INV-')}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-[#242428] flex items-center justify-center text-base">
                        {tx.icon}
                      </div>
                      <span className="font-medium text-text-primary">{tx.activity}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 font-semibold text-text-primary">
                    {formatCurrency(tx.price)}
                  </td>
                  <td className="px-4 py-4">
                    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${bg} ${text}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${dot}`}></span>
                      {tx.status}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-text-secondary">
                    {formatDate(tx.date)}
                  </td>
                  <td className="px-4 py-4 text-center">
                    <button className="text-gray-400 hover:text-gray-600 transition-colors">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
