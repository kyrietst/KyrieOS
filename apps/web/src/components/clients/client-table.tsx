'use client'

import React from 'react'
import { 
  ColumnDef, 
  flexRender, 
  getCoreRowModel, 
  useReactTable, 
  getPaginationRowModel, 
  SortingState, 
  getSortedRowModel, 
  ColumnFiltersState, 
  getFilteredRowModel
} from '@tanstack/react-table'
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  MoreHorizontal, 
  ArrowUpDown, 
  Search,
  Users
} from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

export type Client = {
  id: string
  name: string
  status: 'active' | 'inactive' | 'churned'
  monthly_fee: number
  roi_multiple: number
  logo_url?: string | null
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

export const columns: ColumnDef<Client>[] = [
  {
    accessorKey: 'name',
    header: 'Cliente',
    cell: ({ row }) => {
      const client = row.original
      return (
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9 border border-zinc-800">
            <AvatarImage src={client.logo_url || ''} alt={client.name} />
            <AvatarFallback className="bg-zinc-800 text-zinc-300 font-medium">
              {getInitials(client.name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium text-zinc-200">{client.name}</span>
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status') as string
      return (
        <Badge
          variant="outline"
          className={cn(
            "capitalize border-0",
            status === 'active' && "bg-emerald-500/10 text-emerald-500",
            status === 'inactive' && "bg-zinc-500/10 text-zinc-500",
            status === 'churned' && "bg-red-500/10 text-red-500"
          )}
        >
          {status}
        </Badge>
      )
    },
  },
  {
    accessorKey: 'monthly_fee',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="p-0 hover:bg-transparent text-zinc-400"
        >
          Mensalidade
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return <div className="font-medium text-zinc-300">{formatCurrency(row.getValue('monthly_fee'))}</div>
    },
  },
  {
    accessorKey: 'roi_multiple',
    header: 'ROI Atual',
    cell: ({ row }) => {
      return (
        <Badge variant="secondary" className="bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 border-0">
          {row.getValue('roi_multiple')}x
        </Badge>
      )
    },
  },
  {
    id: 'actions',
    cell: () => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 text-zinc-400 hover:text-white">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-zinc-900 border-zinc-800 text-zinc-300">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuItem className="focus:bg-zinc-800 focus:text-white cursor-pointer">
              Editar Cliente
            </DropdownMenuItem>
            <DropdownMenuItem className="focus:bg-zinc-800 focus:text-red-400 text-red-500 cursor-pointer">
              Remover
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

interface ClientTableProps {
  data: Client[]
  isLoading?: boolean
}

export function ClientTable({ data, isLoading }: ClientTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
  })

  if (!isLoading && data.length === 0) {
     return (
        <div className="flex flex-col items-center justify-center py-16 text-center border border-dashed border-zinc-800 rounded-lg bg-zinc-900/30">
            <div className="h-12 w-12 rounded-full bg-zinc-800/50 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-zinc-500" />
            </div>
            <h3 className="text-lg font-medium text-zinc-200">Sem clientes</h3>
            <p className="text-sm text-zinc-500 max-w-sm mt-2 mb-6">
                Você ainda não tem clientes cadastrados na plataforma. Adicione o primeiro para começar a gerenciar.
            </p>
        </div>
     )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="relative max-w-sm w-full">
           <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" />
           <Input
            placeholder="Filtrar clientes..."
            value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
            onChange={(event) =>
                table.getColumn('name')?.setFilterValue(event.target.value)
            }
            className="pl-9 bg-zinc-900 border-zinc-800 focus-visible:ring-purple-500 text-zinc-200 h-9"
            />
        </div>
      </div>
      
      <div className="rounded-md border border-zinc-800 bg-zinc-900/30 overflow-hidden">
        <Table>
          <TableHeader className="bg-zinc-900/50">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border-b border-zinc-800 hover:bg-transparent">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="text-zinc-400 font-medium h-10">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className="border-b border-zinc-800 hover:bg-zinc-800/30 transition-colors"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-3">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-zinc-500"
                >
                  Nenhum resultado encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-zinc-500">
          {table.getFilteredSelectedRowModel().rows.length} de{' '}
          {table.getFilteredRowModel().rows.length} linha(s) selecionada(s).
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="border-zinc-800 text-zinc-400 hover:bg-zinc-800 hover:text-white"
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="border-zinc-800 text-zinc-400 hover:bg-zinc-800 hover:text-white"
          >
            Próximo
          </Button>
        </div>
      </div>
    </div>
  )
}


