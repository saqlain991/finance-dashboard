"use client"

import { useEffect, useState } from "react"
import { motion, useSpring, useTransform } from "framer-motion"

interface AnimatedNumberProps {
  value: number
  formatFn?: (val: number) => string
  className?: string
}

export function AnimatedNumber({ value, formatFn = (v) => v.toString(), className }: AnimatedNumberProps) {
  const [isClient, setIsClient] = useState(false)
  
  useEffect(() => {
    setIsClient(true)
  }, [])

  const spring = useSpring(0, {
    stiffness: 75,
    damping: 15,
    mass: 1
  })

  useEffect(() => {
    spring.set(value)
  }, [spring, value])

  const display = useTransform(spring, (current) => formatFn(current))

  if (!isClient) {
    return <span className={className}>{formatFn(value)}</span>
  }

  return <motion.span className={className}>{display}</motion.span>
}
