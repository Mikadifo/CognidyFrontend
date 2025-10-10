"use client";

import { Button } from "@/app/components/Button";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { Note } from "../models/Note";

interface FileUploadProps {
  setNotes: Dispatch<SetStateAction<Note[]>>;
}

export default function FileUpload({ setNotes }: FileUploadProps) {
  const [fileName, setFileName] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!fileName) {
      return alert("Please select a file");
    }

    const formData = new FormData();
    formData.append("file", fileName);

    setIsUploading(true);
    setNotes((prev) => [...prev, { id: prev.length, source: fileName }]); // This will come from the API

    try {
      //TODO:CALL API HERE
      console.log("FILE UPLOADED!");
      setFileName("");
    } catch (error) {
      console.error("Erorr while uploading the file:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <form
      className="flex flex-col gap-4 font-nunito text-base w-full"
      onSubmit={handleSubmit}
    >
      <div className="flex gap-4 items-center">
        <input
          id="file-upload"
          type="file"
          className="hidden"
          onChange={(e) => {
            if (e.target.files?.[0]) {
              setFileName(e.target.files[0].name);
            }
          }}
        />
        <label
          htmlFor="file-upload"
          className="rounded-lg bg-dark-08 px-4 py-2 cursor-pointer whitespace-nowrap hover:opacity-80"
        >
          Choose File
        </label>
        <span className="text-dark-88">{fileName || "No file chosen"}</span>
      </div>

      <Button className="w-full" type="submit" disabled={!fileName}>
        {isUploading ? "Uploading..." : "Upload new note"}
      </Button>
    </form>
  );
}
