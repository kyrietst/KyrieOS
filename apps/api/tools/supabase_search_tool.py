from crewai_tools import BaseTool
import os
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv()

class ProjectQueueTool(BaseTool):
    name: str = "Get Project Queue"
    description: str = "Fetches the list of active projects and their details. Use this to understand what remains to be done."

    def _run(self) -> str:
        # Force reload env vars to be sure
        load_dotenv()
        try:
            url = os.getenv("SUPABASE_URL")
            key = os.getenv("SUPABASE_SERVICE_ROLE_KEY") or os.getenv("SUPABASE_KEY")
            
            if not url or not key:
                print("❌ AI Tool Error: Credentials missing")
                return "Error: Supabase credentials not found."

            supabase: Client = create_client(url, key)
            
            print(f"🔍 AI Tool Access: Fetching active projects...")
            
            # Fetch active projects - checking specific fields for efficiency
            response = supabase.table("projects").select("id, name, status, deadline").eq("status", "active").execute()
            
            if not response.data:
                print("🔍 AI Tool Access: No active projects found.")
                return "No active projects found."
            
            count = len(response.data)
            print(f"🔍 AI Tool Access: Found {count} active projects.")
                
            return f"Active Projects: {str(response.data)}"
        except Exception as e:
            return f"Error fetching projects: {str(e)}"
