# StudySmart-Agent Project Specification

## Project Summary
StudySmart-Agent is an AI-powered learning tool designed to help students study smarter by:
- Extracting text from uploaded PDFs.
- Summarizing the extracted text into clean notes.
- Generating quizzes (Multiple Choice Questions or mixed types) directly from the original PDF text.

The project leverages the following technologies:
- **Frontend**: Next.js, TypeScript, Shadcn UI
- **Backend**: Python, FastAPI, OpenAI Agents SDK
- **PDF Processing**: PyPDF
- **Agent Execution**: Gemini CLI
- **Tool Provider**: Context7 MCP (already connected)

This specification focuses on ensuring simple logic, clean schema, and predictable agent behavior.

## Core Requirements

### PDF Summarizer
- User uploads a PDF.
- Backend extracts its text using PyPDF.
- The Summarizer Agent receives structured input:
  ```json
  {
    "pdf_text": "full extracted text"
  }
  ```
- Returns:
  ```json
  {
    "summary": "clean summarized notes"
  }
  ```

### Quiz Generator
- Uses original extracted text, not summary.
- Input to Quiz Agent:
  ```json
  {
    "pdf_text": "full text",
    "question_count": 10,
    "quiz_type": "mcq" | "mixed"
  }
  ```
- Returns:
  ```json
  {
    "quiz": [
      {
        "question": "...",
        "options": ["A","B","C","D"],
        "answer": "A"
      }
    ]
  }
  ```

## Tech Stack

### Frontend
- Next.js 15+ (App Router)
- TypeScript
- Tailwind CSS
- Shadcn UI
- Neon/Glassy Dark Mode Theme
- Smooth modern animations

### Backend
- FastAPI
- Python 3.10+
- `uv` (package installer)
- OpenAI Agents SDK (simple, official patterns)
- PyPDF
- MCP (Model-Context Protocol)

### API Configuration
- Use the OpenAI Agents SDK Python Library configured for Gemini.
- Base URL: `https://generativelanguage.googleapis.com/v1beta/openai/`
- API Key: Load `GEMINI_API_KEY` from environment variables.
- Model: Use `OpenaiChatCompletionModel` adapted for Gemini.
- **Note**: This project uses the `openai-agents` SDK, which is distinct from the standard `openai` library.

## UI / UX Requirements (Very Important)
The application requires a fully interactive, modern, dark-mode UI with the following features:

### 1. Navbar (Glass + Neon)
- A glassy translucent navbar fixed at the top, with a slight blur effect.
- **Top-left**: Website name “StudySmart Agent” in a beautiful modern font (semi-bold, glowing effect).
- **Top-right**: Buttons for "PDF Summarizer" and "Quiz Generator" with hover animations (scale + glow).

### 2. Hero Section (Center of Screen)
- A beautiful neon-glow heading in the center: “Study Smarter, Not Harder.”
- Sub-heading: “Upload your notes → Get clean summaries → Generate smart quizzes.”
- Smooth fade-in animations.
- Dark mode background with subtle gradient, neon accents, and optional interactive particles or glowing blobs.

### 3. Color Palette (Recommended)
- Deep dark background: `#0A0A0F`
- Neon Cyan: `#00F5FF`
- Neon Purple: `#A966FF`
- Glass White: `rgba(255, 255, 255, 0.1)`

### 4. UI Cards
- Summaries and quizzes displayed inside glassmorphic cards with soft glowing borders and smooth transitions.

### 5. Buttons & Components
- Utilize Shadcn UI base components.
- Apply custom neon/glass styles.
- Hover effects: glow + slight scale, making buttons feel “alive”.

### 6. Dark Mode Only
- No light mode is required.
- The overall aesthetic should be modern, futuristic, and minimal.
- Fonts should be slightly rounded with soft glow titles.

## Clean Folder Structure
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
│   │   ├── result/page.tsx     # Newly added result page
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

## Frontend Flow (Next.js)

### Homepage (`/`)
- Neon-glass hero section.
- Big heading + subheading.
- Buttons: "Upload PDF", "Generate Quiz".
- Animated scroll cues.

### Upload Page (`/upload`)
- PDF dropzone.
- Sends file → FastAPI extract endpoint.
- Stores extracted text (e.g., in localStorage).
- Redirects to `/summary`.

### Summary Page (`/summary`)
- Shows summary in a glass card.
- "Create Quiz" button.

### Quiz Page (`/quiz`)
- Shows a list of questions.
- Answers are locked after selection, and feedback (correct/incorrect) is provided.
- If no PDF is uploaded, provides an option to upload directly.

### Result Page (`/result`)
- Displays quiz score and total questions.
- Provides encouraging words or quotes.
- Offers navigation back to Home or to start a New Quiz.