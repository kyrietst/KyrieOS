import os
from dotenv import load_dotenv
from crewai import Agent, Task, Crew, Process
from langchain_groq import ChatGroq

# Load environment variables
load_dotenv()

# Hack: Bypass CrewAI's OpenAI validation
if "OPENAI_API_KEY" not in os.environ:
    os.environ["OPENAI_API_KEY"] = "NA"

class ReportAgent:
    def run(self, topic: str):
        # 0. Setup LLM (Groq)
        # Using llama3-70b-8192 for high quality logical reasoning
        groq_llm = ChatGroq(
            temperature=0,
            model_name="llama3-70b-8192",
            api_key=os.getenv("GROQ_API_KEY")
        )

        # 1. Define Agent
        reporter = Agent(
            role='Analista Sênior',
            goal='Criar relatórios executivos detalhados',
            backstory="Você é um consultor especialista capaz de resumir dados complexos de projetos em propostas de valor claras. Você escreve em um tom profissional e envolvente.",
            verbose=True,
            allow_delegation=False,
            llm=groq_llm
        )

        # 2. Define Task
        report_task = Task(
            description=f"Gere um parágrafo abrangente resumindo o seguinte tópico: {topic}. Foque nas principais conquistas, ROI e próximos passos.",
            agent=reporter,
            expected_output="Um único parágrafo detalhado adequado para um resumo executivo (em Português)."
        )

        # 3. Instantiate Crew
        crew = Crew(
            agents=[reporter],
            tasks=[report_task],
            verbose=True,
            process=Process.sequential
        )

        # 4. Kickoff
        result = crew.kickoff()
        return str(result)
