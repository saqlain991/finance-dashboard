"use client"

import { WalletsCard } from "./WalletsCard"
import { MyCards } from "./MyCards"
import { useApp } from "@/context/AppContext"
import { motion } from "framer-motion"

export function HorizontalAssets() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
      <WalletsCard />
      <MyCards />
    </div>
  )
}
