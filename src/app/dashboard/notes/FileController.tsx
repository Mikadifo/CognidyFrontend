"use client";

import React, { FC, useEffect } from "react";

import FileUpload from "@/app/components/FileUpload";
import { Note } from "@/app/models/Note";
import { NoteItems } from "@/app/components/NoteItems";
import { api } from "@/app/utils/apiFetch";
import { useApi } from "@/app/hooks/useApi";
import { NoteItemsSkeleton } from "@/app/skeletons/NoteItemsSkeleton";

export const FileController: FC = () => {
  const {
    submit: getNotes,
    loading,
    error,
    data: notes,
    setData: setNotes,
  } = useApi<Note[], []>(api.fetchNotes);

  useEffect(() => {
    getNotes();
  }, [getNotes]);

  if (error) {
    return error;
  }

  return (
    <>
      {loading ? (
        <NoteItemsSkeleton />
      ) : (
        <NoteItems notes={notes || []} setNotes={setNotes} />
      )}

      {notes && notes.length < 5 && <FileUpload setNotes={setNotes} />}
    </>
  );
};
