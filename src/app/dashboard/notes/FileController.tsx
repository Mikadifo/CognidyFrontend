"use client";

import React, { FC, useEffect, useState } from "react";

import FileUpload from "@/app/components/FileUpload";
import { Note } from "@/app/models/Note";
import { NoteItems } from "@/app/components/NoteItems";

async function getNotes() {
  //TODO: change this to get from DB based on the user, if user is guess then look in local storage
  return new Promise<{ id: number; source: string }[]>((resolve) =>
    setTimeout(
      () =>
        resolve([
          { id: 0, source: "settlement.from.client.5126.in.case.45.pdf" },
          { id: 1, source: "Book 1(1).pdf" },
          { id: 2, source: "DF_ASKD_UED_changed_2393.txt" },
          { id: 3, source: "README.md" },
        ]),
      500,
    ),
  );
}

export const FileController: FC = ({}) => {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    async function fetchNotes() {
      //TODO: fetch here
      const data = await getNotes();
      setNotes(data);
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
