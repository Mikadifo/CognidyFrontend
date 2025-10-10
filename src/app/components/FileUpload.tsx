"use client";

import { Button } from "@/app/components/Button";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { Note } from "../models/Note";
import { AUTH_TOKEN, BASE_API } from "../constants";

interface FileUploadProps {
  setNotes: Dispatch<SetStateAction<Note[]>>;
}

export default function FileUpload({ setNotes }: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // TODO: Handle guest user, done once we have custom auth hook
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!file) {
      return alert("Please select a file");
    }

    setIsUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    fetch(`${BASE_API}/notes/upload/auth`, {
      method: "POST",
      headers: {
        Authorization: AUTH_TOKEN, // TODO: use login token instead and also check for guest user, need auth hook
      },
      body: formData,
    })
      .then(async (res) => {
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || "Failed to upload note");
        }

        return res.json();
      })
      .then((res) => {
        console.log(res);
        setFile(null);
        setNotes((prev) => [...prev, res.data]);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setIsUploading(false));
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
        {isUploading ? "Uploading..." : "Upload new note"}
      </Button>
    </form>
  );
}
