from dotenv import load_dotenv
import os

# Load env variables FIRST, before other imports that might need them
load_dotenv()

# Debug: Print loaded status (masked)
url = os.getenv("SUPABASE_URL")
key = os.getenv("SUPABASE_SERVICE_ROLE_KEY") or os.getenv("SUPABASE_KEY")
print(f"DEBUG: SUPABASE_URL presente? {'Sim' if url else 'Não'}")
print(f"DEBUG: SUPABASE_KEY presente? {'Sim' if key else 'Não'}")

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from supabase import create_client, Client

SUPABASE_URL = url
SUPABASE_KEY = key

supabase = None
if SUPABASE_URL and SUPABASE_KEY:
    try:
        supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
        print("✅ Supabase Client initialized successfully.")
    except Exception as e:
        print(f"❌ Failed to initialize Supabase client: {e}")
else:
    print("❌ CRITICAL: Missing Supabase credentials. Backend will run in limited mode.")

# Dummy client to prevent crashes if initialization failed
if not supabase:
    class DummyClient:
        def table(self, *args): raise Exception("Supabase not initialized")
    supabase = DummyClient()

app = FastAPI(title="Kyrie OS API", version="1.0.0")

# CORS Configuration
# Allow all origins for MVP dev speed, restrict in prod if needed
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"status": "ok", "message": "Kyrie OS API is running 🚀"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}

class ReportRequest(BaseModel):
    topic: str

@app.post("/api/generate-report")
def generate_report(request: ReportRequest):
    print(f"🚀 [DEBUG] Iniciando geração do relatório para: {request.topic}")
    try:
        print("🚀 [DEBUG] Importando ReportCrew...")
        from agents.report_crew import ReportCrew
        
        # Inputs for the variables in YAML ({topic})
        inputs = {
            'topic': request.topic
        }
        
        print("🚀 [DEBUG] Instanciando ReportCrew()...")
        crew_instance = ReportCrew()
        
        print("🚀 [DEBUG] Criando crew object (.crew())...")
        crew = crew_instance.crew()
        
        print("🚀 [DEBUG] Executando kickoff()... (Isso pode demorar)")
        result = crew.kickoff(inputs=inputs)
        
        print(f"✅ [DEBUG] Kickoff concluído! Tipo retorno: {type(result)}")
        print(f"✅ [DEBUG] Resultado parcial: {str(result)[:100]}...")
        final_report = str(result)
        
        # PERSISTENCE: Save to Supabase
        data = {
            "topic": request.topic,
            "content": final_report
        }
        supabase.table("reports").insert(data).execute()
        
        return {"report": final_report}
    except Exception as e:
        import traceback
        if "429" in str(e):
             print("\n⚠️  ERRO DE COTA (429): O modelo atual atingiu o limite gratuito.")
             print("👉 SUGESTÃO: Aguarde 1 minuto ou troque a chave de API.\n")
        
        print("❌ Error generating report:")
        traceback.print_exc()
        return {"status": "error", "message": str(e)}

@app.get("/api/reports")
def get_reports():
    try:
        # Fetch reports from Supabase, ordered by newest first
        response = supabase.table("reports").select("*").order("created_at", desc=True).execute()
        return response.data
    except Exception as e:
        return {"status": "error", "message": str(e)}
