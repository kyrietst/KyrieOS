import React from 'react'
import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { ProjectKanban } from '@/components/projects/project-kanban'
import { NewTaskDialog } from '@/components/projects/new-task-dialog'
import { Badge } from '@/components/ui/badge'
import { CalendarIcon, Layers } from 'lucide-react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export const revalidate = 0

interface ProjectPageProps {
  params: {
    id: string
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const supabase = createClient()

  // Fetch Project and Tasks
  const { data: project, error } = await supabase
    .from('projects')
    .select('*, tasks(*)')
    .eq('id', params.id)
    .single()

  if (error || !project) {
    console.error('Project not found or error:', error)
    notFound()
  }

  return (
    <div className="space-y-6">
       {/* Header */}
       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
          <div className="space-y-1">
             <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                   <Layers className="h-6 w-6 text-purple-500" />
                   {project.name}
                </h1>
                <Badge variant="outline" className={`
                    ${project.status === 'active' ? 'text-green-500 bg-green-500/10 border-green-500/20' : 
                      project.status === 'completed' ? 'text-blue-500 bg-blue-500/10 border-blue-500/20' : 
                      'text-yellow-500 bg-yellow-500/10 border-yellow-500/20'}
                `}>
                    {project.status === 'active' ? 'Em Andamento' : 
                     project.status === 'completed' ? 'Concluído' : 'Pausado'}
                </Badge>
             </div>
             <p className="text-sm text-zinc-400 flex items-center gap-2">
                {project.deadline && (
                    <>
                        <CalendarIcon className="h-3.5 w-3.5" />
                        Entrega esperada: {format(new Date(project.deadline), "d 'de' MMMM, yyyy", { locale: ptBR })}
                    </>
                )}
             </p>
          </div>
          
          <div className="flex items-center gap-3">
             <NewTaskDialog projectId={project.id} />
          </div>
       </div>

       {/* Kanban Board */}
       <ProjectKanban tasks={project.tasks || []} />
    </div>
  )
}
