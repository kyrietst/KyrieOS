import { createClient } from '@/lib/supabase/server'
import { ProjectGrid, Project } from '@/components/projects/project-grid'

export default async function ProjectsPage() {
  const supabase = createClient()
  
  // Fetch Projects with Organization data
  const { data: projects, error } = await supabase
    .from('projects')
    .select(`
      *,
      organizations (
        name,
        logo_url
      )
    `)
    .order('created_at', { ascending: false })

  // Fetch Organizations for filter
  const { data: organizations } = await supabase
    .from('organizations')
    .select('id, name')
    .eq('status', 'active')
    .order('name')

  if (error) {
    console.error('Error fetching projects:', error)
  }

  // Cast types if needed, or rely on inference if types are good. 
  // Given we know the structure, we can cast to Project[] (defined in ProjectGrid)
  const formattedProjects = (projects as unknown as Project[]) || []
  const formattedOrgs = (organizations as {id: string, name: string}[]) || []

  return (
    <div className="h-full flex-1 flex-col space-y-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white focus:outline-none">Projetos</h2>
          <p className="text-zinc-400">
            Acompanhe o progresso de todos os projetos ativos.
          </p>
        </div>
      </div>
      
      <ProjectGrid initialProjects={formattedProjects} organizations={formattedOrgs} />
    </div>
  )
}
