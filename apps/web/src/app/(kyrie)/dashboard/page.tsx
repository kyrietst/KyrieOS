import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Activity, CreditCard, DollarSign, Users } from 'lucide-react'

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white mb-1">Visão Geral</h1>
        <p className="text-zinc-400">Bem-vindo de volta ao Kyrie OS.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Metric 1 */}
        <Card className="bg-zinc-900/50 border-zinc-800 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-zinc-400">Receita Total</CardTitle>
            <DollarSign className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 45.231,89</div>
            <p className="text-xs text-zinc-500 mt-1">+20.1% em relação ao mês anterior</p>
          </CardContent>
        </Card>

        {/* Metric 2 */}
        <Card className="bg-zinc-900/50 border-zinc-800 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-zinc-400">Clientes Ativos</CardTitle>
            <Users className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+2350</div>
            <p className="text-xs text-zinc-500 mt-1">+180 novos clientes</p>
          </CardContent>
        </Card>

        {/* Metric 3 */}
        <Card className="bg-zinc-900/50 border-zinc-800 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-zinc-400">Vendas</CardTitle>
            <CreditCard className="h-4 w-4 text-pink-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12,234</div>
            <p className="text-xs text-zinc-500 mt-1">+19% vendas totais</p>
          </CardContent>
        </Card>

        {/* Metric 4 */}
        <Card className="bg-zinc-900/50 border-zinc-800 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-zinc-400">Atividade</CardTitle>
            <Activity className="h-4 w-4 text-emerald-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+573</div>
            <p className="text-xs text-zinc-500 mt-1">+201 nas última hora</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
         <Card className="col-span-4 bg-zinc-900/50 border-zinc-800">
            <CardHeader>
                <CardTitle className="text-white">Relatório Recente</CardTitle>
            </CardHeader>
            <CardContent className="h-[200px] flex items-center justify-center text-zinc-500">
                Chart Placeholder
            </CardContent>
         </Card>
         <Card className="col-span-3 bg-zinc-900/50 border-zinc-800">
            <CardHeader>
                <CardTitle className="text-white">Atividade Recente</CardTitle>
            </CardHeader>
             <CardContent className="h-[200px] flex items-center justify-center text-zinc-500">
                List Placeholder
            </CardContent>
         </Card>
      </div>
    </div>
  )
}
