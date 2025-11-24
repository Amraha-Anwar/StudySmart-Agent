import os
import json
from pydantic import ValidationError
from agents import Agent, Runner
from agents.models.openai_chatcompletions import OpenAIChatCompletionsModel
from openai import AsyncOpenAI
from dotenv import load_dotenv

from ..agents.agent_schema import QuizInput, QuizOutput, QuizQuestion

load_dotenv()

gemini_api_key = os.getenv("GEMINI_API_KEY")
gemini_base_url = os.getenv("Base_URL")

external_client = AsyncOpenAI(
    api_key=gemini_api_key,
    base_url=gemini_base_url
)

configured_model = OpenAIChatCompletionsModel(
    model = 'gemini-2.5-flash',
    openai_client = external_client
)

# Define the quiz generation agent
quiz_agent_instance = Agent(
    name="Quiz Generator",
    instructions=(
        "You are an AI assistant specialized in generating quizzes (multiple-choice or mixed) from text. "
        "Your task is to create quiz questions based on the provided text, adhering to the specified format "
        "and quantity. Ensure the questions are relevant to the text and answers are accurate. "
        "Format the output as a JSON object with a single key 'quiz' which contains a list of question objects."
    ),
    output_type=QuizOutput,
    model=configured_model, # Pass the configured model instance
)

async def run_quiz_agent(input: QuizInput) -> QuizOutput:
    """
    Runs the quiz generator agent to create quiz questions from the provided PDF text.

    Args:
        input (QuizInput): An object containing the PDF text, question count, and quiz type.

    Returns:
        QuizOutput: An object containing a list of generated quiz questions.
    """
    quiz_type_instructions = {
        "mcq": (
            "Generate multiple-choice questions (MCQ). For each question, provide 4 options (A, B, C, D) "
            "and clearly indicate the correct answer. The options should be distinct and plausible."
        ),
        "mixed": (
            "Generate a mix of question types, including multiple-choice questions (MCQ) with 4 options, "
            "true/false questions, and short answer questions. For MCQs, clearly indicate the correct answer. "
            "For true/false, state 'True' or 'False' as the answer. For short answer, provide the concise correct answer."
        )
    }

    # Construct the prompt for the agent
    prompt_content = (
        f"Generate a quiz based on the following text. "
        f"{quiz_type_instructions.get(input.quiz_type, quiz_type_instructions['mixed'])}\n"
        f"Generate exactly {input.question_count} questions.\n"
        "Each question object must have 'question' (string), 'options' (list of strings for MCQs, null otherwise), "
        "and 'answer' (string) fields. For MCQs, the 'options' list should contain 4 strings (e.g., 'A. Option 1', 'B. Option 2', etc.). "
        "Example MCQ format: {{'question': 'What is X?', 'options': ['A. Opt1', 'B. Opt2', 'C. Opt3', 'D. Opt4'], 'answer': 'B'}}\n"
        "Example True/False format: {{'question': 'Is X true?', 'options': null, 'answer': 'True'}}\n"
        "Example Short Answer format: {{'question': 'Define X.', 'options': null, 'answer': 'A concise definition'}}\n\n"
        f"Text to generate quiz from:\n{input.pdf_text}"
    )
    

    try:
        # Run the agent with the constructed prompt
        result = await Runner.run(quiz_agent_instance, prompt_content)
        
        # The final_output_as will parse the result into our QuizOutput Pydantic model
        quiz_output = result.final_output_as(QuizOutput)
        return quiz_output
    except Exception as e:
        print(f"Error in quiz agent: {e}")
        # Return an empty list of quizzes in case of error
        return QuizOutput(quiz=[])