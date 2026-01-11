from crewai.tools import BaseTool
import os
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv()

class SupabaseSearchTool(BaseTool):
    name: str = "Supabase Search Tool"
    description: str = "Search for projects and tasks in the database. Useful to get real data about the user's workload. Input should be a search query string or 'all' to list everything."

    def _run(self, query: str) -> str:
        # Force reload env vars to be sure
        load_dotenv()
        try:
            url = os.getenv("SUPABASE_URL")
            key = os.getenv("SUPABASE_SERVICE_ROLE_KEY") or os.getenv("SUPABASE_KEY")
            
            if not url or not key:
                print("❌ AI Tool Error: Credentials missing")
                return "Error: Supabase credentials not found."

            supabase: Client = create_client(url, key)
            
            print(f"\n🔍 [TOOL DEBUG] SupabaseSearchTool acionada com query: '{query}'")
            
            # If query is generic, fetch active projects
            if query.lower() in ['all', 'tudo', 'todos', 'lista', 'projetos', 'active']:
                response = supabase.table("projects").select("id, name, status, deadline").eq("status", "active").execute()
            else:
                # Search by name similarity
                response = supabase.table("projects").select("id, name, status, deadline").ilike("name", f"%{query}%").execute()
            
            if not response.data:
                print("🔍 AI Tool Access: No projects found.")
                return "No projects found matching your criteria."
            
            count = len(response.data)
            print(f"✅ [TOOL DEBUG] Sucesso. Encontrados {count} resultados.")
                
            return f"Found Projects: {str(response.data)}"
        except Exception as e:
            return f"Error searching projects: {str(e)}"
