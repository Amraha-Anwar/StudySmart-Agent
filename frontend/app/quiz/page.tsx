"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { QuizQuestion, resolveAnswer } from "@/lib/types";
import { QuizCard } from "@/components/quiz-card";
import { PdfUpload } from "@/components/pdf-upload";
import { Working } from "@/components/working";
import { Button } from "@/components/ui/button";

export default function QuizPage() {
  const router = useRouter();
  const [extractedText, setExtractedText] = useState<string | null>(null);
  const [pdfName, setPdfName] = useState<string | null>(null);
  const [quiz, setQuiz] = useState<QuizQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [uploading, setUploading] = useState(false);

  // Set backend URL from env variable, fallback to localhost
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  useEffect(() => {
    setPdfName(localStorage.getItem("pdfName"));
    // Retrieve extracted text from localStorage
    const storedExtractedText = localStorage.getItem("extractedText");
    if (storedExtractedText) {
      setExtractedText(storedExtractedText);
      fetchQuiz(storedExtractedText);
    } else {
      // No text found, so we will show the upload component
      setLoading(false);
    }
  }, []);

  const handleFileUpload = async (file: File) => {
    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`${API_URL}/upload-pdf/`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to upload PDF.");
      }

      const data = await response.json();
      const text = data.extracted_text;
      const name = data.filename ?? file.name;
      localStorage.setItem("extractedText", text);
      localStorage.setItem("pdfName", name);
      setExtractedText(text);
      setPdfName(name);

      // After upload, generate quiz directly
      await fetchQuiz(text);
    } catch (err: unknown) {
      setError((err instanceof Error ? err.message : String(err)) || "An unexpected error occurred during upload.");
      console.error("Upload error:", err);
      setLoading(false); // Ensure loading is false so error shows
    } finally {
      setUploading(false);
    }
  };

  const fetchQuiz = async (text: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/generate-quiz/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pdf_text: text,
          question_count: 10, // Default to 10 questions
          quiz_type: "mcq", // Multiple-choice only
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to generate quiz.");
      }

      const data = await response.json();
      setQuiz(data.quiz);
    } catch (err: unknown) {
      setError((err instanceof Error ? err.message : String(err)) || "An unexpected error occurred during quiz generation.");
      console.error("Quiz generation error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerChange = (questionIndex: number, value: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionIndex]: value,
    }));
  };

  const handleSubmitQuiz = () => {
    const score = calculateScore();
    router.push(`/result?score=${score}&total=${quiz.length}`);
  };

  const calculateScore = () => {
    let score = 0;
    quiz.forEach((q, index) => {
      if (selectedAnswers[index] === resolveAnswer(q)) {
        score++;
      }
    });
    return score;
  };

  const answered = Object.keys(selectedAnswers).length;
  const showQuiz = !loading && !error && extractedText && quiz.length > 0;

  return (
    <div className="mx-auto max-w-3xl px-4 pb-24 pt-12 sm:px-6 sm:pt-16">
      <header className="mb-8">
        <h1 className="glow-text pb-1 text-4xl font-extrabold tracking-[-0.03em] sm:text-5xl">
          {showQuiz ? `${quiz.length} questions` : "Make a quiz"}
        </h1>
        {showQuiz && pdfName && <p className="mt-3 truncate text-on-page-soft">From {pdfName}</p>}
        {!loading && !error && !extractedText && (
          <p className="mt-4 text-lg leading-relaxed text-on-page-soft">
            Upload a PDF and you&apos;ll get ten multiple-choice questions written from its text.
          </p>
        )}
      </header>

      {loading && (
        <Working
          title="Writing your quiz"
          detail="This usually takes 20 to 40 seconds. Questions come from the full text of your PDF."
        />
      )}

      {error && (
        <div role="alert" className="lift rounded-lg border-l-4 border-margin bg-sheet p-6 text-ink sm:p-8">
          <p className="font-semibold text-margin">The quiz couldn&apos;t be made.</p>
          <p className="mt-1 text-ink-soft">{error}</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            {extractedText && <Button onClick={() => fetchQuiz(extractedText)}>Try again</Button>}
            <Button asChild variant="outline">
              <Link href="/upload">Upload a different PDF</Link>
            </Button>
          </div>
        </div>
      )}

      {!loading && !error && !extractedText && (
        <PdfUpload onFileUpload={handleFileUpload} loading={uploading} error={null} buttonLabel="Make quiz" />
      )}

      {showQuiz && (
        <>
          <div className="sticky top-16 z-30 -mx-4 mb-6 border-b border-white/10 bg-paper/80 px-4 py-3 backdrop-blur-sm sm:mx-0 sm:rounded-md sm:border sm:border-white/10 sm:px-4">
            <div className="flex items-center justify-between text-sm">
              <span className="font-semibold tabular-nums">
                {answered} of {quiz.length} answered
              </span>
              <span className="hidden text-on-page-soft sm:inline">Answers lock once you choose</span>
            </div>
            <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/15">
              <div
                className="h-full rounded-full bg-parrot shadow-[0_0_12px_rgba(116,214,76,0.9)] transition-[width] duration-300"
                style={{ width: `${(answered / quiz.length) * 100}%` }}
              />
            </div>
          </div>

          <QuizCard quiz={quiz} selectedAnswers={selectedAnswers} onAnswerChange={handleAnswerChange} />

          <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <Button onClick={handleSubmitQuiz} disabled={loading} size="lg" className="w-full sm:w-auto">
              See my score
            </Button>
            {answered < quiz.length && (
              <span className="text-sm text-on-page-soft">
                {quiz.length - answered} unanswered {quiz.length - answered === 1 ? "question counts" : "questions count"} as wrong.
              </span>
            )}
          </div>
        </>
      )}
    </div>
  );
}
