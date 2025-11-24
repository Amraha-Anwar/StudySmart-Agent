# StudySmart Agent - Backend

This directory contains the backend for the StudySmart Agent application. It is a FastAPI application that provides API endpoints for PDF text extraction, summarization, and quiz generation.

## Getting Started

### Prerequisites

- Python 3.10+
- `uv` (recommended for Python environment management)

### Installation and Running

1.  Create and activate a virtual environment:
    ```bash
    uv venv
    source .venv/bin/activate  # On Windows use `.venv\Scripts\activate`
    ```
2.  Install the required packages:
    ```bash
    uv pip install -r requirements.txt
    ```
3.  Create a `.env` file in this directory and add your `GEMINI_API_KEY`:
    ```
    GEMINI_API_KEY="your_api_key_here"
    ```
4.  Start the FastAPI server:
    ```bash
    uvicorn app.main:app --reload
    ```
    The server will be running at `http://localhost:8000`.

## API Endpoints

The following endpoints are available:

- `POST /upload-pdf/`
  - **Description:** Uploads a PDF file and returns the extracted text.
  - **Request Body:** `multipart/form-data` with a file field named `file`.
  - **Response:** A JSON object with the extracted text: `{"extracted_text": "..."}`.

- `POST /summarize/`
  - **Description:** Takes a string of text and returns a summary.
  - **Request Body:** A JSON object with the text: `{"pdf_text": "..."}`.
  - **Response:** A JSON object with the summary: `{"summary": "..."}`.

- `POST /generate-quiz/`
  - **Description:** Generates a quiz from the provided text.
  - **Request Body:** A JSON object with the text, question count, and quiz type:
    ```json
    {
      "pdf_text": "...",
      "question_count": 10,
      "quiz_type": "mixed" // "mcq" or "mixed"
    }
    ```
  - **Response:** A JSON object with the quiz: `{"quiz": [...]}`.
