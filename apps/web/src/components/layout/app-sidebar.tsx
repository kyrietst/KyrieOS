'use client'

import React, { useState, createContext, useContext } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  DollarSign, 
  Settings, 
  ChevronLeft,
  Sparkles,
  FileText
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface SidebarContextProps {
  collapsed: boolean
  setCollapsed: (collapsed: boolean) => void
}

const SidebarContext = createContext<SidebarContextProps | undefined>(undefined)

export function useSidebar() {
  const context = useContext(SidebarContext)
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider')
  }
  return context
}

export function Sidebar({ children, className }: { children: React.ReactNode; className?: string }) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <SidebarContext.Provider value={{ collapsed, setCollapsed }}>
      <motion.div
        className={cn(
          "h-screen bg-zinc-950 border-r border-zinc-800 flex flex-col flex-shrink-0 transition-all duration-300 z-50",
          collapsed ? "w-[80px]" : "w-[280px]",
          className
        )}
        initial={false}
        animate={{ width: collapsed ? 80 : 280 }}
      >
        {children}
      </motion.div>
    </SidebarContext.Provider>
  )
}

export function SidebarHeader({ children }: { children: React.ReactNode }) {
  const { collapsed } = useSidebar()
  
  return (
    <div className="h-16 flex items-center px-6 border-b border-zinc-900/50">
      <AnimatePresence mode="wait">
        {collapsed ? (
           <div className="w-full flex justify-center">{/* Icon only logo could go here */}</div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function SidebarContent({ children }: { children: React.ReactNode }) {
  return <div className="flex-1 overflow-y-auto py-4 flex flex-col gap-2">{children}</div>
}

export function SidebarFooter({ children }: { children: React.ReactNode }) {
  
  return (
    <div className="p-4 border-t border-zinc-900/50">
       {/* Footer content */}
       {children}
    </div>
  )
}

interface SidebarLinkProps {
  href: string
  icon: React.ElementType
  label: string
}

export function SidebarLink({ href, icon: Icon, label }: SidebarLinkProps) {
  const pathname = usePathname()
  const isActive = pathname === href
  const { collapsed } = useSidebar()

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 px-4 py-3 mx-2 rounded-lg transition-colors group relative",
        isActive 
          ? "bg-purple-500/10 text-purple-400" 
          : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
      )}
    >
      <Icon className={cn("h-5 w-5 flex-shrink-0", isActive ? "text-purple-400" : "text-zinc-400 group-hover:text-white")} />
      
      {!collapsed && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="text-sm font-medium whitespace-nowrap"
        >
          {label}
        </motion.span>
      )}

      {/* Tooltip for collapsed state */}
      {collapsed && (
        <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 bg-zinc-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 border border-zinc-800">
          {label}
        </div>
      )}
    </Link>
  )
}

export function SidebarTrigger() {
  const { collapsed, setCollapsed } = useSidebar()
  
  return (
    <button
      onClick={() => setCollapsed(!collapsed)}
      className="absolute right-[-12px] top-6 bg-zinc-900 border border-zinc-800 rounded-full p-1 text-zinc-400 hover:text-white transition-colors"
    >
      <ChevronLeft className={cn("h-3 w-3 transition-transform", collapsed && "rotate-180")} />
    </button>
  )
}

export function AppSidebar() {
  return (
    <Sidebar className="relative">
      <SidebarTrigger />
      
      <SidebarHeader>
        <div className="flex items-center gap-2 font-bold text-xl tracking-tight text-white">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
            K
          </div>
          <span>Kyrie OS</span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarLink href="/dashboard" icon={LayoutDashboard} label="Visão Geral" />
        <SidebarLink href="/dashboard/clients" icon={Users} label="Clientes" />
        <SidebarLink href="/dashboard/ai-consultant" icon={Sparkles} label="Consultor IA" />
        <SidebarLink href="/dashboard/reports" icon={FileText} label="Meus Relatórios" />
        <SidebarLink href="/dashboard/projects" icon={Briefcase} label="Projetos" />
        <SidebarLink href="/dashboard/financial" icon={DollarSign} label="Financeiro" />
        <div className="mt-auto">
             <SidebarLink href="/dashboard/settings" icon={Settings} label="Configurações" />
        </div>
      </SidebarContent>
      
      <SidebarFooter>
         <div className="text-xs text-zinc-500 text-center">v1.0.0</div>
      </SidebarFooter>
    </Sidebar>
  )
}
