'use client'

import React, { useEffect, useState } from 'react'
import { api } from '@/lib/api'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import ReactMarkdown from 'react-markdown'
import { Loader2, Calendar, FileText } from 'lucide-react'
import { format } from 'date-fns'

interface Report {
  id: string
  topic: string
  content: string
  created_at: string
}

export default function ReportsPage() {
  const [reports, setReports] = useState<Report[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedReport, setSelectedReport] = useState<Report | null>(null)

  useEffect(() => {
    fetchReports()
  }, [])

  const fetchReports = async () => {
    try {
      const data = await api.getReports()
      setReports(data)
    } catch (error) {
      console.error('Failed to fetch reports:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex h-full flex-col gap-6 p-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Meus Relatórios</h1>
        <p className="text-muted-foreground">Histórico de consultorias geradas pela IA.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
        {/* List of Reports */}
        <Card className="md:col-span-1 h-full flex flex-col bg-white border-0 shadow-sm">
          <CardHeader className="pb-3 border-b">
            <CardTitle className="text-lg">Histórico</CardTitle>
          </CardHeader>
          <CardContent className="p-0 flex-1 overflow-hidden">
            <ScrollArea className="h-full">
              {isLoading ? (
                <div className="flex justify-center p-8">
                  <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
                </div>
              ) : reports.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-8 text-center text-gray-500 gap-2">
                  <FileText className="h-8 w-8 opacity-20" />
                  <p className="text-sm">Nenhum relatório encontrado.</p>
                </div>
              ) : (
                <div className="flex flex-col divide-y">
                  {reports.map((report) => (
                    <button
                      key={report.id}
                      onClick={() => setSelectedReport(report)}
                      className={`flex flex-col gap-1 p-4 text-left transition-colors hover:bg-gray-50 ${
                        selectedReport?.id === report.id ? 'bg-purple-50 border-l-4 border-purple-500' : ''
                      }`}
                    >
                      <span className="font-medium text-gray-900 truncate w-full">
                        {report.topic || 'Relatório sem título'}
                      </span>
                      <div className="flex items-center text-xs text-gray-500 gap-1.5">
                        <Calendar className="h-3 w-3" />
                        {format(new Date(report.created_at), 'dd/MM/yyyy HH:mm')}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Report Content */}
        <Card className="md:col-span-2 h-full flex flex-col bg-white border-0 shadow-sm overflow-hidden">
          {selectedReport ? (
            <>
              <CardHeader className="pb-4 border-b bg-gray-50/50">
                <div className="flex flex-col gap-1">
                  <CardTitle className="text-xl text-gray-900">{selectedReport.topic}</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                     Gerado em {format(new Date(selectedReport.created_at), "dd 'de' MMMM 'às' HH:mm")}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="flex-1 overflow-hidden p-0">
                 <ScrollArea className="h-full p-6">
                    <div className="prose prose-purple max-w-none text-gray-700">
                      <ReactMarkdown>{selectedReport.content}</ReactMarkdown>
                    </div>
                 </ScrollArea>
              </CardContent>
            </>
          ) : (
            <div className="flex h-full flex-col items-center justify-center text-gray-400 gap-3">
              <FileText className="h-12 w-12 opacity-10" />
              <p>Selecione um relatório para visualizar</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
