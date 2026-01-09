'use client'

import { useState } from 'react'
import { Bot, RefreshCw } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { api } from '@/lib/api'

export function AiTestButton() {
  const [loading, setLoading] = useState(false)

  const handleTestConnection = async () => {
    setLoading(true)
    try {
      const response = await api.get<{ message: string, status: string }>('/')
      toast.success('IA conectada!', {
        description: response.message
      })
    } catch (error) {
      console.error(error)
      toast.error('Falha na conexão com IA', {
        description: 'Verifique se o backend está rodando na porta 8000.'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button 
      variant="outline" 
      size="sm" 
      className="gap-2 bg-purple-500/10 text-purple-400 border-purple-500/20 hover:bg-purple-500/20 hover:text-purple-300"
      onClick={handleTestConnection}
      disabled={loading}
    >
      {loading ? (
        <RefreshCw className="h-4 w-4 animate-spin" />
      ) : (
        <Bot className="h-4 w-4" />
      )}
      Testar Conexão IA
    </Button>
  )
}
