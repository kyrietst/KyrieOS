from dotenv import load_dotenv
import os
import sys

# Add current directory to path so we can import modules
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# Load env vars
load_dotenv()

# Hack: Bypass CrewAI's OpenAI validation
if "OPENAI_API_KEY" not in os.environ:
    os.environ["OPENAI_API_KEY"] = "NA"

def debug_print(msg):
    print(f"DEBUG: {msg}")

def test_crew():
    debug_print("Iniciando teste de isolamento do ReportCrew...")
    
    # Check Key
    key = os.getenv("GOOGLE_API_KEY")
    if not key:
        debug_print("❌ ERRO: GOOGLE_API_KEY não encontrada no ambiente (.env).")
        return

    debug_print(f"Chave Google encontrada: {key[:5]}...{key[-3:]}")

    # RAW API CHECK
    import requests
    debug_print("🔎 Verificando API Google via HTTP raw...")
    model = "gemini-1.5-flash"
    url = f"https://generativelanguage.googleapis.com/v1beta/models/{model}?key={key}"
    try:
        r = requests.get(url)
        debug_print(f"Status Code: {r.status_code}")
        if r.status_code != 200:
             debug_print(f"Resposta RAW: {r.text}")
        else:
             debug_print("✅ API Key válida e Modelo encontrado!")
    except Exception as e:
        debug_print(f"Erro na requisição RAW: {e}")
    
    try:
        debug_print("Importando ReportCrew...")
        from agents.report_crew import ReportCrew
        
        debug_print("Instanciando Crew...")
        crew_instance = ReportCrew()
        
        debug_print("Criando objeto Crew (agents + tasks)...")
        crew = crew_instance.crew()

        # TESTE SIMPLES DE LLM
        debug_print("⚡ Testando conexão LLM direta...")
        response = crew_instance.gemini_llm.invoke("Say Hello")
        debug_print(f"⚡ Resposta LLM direta: {response.content}")
        
        debug_print("Executando kickoff (Simulando request)...")
        inputs = {'topic': 'Quais projetos estão ativos no banco?'}
        
        result = crew.kickoff(inputs=inputs)
        
        debug_print("✅ SUCESSO! Resultado:")
        print(result)
        
    except Exception as e:
        debug_print(f"❌ ERRO CRÍTICO DURANTE EXECUÇÃO: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    test_crew()
