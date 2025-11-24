# StudySmart Agent

StudySmart Agent is an AI-powered learning tool that helps students study smarter by extracting text from uploaded PDFs, summarizing the notes, and generating quizzes directly from the original PDF text.

## Features

- **PDF Text Extraction:** Upload a PDF and have its text extracted for further processing.
- **Automated Summarization:** Get clean and concise summaries of your notes.
- **Smart Quiz Generation:** Generate quizzes from the extracted text to test your knowledge.
- **Multiple Quiz Types:** The quiz generator supports multiple-choice questions (MCQs), true/false questions, and short answer questions.

## Tech Stack

- **Frontend:**
  - Next.js (App Router)
  - TypeScript
  - Tailwind CSS
  - Shadcn UI
  - Framer Motion
- **Backend:**
  - Python
  - FastAPI
  - OpenAI Agents SDK
  - PyPDF
- **AI Model:** Gemini

## Folder Structure

```
studysmart-agent/
│
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── agents/
│   │   │   ├── summarizer_agent.py
│   │   │   ├── quiz_agent.py
│   │   │   ├── agent_schema.py
│   │   ├── utils/
│   │   │   ├── pdf_reader.py
│   │   └── __init__.py
│   ├── requirements.txt
│
├── frontend/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx            # Hero page
│   │   ├── upload/page.tsx
│   │   ├── summary/page.tsx
│   │   ├── quiz/page.tsx
│   └── components/
│       ├── navbar.tsx
│       ├── ui/
│       ├── pdf-upload.tsx
│       ├── summary-card.tsx
│       ├── quiz-card.tsx
│
├── GEMINI.md
└── README.md
```

## Getting Started

### Prerequisites

- Node.js and npm (or yarn)
- Python 3.10+
- `uv` (recommended for Python environment management)

### Installation and Running

**Backend:**

1.  Navigate to the `backend` directory:
    ```bash
    cd backend
    ```
2.  Create and activate a virtual environment:
    ```bash
    uv venv
    source .venv/bin/activate  # On Windows use `.venv\Scripts\activate`
    ```
3.  Install the required packages:
    ```bash
    uv pip install -r requirements.txt
    ```
4.  Create a `.env` file and add your `GEMINI_API_KEY`.
5.  Start the FastAPI server:
    ```bash
    uvicorn app.main:app --reload
    ```

**Frontend:**

1.  Navigate to the `frontend` directory:
    ```bash
    cd frontend
    ```
2.  Install the dependencies:
    ```bash
    npm install
    ```
3.  Start the Next.js development server:
    ```bash
    npm run dev
    ```

## API Endpoints

- `POST /upload-pdf/`: Upload a PDF file and get the extracted text.
- `POST /summarize/`: Get a summary of the provided text.
- `POST /generate-quiz/`: Generate a quiz from the provided text.

## Quiz Types

The quiz generator supports the following question types:

- **Multiple Choice (MCQ):** Questions with a set of options where you choose the correct one.
- **True/False:** Questions that you answer with either "True" or "False".
- **Short Answer:** Questions that require a brief written answer.

The application will dynamically render the appropriate input field for each question type.

## Screenshots

![UI](/frontend/public/images/ui.png)
