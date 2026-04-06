import {
  LayoutDashboard, Activity, Settings, Users, Layers,
  FileText, Calendar, HelpCircle, LogOut
} from "lucide-react"
import type { NavSection, UserRole } from "@/types"

export const NAV_ITEMS = [
  { id: "overview" as NavSection, icon: LayoutDashboard, label: "Overview", href: "/overview" },
  { id: "activity" as NavSection, icon: Activity, label: "Transactions", href: "/transactions" },
  { id: "manage" as NavSection, icon: Layers, label: "Manage", href: "/manage", adminOnly: true },
  { id: "program" as NavSection, icon: FileText, label: "Program", href: "/program" },
  { id: "account" as NavSection, icon: Users, label: "Account", href: "/account" },
  { id: "insights" as NavSection, icon: Calendar, label: "Reports", href: "/insights" },
  { id: "settings" as NavSection, icon: Settings, label: "Settings", href: "/settings" },
] as const

export const TOP_NAV_ITEMS = [
  { label: "Overview", href: "/overview", id: "overview" as NavSection },
  { label: "Activity", href: "/activity", id: "activity" as NavSection },
  { label: "Manage", href: "/manage", id: "manage" as NavSection },
  { label: "Program", href: "/program", id: "program" as NavSection },
  { label: "Account", href: "/account", id: "account" as NavSection },
  { label: "Reports", href: "/insights", id: "insights" as NavSection },
]

export const TRANSACTION_CATEGORIES = [
  "Technology", "Travel", "Food", "Entertainment",
  "Health", "Education", "Shopping", "Income", "Other",
] as const

export const CURRENCIES = [
  { code: "USD", flag: "🇺🇸", symbol: "$" },
  { code: "EUR", flag: "🇩🇪", symbol: "€" },
  { code: "GBP", flag: "🇬🇧", symbol: "£" },
] as const

export const STATUS_OPTIONS = ["all", "Completed", "Pending", "In Progress"] as const
export const TYPE_OPTIONS = ["all", "income", "expense"] as const

export const CATEGORY_COLORS: Record<string, string> = {
  Technology: "#E84B1C",
  Travel: "#3B82F6",
  Food: "#22C55E",
  Entertainment: "#A855F7",
  Health: "#F59E0B",
  Education: "#06B6D4",
  Shopping: "#EC4899",
  Income: "#10B981",
  Other: "#6B7280",
}

export const PAGE_SIZE = 10

export const USER = {
  name: "Saqlain Sultan",
  email: "saqlainsultan991@gmail.com",
  initials: "SS",
  avatar: null,
}

export const PROFILES = [
  { name: "Saqlain Sultan", email: "saqlainsultan991@gmail.com", initials: "SS", role: "admin" as UserRole, active: true, avatar: null },
  { name: "Alex Johnson", email: "alex.j@company.com", initials: "AJ", role: "editor" as UserRole, active: false, avatar: null },
  { name: "Design Team", email: "design@finexy.com", initials: "DT", role: "viewer" as UserRole, active: false, avatar: null },
]

export const NOTIFICATIONS = [
  { id: 1, title: "Payment Received", description: "You received $2,500.00 from Upwork", time: "2m ago", read: false, type: "income" },
  { id: 2, title: "Subscription Renewal", description: "Netflix subscription renewed for $15.99", time: "1h ago", read: true, type: "expense" },
  { id: 3, title: "Market Alert", description: "Bitcoin is up 5% in the last 24 hours", time: "3h ago", read: false, type: "alert" },
]

export const MESSAGES = [
  { id: 1, sender: "James Wilson", snippet: "Could you review the April financial report?", time: "5m ago", read: false, initials: "JW" },
  { id: 2, sender: "Sophia Chen", snippet: "The technology budget is ready for approval.", time: "45m ago", read: false, initials: "SC" },
  { id: 3, sender: "Michael Rodriquez", snippet: "Let's catch up on the Q2 strategy tomorrow.", time: "2h ago", read: true, initials: "MR" },
]

export const BALANCE = {
  total: 689372.00,
  monthlyChange: 5,
  spendingLimit: 5500,
  spent: 1400,
}

export const CHART_DATA = [
  { month: "Jan", profit: 28000, loss: 12000 },
  { month: "Feb", profit: 22000, loss: 14000 },
  { month: "Mar", profit: 18000, loss: 10000 },
  { month: "Apr", profit: 38000, loss: 22000 },
  { month: "May", profit: 42000, loss: 18000 },
  { month: "Jun", profit: 35000, loss: 24000 },
  { month: "Jul", profit: 30000, loss: 20000 },
  { month: "Aug", profit: 28000, loss: 16000 },
]

export const WALLETS = [
  { id: "w1", currency: "USD" as const, flag: "🇺🇸", amount: 22678.00, limitPerMonth: 10000, status: "Active" as const },
  { id: "w2", currency: "EUR" as const, flag: "🇩🇪", amount: 18345.00, limitPerMonth: 8000, status: "Active" as const },
  { id: "w3", currency: "GBP" as const, flag: "🇬🇧", amount: 15000.00, limitPerMonth: 7500, status: "Inactive" as const },
]

export const CARDS = [
  {
    id: "c1", lastFour: "8782", expiry: "09/29", cvv: "611",
    type: "mastercard" as const, theme: "dark" as const, status: "Active" as const, nfc: true,
  },
  {
    id: "c2", lastFour: "4356", expiry: "12/28", cvv: "442",
    type: "visa" as const, theme: "orange" as const, status: "Active" as const, nfc: true,
  },
]
