import { Skeleton } from "../../../components/ui/skeleton"

export default function Loading() {
  return (
    <div className="space-y-6 animate-pulse">
       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
           <div className="space-y-2">
               <Skeleton className="h-8 w-64 bg-zinc-800" />
               <Skeleton className="h-4 w-48 bg-zinc-800" />
           </div>
           <Skeleton className="h-10 w-32 bg-zinc-800" />
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {Array.from({ length: 3 }).map((_, i) => (
               <Skeleton key={i} className="h-48 w-full rounded-xl bg-zinc-800" />
           ))}
       </div>
    </div>
  )
}
