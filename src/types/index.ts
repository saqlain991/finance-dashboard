// ─── Enums / Unions ────────────────────────────────────────────────
export type TransactionStatus = "Completed" | "Pending" | "In Progress"
export type TransactionType = "income" | "expense"
export type UserRole = "viewer" | "editor" | "admin"
export type Theme = "light" | "dark"
export type Currency = "USD" | "EUR" | "GBP"
export type NavSection = "overview" | "activity" | "manage" | "program" | "account" | "reports" | "insights"
export type SortField = "date" | "amount" | "activity" | "status"
export type SortOrder = "asc" | "desc"

// ─── Core Entities ─────────────────────────────────────────────────
export interface Transaction {
  id: string
  activity: string
  icon: string
  category: string
  type: TransactionType
  price: number
  status: TransactionStatus
  date: string
  createdAt: string
}

export interface Wallet {
  id: string
  currency: Currency
  flag: string
  amount: number
  limitPerMonth: number
  status: "Active" | "Inactive"
}

export interface CreditCard {
  id: string
  lastFour: string
  expiry: string
  cvv: string
  type: "mastercard" | "visa"
  theme: "dark" | "orange"
  status: "Active" | "Frozen"
  nfc: boolean
}

export interface InsightMetric {
  id: string
  label: string
  value: string
  subtext: string
  icon: string
  trend: "up" | "down" | "neutral"
  trendValue?: string
}

// ─── Chart Data ────────────────────────────────────────────────────
export interface MonthlyChartData {
  month: string
  profit: number
  loss: number
}

export interface CategoryData {
  category: string
  amount: number
  percentage: number
  color: string
}

export interface MonthlyComparisonData {
  month: string
  income: number
  expenses: number
}

// ─── State ─────────────────────────────────────────────────────────
export interface FilterState {
  search: string
  status: "all" | TransactionStatus
  type: "all" | TransactionType
  category: string
  sortField: SortField
  sortOrder: SortOrder
  page: number
  pageSize: number
}

export interface AppState {
  transactions: Transaction[]
  filters: FilterState
  role: UserRole
  activeNav: NavSection
  currency: Currency
  theme: Theme
  sidebarOpen: boolean
  wallets: Wallet[]
  cards: CreditCard[]
  activeProfileIndex: number
}

// ─── Actions ───────────────────────────────────────────────────────
export type AppAction =
  | { type: "SET_FILTER"; payload: Partial<FilterState> }
  | { type: "SET_ROLE"; payload: UserRole }
  | { type: "SET_ACTIVE_NAV"; payload: NavSection }
  | { type: "SET_CURRENCY"; payload: Currency }
  | { type: "SET_THEME"; payload: Theme }
  | { type: "TOGGLE_SIDEBAR" }
  | { type: "ADD_TRANSACTION"; payload: Transaction }
  | { type: "UPDATE_TRANSACTION"; payload: Transaction }
  | { type: "DELETE_TRANSACTION"; payload: string }
  | { type: "LOAD_FROM_STORAGE"; payload: Partial<AppState> }
  | { type: "ADD_CARD"; payload: CreditCard }
  | { type: "ADD_WALLET"; payload: Wallet }
  | { type: "UPDATE_WALLET_BALANCE"; payload: { id: string; amount: number; type: "add" | "subtract" } }
  | { type: "SET_PROFILE"; payload: number }

// ─── Form ──────────────────────────────────────────────────────────
export interface TransactionFormData {
  activity: string
  category: string
  type: TransactionType
  price: string
  date: string
  status: TransactionStatus
  icon: string
}

export interface TransactionFormErrors {
  activity?: string
  category?: string
  type?: string
  price?: string
  date?: string
  status?: string
}
