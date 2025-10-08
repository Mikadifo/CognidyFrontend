"use client";

import React, { FC, useEffect, useState } from "react";

import FileUpload from "@/app/components/FileUpload";
import { Note } from "@/app/models/Note";
import { NoteItems } from "@/app/components/NoteItems";
import { BASE_API } from "@/app/constants";

export const FileController: FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    async function fetchNotes() {
      // TODO: This will change once the user auth persistence is done, it will also check if the user is guest, then it will fetch from localStorage instead
      const response = await fetch(`${BASE_API}/notes/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTc1OTg4OTk0NCwianRpIjoiZGY2NWQ5ODYtOWU0Yi00ZGQ2LWJmNmQtZDY1ZjUyNGQzZTlmIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6ImFkbWluIiwibmJmIjoxNzU5ODg5OTQ0LCJjc3JmIjoiMTM0ODA5OTItN2UyNS00N2Q3LTkzMmYtMmI3YmJkNmQwMWI5IiwiZXhwIjoxNzYxMTg1OTQ0fQ.LtGHpw4aVLezVrL-TK4JYb-SEPez_hwa0qECW6h8Zy8", //TODO: temp token for testing
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error || "Failed to fetch nodes");
      }

      const result = await response.json();
      setNotes(result.data);
    }

    fetchNotes();
  }, []);

  return (
    <>
      <NoteItems notes={notes} setNotes={setNotes} />
      {notes.length < 5 && <FileUpload setNotes={setNotes} />}
    </>
  );
};
