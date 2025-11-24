"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SummaryCard } from "@/components/summary-card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function SummaryPage() {
  const router = useRouter();
  const [extractedText, setExtractedText] = useState<string | null>(null);
  const [summary, setSummary] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Set backend URL from env variable, fallback to localhost
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  useEffect(() => {
    // Retrieve extracted text from localStorage
    const storedExtractedText = localStorage.getItem("extractedText");
    if (storedExtractedText) {
      setExtractedText(storedExtractedText);
      // Now send it to the backend for summarization
      fetchSummary(storedExtractedText);
    } else {
      setError("No text found to summarize. Please upload a PDF first.");
      setLoading(false);
    }
  }, []);

  const fetchSummary = async (text: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/summarize/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pdf_text: text }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to generate summary.");
      }

      const data = await response.json();
      setSummary(data.summary);
      localStorage.setItem("generatedSummary", data.summary); // Store summary for potential future use
    } catch (err: unknown) {
      setError(
        (err instanceof Error ? err.message : String(err)) ||
          "An unexpected error occurred during summarization."
      );
      console.error("Summarization error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateQuiz = () => {
    // Redirect to quiz generation page
    router.push("/quiz");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] p-4">
      {loading && (
        <div className="text-center text-neon-cyan py-8">Loading...</div>
      )}
      {error && <div className="text-center text-red-500 py-8">{error}</div>}
      {summary && <SummaryCard summary={summary} />}
      {!loading && !error && summary && (
        <Button
          onClick={handleCreateQuiz}
          className="relative overflow-hidden group w-full mt-6 bg-transparent hover:bg-transparent text-neon-cyan border-2 border-neon-cyan rounded-lg px-6 py-3 text-lg transition-all duration-300"
        >
          <span className="relative z-10">Create Quiz</span>
          <span className="absolute inset-0 bg-neon-cyan opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
          <span className="absolute inset-0 -top-full bg-gradient-to-br from-neon-cyan to-neon-purple opacity-0 group-hover:top-0 group-hover:opacity-30 transition-all duration-500"></span>
        </Button>
      )}
    </div>
  );
}
