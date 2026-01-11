from crewai import Agent, Crew, Process, Task
from crewai.project import CrewBase, agent, crew, task
from langchain_google_genai import ChatGoogleGenerativeAI
import os
from dotenv import load_dotenv

load_dotenv()

@CrewBase
class ReportCrew:
    """ReportCrew crew"""
    agents_config = '../config/agents.yaml'
    tasks_config = '../config/tasks.yaml'

    def __init__(self):
        # Hack: Bypass CrewAI's OpenAI validation if key is missing
        if "OPENAI_API_KEY" not in os.environ:
             os.environ["OPENAI_API_KEY"] = "NA"

        # Gemini 1.5 Flash (Stable Free Tier)
        self.gemini_llm = ChatGoogleGenerativeAI(
            model="gemini-1.5-flash",
            verbose=True,
            temperature=0.5,
            google_api_key=os.getenv("GOOGLE_API_KEY")
        )

    @agent
    def reporting_analyst(self) -> Agent:
        from tools.supabase_search_tool import SupabaseSearchTool
        
        return Agent(
            config=self.agents_config['reporting_analyst'],
            verbose=True,
            llm=self.gemini_llm,
            tools=[SupabaseSearchTool()]
        )

    @task
    def generate_report_task(self) -> Task:
        return Task(
            config=self.tasks_config['generate_report_task'],
        )

    @crew
    def crew(self) -> Crew:
        """Creates the ReportCrew crew"""
        return Crew(
            agents=self.agents, # Automatically created by the @agent decorator
            tasks=self.tasks,   # Automatically created by the @task decorator
            process=Process.sequential,
            verbose=True,
        )
