
📘 GEMINI.md
STUDYSMART-AGENT
🧩 Project Summary

StudySmart-Agent is an AI-powered learning tool that helps students study smarter by:

Extracting text from uploaded PDFs.

Summarizing the notes cleanly.

Generating quizzes (MCQs or mixed) directly from the original PDF text.

The project uses:

Frontend: Next.js, TypeScript, Shadcn UI

Backend: Python, FastAPI, OpenAI Agents SDK

PDF Processing: PyPDF

Agent Execution: Gemini CLI

Tool Provider: Context7 MCP (already connected)

This specification ensures simple logic, clean schema, and predictable agent behavior.

🎯 Core Requirements
✔ PDF Summarizer

User uploads a PDF.

Backend extracts its text using PyPDF.

Summarizer Agent receives structured input:

{ "pdf_text": "full extracted text" }


Returns:

{ "summary": "clean summarized notes" }

✔ Quiz Generator

Uses original extracted text, not summary.

Input to Quiz Agent:

{
  "pdf_text": "full text",
  "question_count": 10,
  "quiz_type": "mcq" | "mixed"
}


Returns:

{
  "quiz": [
    {
      "question": "...",
      "options": ["A","B","C","D"],
      "answer": "A"
    }
  ]
}

🏗 Tech Stack
Frontend

Next.js 15+ (App Router)

TypeScript
tailwind css
Shadcn UI

Neon/Glassy Dark Mode Theme

Smooth modern animations

Backend

FastAPI

Python 3.10+

uv

OpenAI Agents SDK (simple, official patterns)

PyPDF

MCP

Context7 MCP is already connected

Gemini CLI automatically loads all MCP tools

Focus strictly on integrating the agent with Gemini and Context7 MCP for PDF summarization and quiz generation.

No "Hallucinated" Features: Only implement what the task specifies.

API Configuration:

Use the OpenAI Agents SDK Python Library configured for Gemini.

Base URL: https://generativelanguage.googleapis.com/v1beta/openai/

API Key: Load GEMINI_API_KEY from environment variables.

Model: Use OpenaiChatCompletionModel adapted for Gemini.

SDK Specificity: You are using openai-agents SDK. This is NOT the standard openai library.

🎨 UI / UX Requirements (Very Important)
🔥 Build a fully interactive, modern, dark-mode UI

Requirements:

1. Navbar (Glass + Neon)

A glassy translucent navbar at the top.

On the top-left corner:
→ Write the website name “StudySmart Agent”
→ Beautiful modern font (semi-bold, glowing effect)

On the top-right corner:
→ Buttons: PDF Summarizer, Quiz Generator
→ Add hover animations (scale + glow)

Navbar fixed at top, slight blur effect.

2. Hero Section (Center of Screen)

A beautiful neon-glow heading in center:
“Study Smarter, Not Harder.”

Sub-heading:
“Upload your notes → Get clean summaries → Generate smart quizzes.”

Smooth fade-in animations.

Dark mode background with:

subtle gradient

neon accents

maybe particles or glowing blobs for interactive feel

3. Color Palette (Recommended)

Deep dark background: #0A0A0F

Neon Cyan: #00F5FF

Neon Purple: #A966FF

Glass White: rgba(255, 255, 255, 0.1)

4. UI Cards

Summaries and quizzes shown inside:

Glassmorphic cards

Soft glowing borders

Smooth transitions

5. Buttons & Components

Use Shadcn UI base components

Add custom neon/glass styles

Hover: glow + slight scale

Buttons should feel “alive”

6. Dark Mode Only

No light mode

Everything should be modern, futuristic, and minimal

Fonts slightly rounded, soft glow titles

📂 Clean Folder Structure
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



🌐 Frontend Flow (Next.js)
Homepage (/)

Neon-glass hero section

Big heading + subheading

Buttons:

“Upload PDF”

“Generate Quiz”

Animated scroll cues

/upload

PDF dropzone

Sends file → FastAPI extract endpoint

Stores extracted text

Redirect to /summary

/summary

Show summary in glass card

“Create Quiz” button

/quiz

Show list of questions

Options highlighted on click

Clean, readable, dark mode card UI