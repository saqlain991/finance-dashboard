import type { Metadata } from "next"
import { DM_Sans, Geist } from "next/font/google"
import "./globals.css"
import { AppProvider } from "@/context/AppContext"
import { Toaster } from "@/components/ui/sonner"
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Finexy Dashboard",
  description: "Stay on top of your tasks, monitor progress, and track status.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={cn("font-sans", geist.variable)}>
      <body className={`${dmSans.variable} font-sans antialiased text-text-primary bg-surface-page dark:bg-[#0F0F10] dark:text-[#F9FAFB]`} suppressHydrationWarning>
        <AppProvider>
          {children}
          <Toaster />
        </AppProvider>
      </body>
    </html>
  )
}
