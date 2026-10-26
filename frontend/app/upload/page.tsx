"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PdfUpload } from "@/components/pdf-upload";

export default function UploadPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = async (file: File) => {
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/upload-pdf/`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to upload PDF.");
      }

      const data = await response.json();
      localStorage.setItem("extractedText", data.extracted_text);
      localStorage.setItem("pdfName", data.filename ?? file.name);
      router.push("/summary");
    } catch (err: unknown) {
      setError((err instanceof Error ? err.message : String(err)) || "An unexpected error occurred during upload.");
      console.error("Upload error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-xl px-4 pb-24 pt-12 sm:px-6 sm:pt-16">
      <h1 className="glow-text pb-1 text-4xl font-extrabold tracking-[-0.03em] sm:text-5xl">Summarize a PDF</h1>
      <p className="mt-4 text-lg leading-relaxed text-on-page-soft">
        Add your lecture notes, slides or a reading. You&apos;ll get a summary first, and can make a quiz from
        the same file afterwards.
      </p>
      <div className="mt-10">
        <PdfUpload onFileUpload={handleFileUpload} loading={loading} error={error} />
      </div>
    </div>
  );
}
