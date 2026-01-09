'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Loader2, Plus } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from '@/components/ui/sheet'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'O nome deve ter pelo menos 2 caracteres.',
  }),
  monthly_fee: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
     message: 'Insira um valor válido.'
  }),
  status: z.enum(['active', 'inactive', 'churned']),
})

export function NewClientSheet() {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      monthly_fee: '',
      status: 'active',
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    const supabase = createClient()
    
    try {
        const { error } = await supabase.from('organizations').insert({
            name: values.name,
            monthly_fee: Number(values.monthly_fee),
            status: values.status,
            roi_multiple: 0, // Inicia zerado
        })

        if (error) throw error

        toast.success(`Cliente ${values.name} criado com sucesso!`)
        setOpen(false)
        form.reset()
        router.refresh() // Recarrega a página para atualizar a tabela
    } catch (error) {
        console.error(error)
        toast.error('Erro ao criar cliente. Tente novamente.')
    } finally {
        setIsLoading(false)
    }
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button className="bg-white text-black hover:bg-zinc-200">
            <Plus className="mr-2 h-4 w-4" /> Novo Cliente
        </Button>
      </SheetTrigger>
      <SheetContent className="bg-zinc-950 border-l-zinc-800 text-zinc-100 sm:max-w-[425px]">
        <SheetHeader>
          <SheetTitle className="text-white">Novo Cliente</SheetTitle>
          <SheetDescription className="text-zinc-400">
            Adicione um novo cliente à sua carteira. Preencha os dados básicos abaixo.
          </SheetDescription>
        </SheetHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-zinc-300">Nome da Empresa</FormLabel>
                  <FormControl>
                    <Input placeholder="Acme Corp" {...field} className="bg-zinc-900 border-zinc-800 focus-visible:ring-purple-500" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="monthly_fee"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-zinc-300">Mensalidade (R$)</FormLabel>
                  <FormControl>
                    <Input placeholder="1500.00" type="number" {...field} className="bg-zinc-900 border-zinc-800 focus-visible:ring-purple-500" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-zinc-300">Status Inicial</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-zinc-900 border-zinc-800 text-zinc-200 focus:ring-purple-500">
                        <SelectValue placeholder="Selecione o status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-zinc-900 border-zinc-800 text-zinc-200">
                      <SelectItem value="active">Active (Ativo)</SelectItem>
                      <SelectItem value="inactive">Inactive (Inativo)</SelectItem>
                      <SelectItem value="churned">Churned (Cancelado)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <SheetFooter className="mt-8">
               <SheetClose asChild>
                 <Button variant="outline" type="button" className="border-zinc-800 text-zinc-400 hover:bg-zinc-900 hover:text-white mr-2">Cancelar</Button>
               </SheetClose>
               <Button type="submit" disabled={isLoading} className="bg-purple-600 hover:bg-purple-700 text-white">
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Criar Cliente
               </Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}
