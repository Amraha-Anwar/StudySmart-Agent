from fastapi import FastAPI, UploadFile, File, HTTPException, status
from pydantic import BaseModel
from typing import Optional
import os
import shutil
import tempfile
from fastapi.middleware.cors import CORSMiddleware

from .utils.pdf_reader import extract_text_from_pdf
from .agents.summarizer_agent import run_summarizer_agent
from .agents.quiz_agent import run_quiz_agent
from .agents.agent_schema import SummarizerInput, SummarizerOutput, QuizInput, QuizOutput

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    # ALLOW ALL ORIGINS (easier for initial setup).
    # In a strict production environment, replace ["*"] with your actual frontend URL.
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Temporary directory for uploaded PDFs
# In serverless environments like Vercel, only /tmp is writable
UPLOAD_DIR = tempfile.gettempdir()

@app.post("/upload-pdf/")
async def upload_pdf(file: UploadFile = File(...)):
    if not file.filename.endswith(".pdf"):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Only PDF files are allowed."
        )
    
    # Use a unique filename or just the original filename in the temp dir
    file_path = os.path.join(UPLOAD_DIR, f"temp_{file.filename}")
    try:
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        
        extracted_text = extract_text_from_pdf(file_path)
        return {"filename": file.filename, "extracted_text": extracted_text}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error processing PDF: {e}"
        )
    finally:
        # Clean up the temporary file
        if os.path.exists(file_path):
            os.remove(file_path)

@app.post("/summarize/", response_model=SummarizerOutput)
async def summarize_text(input: SummarizerInput):
    summary_output = await run_summarizer_agent(input)
    if summary_output.summary.startswith("Error:"):
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=summary_output.summary
        )
    return summary_output

@app.post("/generate-quiz/", response_model=QuizOutput)
async def generate_quiz(input: QuizInput):
    quiz_output = await run_quiz_agent(input)
    if not quiz_output.quiz: # If the quiz list is empty, assume an error occurred
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to generate quiz. Please try again or check the input text."
        )
    return quiz_output

@app.get("/")
async def root():
    return {"message": "Welcome to StudySmart Agent Backend"}

