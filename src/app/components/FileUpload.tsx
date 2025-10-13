"use client";

import { Button } from "@/app/components/Button";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { Note } from "../models/Note";
import { useApi } from "../hooks/useApi";
import { api } from "../utils/apiFetch";

interface FileUploadProps {
  setNotes: Dispatch<SetStateAction<Note[]>>;
}

export default function FileUpload({ setNotes }: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const {
    loading,
    submit: uploadNote,
    error,
  } = useApi<Note, [formData: FormData]>(api.uploadNoteAuth);

  // TODO: Handle guest user, done once we have custom auth hook
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!file) {
      return alert("Please select a file");
    }

    const formData = new FormData();
    formData.append("file", file);

    const response = await uploadNote(formData);

    if (response.error) {
      console.error(response.error);
      return;
    }

    const newNote = response.data;
    if (!newNote) {
      console.error("No note returned from API");
      return;
    }

    setNotes((prev) => [...prev, newNote]);
    setFile(null);
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
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.files && e.target.files.length > 0) {
              setFile(e.target.files[0]);
            } else {
              setFile(null);
            }
          }}
        />
        <label
          htmlFor="file-upload"
          className="rounded-lg bg-dark-08 px-4 py-2 cursor-pointer whitespace-nowrap hover:opacity-80"
        >
          Choose File
        </label>
        <span className="text-dark-88">
          {file ? file.name : "No file chosen"}
        </span>
      </div>

      <Button className="w-full" type="submit" disabled={!file}>
        {loading ? "Uploading..." : "Upload new note"}
      </Button>

      <span className="text-red" hidden={!error}>
        File already submitted
      </span>
    </form>
  );
}
