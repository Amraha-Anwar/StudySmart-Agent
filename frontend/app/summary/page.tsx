"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SummaryCard } from "@/components/summary-card";
import { Working } from "@/components/working";
import { Button } from "@/components/ui/button";

export default function SummaryPage() {
  const router = useRouter();
  const [summary, setSummary] = useState<string | null>(null);
  const [pdfName, setPdfName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Set backend URL from env variable, fallback to localhost
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  useEffect(() => {
    setPdfName(localStorage.getItem("pdfName"));
    // Retrieve extracted text from localStorage
    const storedExtractedText = localStorage.getItem("extractedText");
    if (storedExtractedText) {
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
    <div className="mx-auto max-w-4xl px-4 pb-24 pt-12 sm:px-6 sm:pt-16">
      <header className="mb-8">
        <h1 className="glow-text pb-1 text-4xl font-extrabold tracking-[-0.03em] sm:text-5xl">Summary</h1>
        {pdfName && <p className="mt-3 truncate text-on-page-soft">From {pdfName}</p>}
      </header>

      {loading && (
        <Working
          title="Summarizing your PDF"
          detail="This usually takes 10 to 30 seconds. Longer documents can take up to a minute."
        />
      )}

      {error && (
        <div role="alert" className="lift rounded-lg border-l-4 border-margin bg-sheet p-6 text-ink sm:p-8">
          <p className="font-semibold text-margin">The summary couldn&apos;t be made.</p>
          <p className="mt-1 text-ink-soft">{error}</p>
          <Button asChild variant="outline" className="mt-6">
            <Link href="/upload">Upload a PDF</Link>
          </Button>
        </div>
      )}

      {summary && <SummaryCard summary={summary} />}

      {!loading && !error && summary && (
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button onClick={handleCreateQuiz} size="lg">
            Make a quiz from this PDF
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/upload">Summarize a different PDF</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
