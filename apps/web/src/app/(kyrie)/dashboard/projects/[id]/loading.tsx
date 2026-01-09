import { Skeleton } from "../../../../../components/ui/skeleton"

export default function Loading() {
  return (
    <div className="space-y-6 animate-pulse">
       {/* Header Skeleton */}
       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
          <div className="space-y-2">
             <Skeleton className="h-8 w-64 bg-zinc-800" />
             <div className="flex items-center gap-2">
                <Skeleton className="h-5 w-24 bg-zinc-800 rounded-full" />
                <Skeleton className="h-4 w-48 bg-zinc-800" />
             </div>
          </div>
          <Skeleton className="h-10 w-32 bg-zinc-800" />
       </div>

       {/* Kanban Board Skeleton */}
       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-12rem)] min-h-[500px]">
          {Array.from({ length: 3 }).map((_, i) => (
             <div key={i} className="flex flex-col h-full bg-zinc-900/50 rounded-xl border border-zinc-800/50">
                <div className="p-4 border-b border-zinc-800/50">
                   <Skeleton className="h-5 w-32 bg-zinc-800" />
                </div>
                <div className="p-3 space-y-3">
                   <Skeleton className="h-24 w-full bg-zinc-800/50 rounded-lg" />
                   <Skeleton className="h-24 w-full bg-zinc-800/50 rounded-lg" />
                   <Skeleton className="h-24 w-full bg-zinc-800/50 rounded-lg" />
                </div>
             </div>
          ))}
       </div>
    </div>
  )
}
