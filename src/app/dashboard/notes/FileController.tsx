"use client";

import React, { FC, useEffect, useState } from "react";

import FileUpload from "@/app/components/FileUpload";
import { Note } from "@/app/models/Note";
import { NoteItems } from "@/app/components/NoteItems";
import { AUTH_TOKEN, BASE_API } from "@/app/constants";

export const FileController: FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    async function fetchNotes() {
      // TODO: This will change once the user auth persistence is done, it will also check if the user is guest, then it will fetch from localStorage instead
      const response = await fetch(`${BASE_API}/notes/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: AUTH_TOKEN, // TODO: use login token instead and also check for guest user, need auth hook
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
