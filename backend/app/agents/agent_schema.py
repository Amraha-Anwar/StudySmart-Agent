from pydantic import BaseModel
from typing import List, Literal

# --- Summarizer Agent Schemas ---

class SummarizerInput(BaseModel):
    pdf_text: str

class SummarizerOutput(BaseModel):
    summary: str

# --- Quiz Generator Agent Schemas ---

class QuizQuestion(BaseModel):
    question: str
    options: List[str]
    answer: str

class QuizInput(BaseModel):
    pdf_text: str
    question_count: int = 10
    quiz_type: Literal["mcq"] = "mcq"

class QuizOutput(BaseModel):
    quiz: List[QuizQuestion]
