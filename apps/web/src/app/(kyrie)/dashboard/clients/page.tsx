import { createClient } from '@/lib/supabase/server'
import { ClientTable, Client } from '@/components/clients/client-table'
import { NewClientSheet } from '@/components/clients/new-client-sheet'

export default async function ClientsPage() {
  const supabase = createClient()
  
  const { data: clients, error } = await supabase
    .from('organizations')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching clients:', error)
  }

  return (
    <div className="h-full flex-1 flex-col space-y-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white">Clientes</h2>
          <p className="text-zinc-400">
            Gerencie sua carteira de clientes e acompanhe o ROI.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <NewClientSheet />
        </div>
      </div>
      
      <ClientTable data={(clients as Client[]) || []} />
    </div>
  )
}
