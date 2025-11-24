"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { QuizQuestion } from "@/lib/types";
import { QuizCard } from "@/components/quiz-card";
import { PdfUpload } from "@/components/pdf-upload";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";



export default function QuizPage() {
  const router = useRouter();
  const [extractedText, setExtractedText] = useState<string | null>(null);
  const [quiz, setQuiz] = useState<QuizQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
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
      const response = await fetch("http://localhost:8000/upload-pdf/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to upload PDF.");
      }

      const data = await response.json();
      const text = data.extracted_text;
      localStorage.setItem("extractedText", text);
      setExtractedText(text);
      
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
      const response = await fetch("http://localhost:8000/generate-quiz/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pdf_text: text,
          question_count: 10, // Default to 10 questions
          quiz_type: "mixed", // Default to mixed quiz type
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
      if (selectedAnswers[index] && selectedAnswers[index].toLowerCase() === q.answer.toLowerCase()) {
        score++;
      }
    });
    return score;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] p-4">
      {loading && (
        <div className="text-center text-neon-cyan py-8">Loading...</div> // Replace with a spinner later
      )}
      {error && (
        <div className="text-center text-red-500 py-8">{error}</div>
      )}
      
      {!loading && !error && !extractedText && (
        <div className="flex flex-col items-center w-full max-w-lg space-y-6">
            <p className="text-xl text-neon-cyan font-semibold text-center">
                Upload a PDF to generate a quiz
            </p>
            <PdfUpload 
                onFileUpload={handleFileUpload} 
                loading={uploading} 
                error={null} 
                buttonLabel="Generate Quiz"
            />
        </div>
      )}

      {!loading && !error && extractedText && quiz.length > 0 && (
        <>
          <QuizCard
            quiz={quiz}
            selectedAnswers={selectedAnswers}
            onAnswerChange={handleAnswerChange}
          />
          <Button
            onClick={handleSubmitQuiz}
            disabled={loading}
            className="relative overflow-hidden group w-full mt-6 bg-transparent hover:bg-transparent text-neon-cyan border-2 border-neon-cyan rounded-lg px-6 py-3 text-lg transition-all duration-300"
          >
            <span className="relative z-10">Submit Quiz</span>
            <span className="absolute inset-0 bg-neon-cyan opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
            <span className="absolute inset-0 -top-full bg-gradient-to-br from-neon-cyan to-neon-purple opacity-0 group-hover:top-0 group-hover:opacity-30 transition-all duration-500"></span>
          </Button>
        </>
      )}    </div>
  );
}
