from crewai import Agent, Crew, Process, Task, LLM
from crewai.project import CrewBase, agent, crew, task
import os
from dotenv import load_dotenv

load_dotenv()

@CrewBase
class ReportCrew:
    """ReportCrew crew"""
    agents_config = '../config/agents.yaml'
    tasks_config = '../config/tasks.yaml'

    def __init__(self):
        # Llama 3.3 70B (Groq) - High Intelligence
        self.llama_llm = LLM(
            model="groq/llama-3.3-70b-versatile",
            api_key=os.getenv("GROQ_API_KEY")
        )

        # Kimi (Groq) - Future Use
        # self.kimi_llm = LLM(model="groq/moonshotai/kimi-k2-instruct-0905", api_key=os.getenv("GROQ_API_KEY"))

    @agent
    def report_agent(self) -> Agent:
        from tools.supabase_search_tool import ProjectQueueTool
        
        return Agent(
            config=self.agents_config['report_agent'],
            verbose=True,
            llm=self.llama_llm,
            tools=[ProjectQueueTool()]
        )

    @task
    def report_task(self) -> Task:
        return Task(
            config=self.tasks_config['report_task'],
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
