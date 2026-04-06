"use client"

import {
  createContext, useContext, useReducer, useEffect,
  useCallback, type ReactNode
} from "react"
import type { AppState, AppAction, FilterState, UserRole } from "@/types"
import { MOCK_TRANSACTIONS } from "@/lib/data"
import { WALLETS, CARDS, PROFILES } from "@/lib/constants"

const DEFAULT_FILTERS: FilterState = {
  search: "",
  status: "all",
  type: "all",
  category: "",
  sortField: "date",
  sortOrder: "desc",
  page: 1,
  pageSize: 10,
}

const INITIAL_STATE: AppState = {
  transactions: MOCK_TRANSACTIONS,
  filters: DEFAULT_FILTERS,
  role: "viewer",
  activeNav: "overview",
  currency: "USD",
  theme: "light",
  sidebarOpen: false,
  wallets: WALLETS,
  cards: CARDS,
  activeProfileIndex: 0,
}

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "SET_FILTER":
      return {
        ...state,
        filters: { ...state.filters, ...action.payload, page: action.payload.page ?? 1 },
      }
    case "SET_ROLE":
      return { ...state, role: action.payload }
    case "SET_ACTIVE_NAV":
      return { ...state, activeNav: action.payload }
    case "SET_CURRENCY":
      return { ...state, currency: action.payload }
    case "SET_THEME":
      return { ...state, theme: action.payload }
    case "TOGGLE_SIDEBAR":
      return { ...state, sidebarOpen: !state.sidebarOpen }
    case "ADD_TRANSACTION":
      return { ...state, transactions: [action.payload, ...state.transactions] }
    case "UPDATE_TRANSACTION":
      return {
        ...state,
        transactions: state.transactions.map(t =>
          t.id === action.payload.id ? action.payload : t
        ),
      }
    case "DELETE_TRANSACTION":
      return {
        ...state,
        transactions: state.transactions.filter(t => t.id !== action.payload),
      }
    case "LOAD_FROM_STORAGE":
      return { ...state, ...action.payload }
    case "ADD_CARD":
      return { ...state, cards: [action.payload, ...state.cards] }
    case "ADD_WALLET":
      return { ...state, wallets: [action.payload, ...state.wallets] }
    case "UPDATE_WALLET_BALANCE":
      return {
        ...state,
        wallets: state.wallets.map(w => {
          if (w.id === action.payload.id) {
            const newAmount = action.payload.type === "add" 
              ? w.amount + action.payload.amount 
              : w.amount - action.payload.amount
            return { ...w, amount: Math.max(0, newAmount) }
          }
          return w
        })
      }
    case "SET_PROFILE": {
      const profile = PROFILES[action.payload]
      return { 
        ...state, 
        activeProfileIndex: action.payload,
        role: profile ? (profile.role as UserRole) : state.role
      }
    }
    default:
      return state
  }
}

interface AppContextValue {
  state: AppState
  dispatch: React.Dispatch<AppAction>
  setFilter: (filters: Partial<FilterState>) => void
  setRole: (role: AppState["role"]) => void
  setTheme: (theme: AppState["theme"]) => void
  toggleSidebar: () => void
}

const AppContext = createContext<AppContextValue | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, INITIAL_STATE)

  useEffect(() => {
    try {
      const persisted = localStorage.getItem("finexy_state")
      if (persisted) {
        const parsed = JSON.parse(persisted) as Partial<AppState>
        dispatch({
          type: "LOAD_FROM_STORAGE",
          payload: {
            role: parsed.role,
            theme: parsed.theme,
            currency: parsed.currency,
            transactions: parsed.transactions ?? MOCK_TRANSACTIONS,
            wallets: parsed.wallets ?? WALLETS,
            cards: parsed.cards ?? CARDS,
            activeProfileIndex: parsed.activeProfileIndex ?? 0,
          },
        })
      }
    } catch { /* ignore */ }
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem("finexy_state", JSON.stringify({
        role: state.role,
        theme: state.theme,
        currency: state.currency,
        transactions: state.transactions,
        wallets: state.wallets,
        cards: state.cards,
        activeProfileIndex: state.activeProfileIndex,
      }))
    } catch { /* ignore */ }
  }, [state.role, state.theme, state.currency, state.transactions, state.activeProfileIndex])

  useEffect(() => {
    const root = document.documentElement
    if (state.theme === "dark") {
      root.classList.add("dark")
    } else {
      root.classList.remove("dark")
    }
  }, [state.theme])

  const setFilter = useCallback((filters: Partial<FilterState>) => {
    dispatch({ type: "SET_FILTER", payload: filters })
  }, [])

  const setRole = useCallback((role: AppState["role"]) => {
    dispatch({ type: "SET_ROLE", payload: role })
  }, [])

  const setTheme = useCallback((theme: AppState["theme"]) => {
    dispatch({ type: "SET_THEME", payload: theme })
  }, [])

  const toggleSidebar = useCallback(() => {
    dispatch({ type: "TOGGLE_SIDEBAR" })
  }, [])

  return (
    <AppContext.Provider value={{ state, dispatch, setFilter, setRole, setTheme, toggleSidebar }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error("useApp must be used inside AppProvider")
  return ctx
}
export function useRole() {
  const { state, setRole } = useApp()
  return { 
    role: state.role, 
    setRole, 
    isAdmin: state.role === "admin",
    isEditor: state.role === "editor",
    isViewer: state.role === "viewer"
  }
}

export function useTheme() {
  const { state, setTheme } = useApp()
  return { theme: state.theme, setTheme, isDark: state.theme === "dark" }
}

export function useTransactions() {
  const { state } = useApp()
  const { transactions, filters, activeProfileIndex } = state

  // Simulate profile-specific transactions by filtering based on index
  // Each profile sees a unique subset of the transactions
  let filtered = transactions.filter((_, idx) => (idx + activeProfileIndex) % 3 !== 2)

  if (filters.search) {
    const q = filters.search.toLowerCase()
    filtered = filtered.filter(t =>
      t.activity.toLowerCase().includes(q) ||
      t.id.toLowerCase().includes(q) ||
      t.category.toLowerCase().includes(q)
    )
  }

  if (filters.status !== "all") {
    filtered = filtered.filter(t => t.status === filters.status)
  }

  if (filters.type !== "all") {
    filtered = filtered.filter(t => t.type === filters.type)
  }

  if (filters.category && filters.category !== "all") {
    filtered = filtered.filter(t => t.category === filters.category)
  }

  filtered.sort((a, b) => {
    let compare = 0
    switch (filters.sortField) {
      case "amount": compare = a.price - b.price; break
      case "activity": compare = a.activity.localeCompare(b.activity); break
      case "status": compare = a.status.localeCompare(b.status); break
      case "date":
      default: compare = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    }
    return filters.sortOrder === "asc" ? compare : -compare
  })

  const total = filtered.length
  const totalPages = Math.ceil(total / filters.pageSize)
  const paginated = filtered.slice(
    (filters.page - 1) * filters.pageSize,
    filters.page * filters.pageSize
  )

  return { transactions: paginated, total, totalPages, allFiltered: filtered }
}

export function useAnalyticsData() {
  const { state } = useApp()
  const { activeProfileIndex } = state

  // Generate deterministic but profile-unique chart data
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  
  const chartData = months.map((month, i) => {
    // Basic seed based on month index and profile index
    const seed = i + activeProfileIndex * 2
    const profitBase = 3000 + (Math.sin(seed) * 1500)
    const lossBase = 1500 + (Math.cos(seed) * 800)
    
    // Admins get "better" looking data
    const multiplier = state.role === 'admin' ? 1.5 : state.role === 'editor' ? 1.1 : 0.8
    
    return {
      month,
      profit: Math.floor(profitBase * multiplier),
      loss: Math.floor(lossBase * multiplier),
    }
  })

  return { chartData }
}
