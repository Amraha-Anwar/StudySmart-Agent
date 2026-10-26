import os
import re
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
        "You are an AI assistant specialized in generating multiple-choice quizzes from text. "
        "Your task is to create quiz questions based on the provided text, adhering to the specified format "
        "and quantity. Ensure the questions are relevant to the text and answers are accurate. "
        "Format the output as a JSON object with a single key 'quiz' which contains a list of question objects."
    ),
    output_type=QuizOutput,
    model=configured_model, # Pass the configured model instance
)

def _strip_letter(text: str) -> str:
    """Removes a leading 'A. ' / 'B) ' style label and normalizes case/whitespace."""
    return re.sub(r"^\s*[A-Da-d]\s*[.)]\s*", "", text).strip().lower()

def _match_answer_to_option(answer: str, options: list[str]) -> str | None:
    """Returns the option that the model's answer refers to, or None if nothing matches."""
    normalized = answer.strip().lower()
    for option in options:
        if option.strip().lower() == normalized:
            return option
    # Answer given as just a letter, e.g. 'B' or 'B.'
    letter = re.fullmatch(r"([a-d])\s*[.)]?", normalized)
    if letter:
        index = ord(letter.group(1)) - ord("a")
        if index < len(options):
            return options[index]
    # Answer given as option text without (or with a different) letter prefix
    for option in options:
        if _strip_letter(option) == _strip_letter(answer):
            return option
    return None

async def run_quiz_agent(input: QuizInput) -> QuizOutput:
    """
    Runs the quiz generator agent to create quiz questions from the provided PDF text.

    Args:
        input (QuizInput): An object containing the PDF text, question count, and quiz type.

    Returns:
        QuizOutput: An object containing a list of generated quiz questions.
    """
    # Construct the prompt for the agent
    prompt_content = (
        "Generate a multiple-choice quiz based on the following text.\n"
        f"Generate exactly {input.question_count} questions.\n"
        "Each question object must have 'question' (string), 'options' (list of exactly 4 distinct, plausible strings, "
        "prefixed 'A. ', 'B. ', 'C. ', 'D. '), and 'answer' (string) fields. "
        "The 'answer' must be copied exactly, character for character, from the correct entry in 'options'.\n"
        "Example: {'question': 'What is X?', 'options': ['A. Opt1', 'B. Opt2', 'C. Opt3', 'D. Opt4'], 'answer': 'B. Opt2'}\n\n"
        f"Text to generate quiz from:\n{input.pdf_text}"
    )

    try:
        # Run the agent with the constructed prompt
        result = await Runner.run(quiz_agent_instance, prompt_content)

        # The final_output_as will parse the result into our QuizOutput Pydantic model
        quiz_output = result.final_output_as(QuizOutput)

        # Make every answer an exact option string so the frontend can compare directly,
        # and drop any question whose answer can't be matched to an option
        questions = []
        for q in quiz_output.quiz:
            answer = _match_answer_to_option(q.answer, q.options)
            if answer is not None:
                questions.append(QuizQuestion(question=q.question, options=q.options, answer=answer))
        return QuizOutput(quiz=questions)
    except Exception as e:
        print(f"Error in quiz agent: {e}")
        # Return an empty list of quizzes in case of error
        return QuizOutput(quiz=[])