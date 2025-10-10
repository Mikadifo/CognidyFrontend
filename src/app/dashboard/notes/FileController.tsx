"use client";

import React, { FC, useEffect } from "react";

import FileUpload from "@/app/components/FileUpload";
import { Note } from "@/app/models/Note";
import { NoteItems } from "@/app/components/NoteItems";
import { api } from "@/app/utils/apiFetch";
import { useApi } from "@/app/hooks/useApi";

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
  }, []);

  if (loading) {
    return "Loading...";
  }

  if (error) {
    return error;
  }

  return (
    <>
      <NoteItems notes={notes || []} setNotes={setNotes} />
      {notes && notes.length < 5 && <FileUpload setNotes={setNotes} />}
    </>
  );
};
