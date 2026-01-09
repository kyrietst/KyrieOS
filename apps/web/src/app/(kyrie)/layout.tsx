import { AppSidebar } from '@/components/layout/app-sidebar'
import { SiteHeader } from '@/components/layout/site-header'

export default function KyrieLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-zinc-950 text-zinc-100 font-sans">
      <AppSidebar />
      <div className="flex-1 flex flex-col min-w-0 transition-all duration-300">
        <SiteHeader />
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
