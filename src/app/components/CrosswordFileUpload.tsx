"use client";

import { useState } from "react";
import { CrosswordPuzzle } from "@/app/models/Crossword";

interface CrosswordFileUploadProps {
  onPuzzleGenerated: (puzzle: CrosswordPuzzle) => void;
}

export function CrosswordFileUpload({
  onPuzzleGenerated,
}: CrosswordFileUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState<string>("");

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    // Validate file type
    const allowedTypes = ["text/plain", "application/pdf"];
    if (!allowedTypes.includes(selectedFile.type)) {
      setStatus("Only .txt and .pdf files are allowed");
      return;
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024;
    if (selectedFile.size > maxSize) {
      setStatus("File size must be less than 5MB");
      return;
    }

    setFile(selectedFile);
    setStatus("");
  };

  // Update CrosswordFileUpload.tsx handleUpload function:
  const handleUpload = async () => {
    if (!file) {
      setStatus("Please select a file first");
      return;
    }

    setUploading(true);
    setStatus("Generating crossword puzzle...");

    try {
      const formData = new FormData();
      formData.append("file", file);

      console.log(
        "Calling:",
        `${process.env.NEXT_PUBLIC_API_URL}/api/crosswords/generate`,
      );

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/crosswords/generate`,
        {
          method: "POST",
          body: formData,
        },
      );

      console.log("Response status:", response.status);
      console.log("Response headers:", response.headers);

      // Check what content type we got back
      const contentType = response.headers.get("content-type");
      console.log("Content-Type:", contentType);

      // Get response text first to see what we actually received
      const responseText = await response.text();
      console.log("Raw response:", responseText);

      // Try to parse as JSON only if it looks like JSON
      if (contentType && contentType.includes("application/json")) {
        const result = JSON.parse(responseText);

        if (result.success) {
          setStatus("Crossword puzzle generated successfully!");
          sessionStorage.setItem(
            `crossword_${result.puzzle.metadata.puzzleID}`,
            JSON.stringify(result.puzzle),
          );
          onPuzzleGenerated(result.puzzle);

          // Clear form
          setFile(null);
          (document.getElementById("fileInput") as HTMLInputElement).value = "";
        } else {
          setStatus(`Failed to generate crossword: ${result.error}`);
        }
      } else {
        // Server returned non-JSON (probably an error page)
        setStatus(
          `Server error: Received ${contentType} instead of JSON. Check console for details.`,
        );
      }
    } catch (error) {
      console.error("Upload error:", error);
      setStatus(
        `Network error: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Create Crossword Puzzle
      </h2>
      <p className="text-gray-600 mb-6 text-center">
        Upload your study notes and we&apos;ll generate a crossword puzzle to
        help you learn!
      </p>

      <div className="mb-4">
        <label
          htmlFor="fileInput"
          className="block mb-2 font-medium text-gray-700"
        >
          Choose your notes file (.txt or .pdf):
        </label>
        <input
          id="fileInput"
          type="file"
          accept=".txt,.pdf"
          onChange={handleFileSelect}
          disabled={uploading}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 disabled:opacity-50"
        />
      </div>

      {file && (
        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <p>
            <strong>Selected:</strong> {file.name}
          </p>
          <p>
            <strong>Size:</strong> {(file.size / 1024).toFixed(2)} KB
          </p>
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={!file || uploading}
        className="w-full px-4 py-3 bg-blue-500 text-white rounded-lg font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors"
      >
        {uploading ? "Generating Crossword..." : "Generate Crossword Puzzle"}
      </button>

      {status && (
        <div
          className={`mt-4 p-3 rounded-lg text-center ${
            status.includes("success")
              ? "bg-green-100 text-green-700"
              : status.includes("Generating")
                ? "bg-blue-100 text-blue-700"
                : "bg-red-100 text-red-700"
          }`}
        >
          {status}
        </div>
      )}
    </div>
  );
}

