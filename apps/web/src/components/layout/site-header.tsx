'use client'

import { Bell, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-lg">
      <div className="flex h-16 items-center px-6 gap-4">
        
        {/* Breadcrumbs Placeholder */}
        <div className="hidden md:flex items-center text-sm text-zinc-500">
           <span className="text-zinc-300 font-medium">Dashboard</span>
           <span className="mx-2">/</span>
           <span>Visão Geral</span>
        </div>

        <div className="flex-1" />

        <div className="flex items-center gap-4">
          <div className="relative hidden md:block w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" />
            <Input 
              placeholder="Buscar..." 
              className="pl-9 bg-zinc-900 border-zinc-800 text-sm h-9 focus-visible:ring-purple-500" 
            />
          </div>

          <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white">
            <Bell className="h-5 w-5" />
          </Button>

          <div className="h-8 w-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-xs font-bold text-white cursor-pointer hover:bg-zinc-700 transition-colors">
            AD
          </div>
        </div>
      </div>
    </header>
  )
}
