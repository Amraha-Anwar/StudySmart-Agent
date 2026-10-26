"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FileText, FileUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PdfUploadProps {
  onFileUpload: (file: File) => void;
  loading: boolean;
  error: string | null;
  buttonLabel?: string;
}

function formatSize(bytes: number) {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function PdfUpload({ onFileUpload, loading, error, buttonLabel = "Summarize PDF" }: PdfUploadProps) {
  const [file, setFile] = useState<File | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
    multiple: false,
    disabled: loading,
  });

  const rejected = fileRejections.length > 0 && !file;

  return (
    <div className="w-full">
      <div
        {...getRootProps()}
        className={cn(
          "lift flex cursor-pointer flex-col text-ink items-center justify-center rounded-lg border-2 border-dashed px-6 py-12 text-center transition-colors duration-150 sm:py-16",
          isDragActive
            ? "border-pen bg-pen-wash"
            : file
            ? "border-ink/30 bg-sheet"
            : "border-rule bg-sheet hover:border-pen/50 hover:bg-pen-wash/60"
        )}
      >
        <input {...getInputProps()} aria-label="Choose a PDF file" />
        {file ? (
          <>
            <FileText className="size-8 text-pen" strokeWidth={1.5} />
            <p className="mt-4 max-w-full truncate font-semibold">{file.name}</p>
            <p className="mt-1 text-sm text-ink-soft">
              {formatSize(file.size)}. Click or drop another file to replace it.
            </p>
          </>
        ) : (
          <>
            <FileUp className="size-8 text-pen" strokeWidth={1.5} />
            <p className="mt-4 font-semibold">
              {isDragActive ? "Drop to add your PDF" : "Drop a PDF here, or click to browse"}
            </p>
            <p className="mt-1 text-sm text-ink-soft">One file at a time, with selectable text.</p>
          </>
        )}
      </div>

      {rejected && (
        <p role="alert" className="mt-3 rounded-md bg-sheet px-3.5 py-2.5 text-sm font-medium text-margin">
          That file isn&apos;t a PDF. Choose a file ending in .pdf.
        </p>
      )}
      {error && (
        <p role="alert" className="mt-3 rounded-md bg-sheet px-3.5 py-2.5 text-sm font-medium text-margin">
          {error}
        </p>
      )}

      <Button
        onClick={() => file && onFileUpload(file)}
        disabled={!file || loading}
        size="lg"
        className="mt-5 w-full"
      >
        {loading ? "Uploading…" : buttonLabel}
      </Button>
    </div>
  );
}
