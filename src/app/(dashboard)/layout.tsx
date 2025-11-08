"use client"
import { SidebarProvider } from "@/components/ui/sidebar";
import { Book, Undo2 } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export default function DashboardLayout({children}: {children: React.ReactNode}) {
  const router = useRouter();
  const isHome = usePathname() == "/home";

  return (
    <SidebarProvider>
      <main className="p-2  h-[100dvh] w-[100dvw] flex flex-col">
        <header className="relative flex items-center mb-4">
          {!isHome ? (
            <Undo2 className="cursor-pointer" onClick={() => router.back()} />
          ) : (
            <Book />
          )
        }

        <h1 className="absolute left-1/2 -translate-x-1/2 text-xl font-semibold">
          BookLoom
        </h1>
        </header>
        {children}
      </main>
    </SidebarProvider>
  )
}