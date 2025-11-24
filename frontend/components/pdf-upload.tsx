"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"; // Assuming Label is used for accessibility
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface PdfUploadProps {
  onFileUpload: (file: File) => void;
  loading: boolean;
  error: string | null;
}

export function PdfUpload({ onFileUpload, loading, error }: PdfUploadProps) {
  const [file, setFile] = useState<File | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
    multiple: false,
  });

  return (
    <Card className="w-full max-w-lg bg-glass-white border-neon-cyan shadow-neon-cyan/50 shadow-lg text-neon-cyan">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-center text-neon-cyan text-neon-glow-cyan">Upload Your PDF</CardTitle>
        <CardDescription className="text-center text-gray-300">
          Drag and drop your PDF here, or click to select a file.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div
          {...getRootProps()}
          className="flex flex-col items-center justify-center p-10 border-2 border-dashed rounded-lg cursor-pointer bg-gray-800/20 hover:bg-gray-700/20 transition-colors duration-200"
          style={{ borderColor: isDragActive ? 'var(--neon-purple)' : 'var(--neon-cyan)' }}
        >
          <Input {...getInputProps()} />
          {isDragActive ? (
            <p className="text-neon-purple text-lg">Drop the files here ...</p>
          ) : (
            <p className="text-neon-cyan text-lg">
              {file ? `Selected file: ${file.name}` : "Drag 'n' drop a PDF here, or click to select one"}
            </p>
          )}
        </div>

        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

        <Button
          onClick={() => file && onFileUpload(file)}
          disabled={!file || loading}
          className="relative overflow-hidden group w-full mt-6 bg-transparent hover:bg-transparent text-neon-purple border-2 border-neon-purple rounded-lg px-6 py-3 text-lg transition-all duration-300"
        >
          <span className="relative z-10">{loading ? "Uploading..." : "Summarize PDF"}</span>
          <span className="absolute inset-0 bg-neon-purple opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
          <span className="absolute inset-0 -top-full bg-gradient-to-br from-neon-purple to-neon-cyan opacity-0 group-hover:top-0 group-hover:opacity-30 transition-all duration-500"></span>
        </Button>
      </CardContent>
    </Card>
  );
}
