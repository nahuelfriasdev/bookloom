import { AppSidebar } from "@/components/ui/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function DashboardLayout({children}: {children: React.ReactNode}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="p-2  h-[100dvh] w-[100dvw] flex flex-col">
        <header className="relative flex items-center mb-4">
          <SidebarTrigger />
          <h1 className="absolute left-1/2 -translate-x-1/2 text-xl font-semibold">
            BookLoom
          </h1>
        </header>
        {children}
      </main>
    </SidebarProvider>
  )
}