'use client'

import React, { useState } from 'react'
import { MoreHorizontal, ArrowRight, CheckCircle2, Circle, Clock } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu'
import { ScrollArea } from '@/components/ui/scroll-area'

export interface Task {
  id: string
  title: string
  status: 'todo' | 'in_progress' | 'done'
  priority: 'low' | 'medium' | 'high'
  created_at: string
  project_id: string
}

interface ProjectKanbanProps {
  tasks: Task[]
}

const COLUMNS = [
  { id: 'todo', label: 'A Fazer', icon: Circle, color: 'text-zinc-400' },
  { id: 'in_progress', label: 'Em Andamento', icon: Clock, color: 'text-purple-500' },
  { id: 'done', label: 'Concluído', icon: CheckCircle2, color: 'text-green-500' },
] as const

const PRIORITY_COLORS = {
  low: 'bg-blue-500/10 text-blue-500 hover:bg-blue-500/20',
  medium: 'bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20',
  high: 'bg-red-500/10 text-red-500 hover:bg-red-500/20',
}

const PRIORITY_LABELS = {
  low: 'Baixa',
  medium: 'Média',
  high: 'Alta',
}

export function ProjectKanban({ tasks: initialTasks }: ProjectKanbanProps) {
  const router = useRouter()
  const supabase = createClient()
  const [movingId, setMovingId] = useState<string | null>(null)

  async function updateTaskStatus(taskId: string, newStatus: Task['status']) {
    setMovingId(taskId)
    try {
      const { error } = await supabase
        .from('tasks')
        .update({ status: newStatus })
        .eq('id', taskId)

      if (error) throw error

      toast.success('Status atualizado!')
      router.refresh()
    } catch (error) {
      console.error(error)
      toast.error('Erro ao atualizar status.')
    } finally {
      setMovingId(null)
    }
  }

  // Group tasks by column
  const tasksByColumn = COLUMNS.reduce((acc, col) => {
    acc[col.id] = initialTasks.filter((task) => task.status === col.id)
    return acc
  }, {} as Record<string, Task[]>)

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-12rem)] min-h-[500px]">
      {COLUMNS.map((column) => (
        <div key={column.id} className="flex flex-col h-full bg-zinc-900/50 rounded-xl border border-zinc-800/50 backdrop-blur-sm">
          {/* Column Header */}
          <div className="p-4 border-b border-zinc-800/50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <column.icon className={`h-4 w-4 ${column.color}`} />
              <h3 className="font-medium text-sm text-zinc-200">{column.label}</h3>
              <Badge variant="secondary" className="bg-zinc-800 text-zinc-400 text-[10px] px-1.5 min-w-[20px] justify-center">
                {tasksByColumn[column.id]?.length || 0}
              </Badge>
            </div>
          </div>

          {/* Column Content */}
          <ScrollArea className="flex-1 p-3">
            <div className="flex flex-col gap-3">
              {tasksByColumn[column.id]?.map((task) => (
                <Card 
                  key={task.id} 
                  className={`bg-zinc-800/40 border-zinc-700/50 hover:bg-zinc-800/60 transition-colors ${movingId === task.id ? 'opacity-50 pointer-events-none' : ''}`}
                >
                  <CardContent className="p-3 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                       <span className="text-sm font-medium text-zinc-200 line-clamp-2 leading-relaxed">
                         {task.title}
                       </span>
                       <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-6 w-6 p-0 text-zinc-500 hover:text-white shrink-0">
                            <MoreHorizontal className="h-3.5 w-3.5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[160px] bg-zinc-950 border-zinc-800 text-zinc-200">
                          <DropdownMenuLabel className="text-xs text-zinc-500 font-normal">Mover para...</DropdownMenuLabel>
                          {COLUMNS.filter(c => c.id !== task.status).map(col => (
                               <DropdownMenuItem 
                                key={col.id} 
                                onClick={() => updateTaskStatus(task.id, col.id as Task['status'])}
                                className="cursor-pointer"
                               >
                                <col.icon className={`mr-2 h-3.5 w-3.5 ${col.color}`} />
                                {col.label}
                               </DropdownMenuItem>
                          ))}
                          <DropdownMenuSeparator className="bg-zinc-800" />
                          <DropdownMenuItem className="text-red-500 focus:text-red-500 cursor-pointer">
                            Excluir
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <div className="flex items-center justify-between">
                       <Badge variant="outline" className={`border-0 text-[10px] font-medium px-2 py-0.5 ${PRIORITY_COLORS[task.priority]}`}>
                         {PRIORITY_LABELS[task.priority]}
                       </Badge>

                       {/* Quick Advance Button (Logic: Todo -> InProgress -> Done) */}
                       {task.status !== 'done' && (
                         <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 text-zinc-500 hover:text-purple-400 hover:bg-purple-500/10 rounded-full"
                            onClick={() => {
                                const nextStatus = task.status === 'todo' ? 'in_progress' : 'done'
                                updateTaskStatus(task.id, nextStatus)
                            }}
                            title="Avançar status"
                         >
                            <ArrowRight className="h-3.5 w-3.5" />
                         </Button>
                       )}
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {tasksByColumn[column.id]?.length === 0 && (
                 <div className="flex flex-col items-center justify-center py-8 text-zinc-500 border border-dashed border-zinc-800 rounded-lg bg-zinc-900/20">
                    <p className="text-xs">Vazio</p>
                 </div>
              )}
            </div>
          </ScrollArea>
        </div>
      ))}
    </div>
  )
}
