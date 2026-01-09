'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, Search, Calendar as CalendarIcon, MoreHorizontal } from 'lucide-react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { NewProjectDialog } from './new-project-dialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export interface Project {
  id: string
  name: string
  status: 'active' | 'completed' | 'on_hold'
  deadline: string
  organization_id: string
  organizations: {
    name: string
    logo_url?: string | null
  }
}

interface ProjectGridProps {
  initialProjects: Project[]
  organizations: { id: string; name: string }[]
}

export function ProjectGrid({ initialProjects, organizations }: ProjectGridProps) {
  // FORCE REFRESH: Fixed hydration error by making progress static
  console.log('Rendering ProjectGrid - Safe Mode')
  const [filterClient, setFilterClient] = useState<string>('all')
  const [search, setSearch] = useState('')
  const router = useRouter() // Use router for navigation

  const filteredProjects = initialProjects.filter((project) => {
    const matchesClient = filterClient === 'all' || project.organization_id === filterClient
    const matchesSearch = project.name.toLowerCase().includes(search.toLowerCase()) || 
                          project.organizations.name.toLowerCase().includes(search.toLowerCase())
    return matchesClient && matchesSearch
  })

  // Safe static progress to avoid hydration errors until we have real task data
  const getProgress = (status: string) => {
    if (status === 'completed') return 100
    if (status === 'on_hold') return 30
    return 0 // Static 0% for now to prevent server/client mismatches
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500/15 text-green-500 hover:bg-green-500/25 border-0">Em Andamento</Badge>
      case 'completed':
        return <Badge className="bg-blue-500/15 text-blue-500 hover:bg-blue-500/25 border-0">Concluído</Badge>
      case 'on_hold':
        return <Badge className="bg-yellow-500/15 text-yellow-500 hover:bg-yellow-500/25 border-0">Pausado</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const handleCardClick = (projectId: string) => {
    console.log('Navigating to project:', projectId)
    router.push(`/dashboard/projects/${projectId}`)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-zinc-500" />
            <Input
              placeholder="Buscar projetos..."
              className="pl-8 bg-zinc-900 border-zinc-800 focus-visible:ring-purple-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Select value={filterClient} onValueChange={setFilterClient}>
            <SelectTrigger className="w-[180px] bg-zinc-900 border-zinc-800 text-zinc-200">
              <SelectValue placeholder="Todos os Clientes" />
            </SelectTrigger>
            <SelectContent className="bg-zinc-900 border-zinc-800 text-zinc-200">
              <SelectItem value="all">Todos os Clientes</SelectItem>
              {organizations.map((org) => (
                <SelectItem key={org.id} value={org.id}>
                  {org.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <NewProjectDialog />
      </div>

      {filteredProjects.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 border border-zinc-800 rounded-lg bg-zinc-900/50 text-center">
            <div className="bg-zinc-800/50 p-4 rounded-full mb-4">
                <CalendarIcon className="h-8 w-8 text-zinc-400" />
            </div>
            <h3 className="text-lg font-medium text-white">Nenhum projeto encontrado</h3>
            <p className="text-zinc-400 max-w-sm mt-2 mb-6">
                {search || filterClient !== 'all' 
                 ? "Tente ajustar seus filtros para encontrar o que procura."
                 : "Comece criando o primeiro projeto para um de seus clientes."}
            </p>
            {!search && filterClient === 'all' && (
                <NewProjectDialog />
            )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div 
                key={project.id} 
                className="group relative cursor-pointer"
                onClick={() => handleCardClick(project.id)}
            >
              <Card className="h-full bg-zinc-900 border-zinc-800 hover:border-zinc-700 transition-colors ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
              <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                <div className="flex flex-col gap-1">
                    <CardTitle className="text-base font-semibold text-white line-clamp-1" title={project.name}>
                        {project.name}
                    </CardTitle>
                    <CardDescription className="text-zinc-400 flex items-center gap-1.5">
                       <span className="w-2 h-2 rounded-full bg-purple-500 inline-block"></span>
                       {project.organizations.name}
                    </CardDescription>
                </div>
                <div className="relative z-10">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                        variant="ghost" 
                        className="h-8 w-8 p-0 text-zinc-400 hover:text-white"
                        onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                        }}
                    >
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-zinc-950 border-zinc-800 text-zinc-200">
                    <DropdownMenuItem onClick={(e) => {
                        e.stopPropagation()
                        handleCardClick(project.id)
                    }}>Ver Detalhes</DropdownMenuItem>
                    <DropdownMenuItem onClick={(e) => e.stopPropagation()}>Editar</DropdownMenuItem>
                    <DropdownMenuItem 
                        className="text-red-500 focus:text-red-500"
                        onClick={(e) => e.stopPropagation()}
                    >
                        Arquivar
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 pt-4">
                 <div className="flex items-center justify-between">
                    {getStatusBadge(project.status)}
                    {project.deadline && (
                        <div className="flex items-center text-xs text-zinc-500">
                            <CalendarIcon className="mr-1 h-3 w-3" />
                            {format(new Date(project.deadline), "d MMM, yyyy", { locale: ptBR })}
                        </div>
                    )}
                 </div>
                 
                 <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs text-zinc-400">
                        <span>Progresso</span>
                        <span>{getProgress(project.status)}%</span>
                    </div>
                    <Progress value={getProgress(project.status)} className="h-2 bg-zinc-800" indicatorClassName={
                        project.status === 'completed' ? 'bg-blue-500' : 
                        project.status === 'on_hold' ? 'bg-yellow-500' : 'bg-purple-500'
                    } />
                 </div>
              </CardContent>
            </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
