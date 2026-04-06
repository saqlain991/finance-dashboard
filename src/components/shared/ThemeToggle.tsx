"use client"

import { useTheme } from "@/context/AppContext"
import { Moon, Sun } from "lucide-react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2.5 rounded-full bg-surface-page hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-500 flex items-center justify-center w-10 h-10"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  )
}
