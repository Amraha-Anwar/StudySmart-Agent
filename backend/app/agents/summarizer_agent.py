import os
from pydantic import BaseModel
from agents import Agent, Runner
from agents.models.openai_chatcompletions import OpenAIChatCompletionsModel
from openai import AsyncOpenAI 
from dotenv import load_dotenv

from ..agents.agent_schema import SummarizerInput, SummarizerOutput

load_dotenv()

gemini_api_key = os.getenv("GEMINI_API_KEY")
gemini_base_url = os.getenv("Base_URL")


external_client = AsyncOpenAI(
    api_key=gemini_api_key,
    base_url=gemini_base_url if gemini_base_url else None
)

configured_model = OpenAIChatCompletionsModel(
    model = 'gemini-2.5-flash',
    openai_client = external_client
)

# Define the summarization agent instance
summarizer_agent_instance = Agent(
    name="PDF Summarizer",
    instructions=(
        "You are an AI assistant specialized in summarizing text from PDFs. "
        "Your task is to provide concise and clean summarized notes based on the input text. "
        "Do not include any introductory or concluding remarks, just the summary itself."
    ),
    output_type=SummarizerOutput,
    model=configured_model, # Pass the configured model instance
)

async def run_summarizer_agent(input: SummarizerInput) -> SummarizerOutput:
    """
    Runs the summarizer agent to summarize the provided PDF text.

    Args:
        input (SummarizerInput): An object containing the PDF text to summarize.

    Returns:
        SummarizerOutput: An object containing the clean summarized notes.
    """
    try:
        result = await Runner.run(summarizer_agent_instance, input.pdf_text)
        
        # The final_output_as will parse the result into our SummarizerOutput Pydantic model
        summary_output = result.final_output_as(SummarizerOutput)
        return summary_output
    except Exception as e:
        print(f"Error in summarizer agent: {e}")
        # Return an error message within the summary field due to simplified schema
        return SummarizerOutput(summary=f"Error generating summary: {e}")