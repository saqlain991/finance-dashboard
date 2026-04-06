import { AppSidebar } from "@/components/watermelon/erp-dashboard/components/app-sidebar"
import SiteHeader from "@/components/watermelon/erp-dashboard/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-surface-page dark:bg-[#0F0F10] overflow-hidden relative">
        {/* Background ambient glow effects for glassmorphism */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[#0CC8A8]/5 blur-[120px] pointer-events-none z-0"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] rounded-full bg-blue-500/5 blur-[100px] pointer-events-none z-0"></div>

        <AppSidebar />
        
        <SidebarInset className="flex flex-col flex-1 min-w-0 bg-transparent relative z-10 overflow-hidden">
          <SiteHeader />
          <main className="flex-1 overflow-y-auto overflow-x-hidden scroll-smooth">
            <div className="p-6 lg:p-8 w-full max-w-[1600px] mx-auto">
              {children}
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
