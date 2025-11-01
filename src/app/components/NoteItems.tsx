"use client";

import React, { Dispatch, FC, SetStateAction, useRef, useState } from "react";
import { IconButton } from "@/app/components/IconButton";
import { Note } from "../models/Note";
import DeleteIcon from "@/app/assets/icons/trashcan.svg";
import PdfIcon from "@/app/assets/icons/pdf.svg";
import MdIcon from "@/app/assets/icons/markdown.svg";
import TxtIcon from "@/app/assets/icons/textNotes.svg";
import { useApi } from "../hooks/useApi";
import { api } from "../utils/apiFetch";
import ConfirmationDialog from "./ConfirmationDialog";

interface NoteItemsProps {
  notes: Note[];
  setNotes: Dispatch<SetStateAction<Note[]>>;
}

function getIconFromSource(source: string) {
  const extension = source.split(".").pop();

  switch (extension) {
    case "pdf":
      return <PdfIcon className="size-4" />;
    case "md":
      return <MdIcon className="size-4" />;
    case "txt":
      return <TxtIcon className="size-4" />;

    default:
      // TODO: change this to a default undefined icon
      <span>X</span>;
  }
}

export const NoteItems: FC<NoteItemsProps> = ({ notes, setNotes }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [deletingNoteId, setDeletingNoteId] = useState<string | null>(null);
  const { submit: deleteNote, error } = useApi<void, [id: string]>(
    api.deleteNote,
  );

  const handleDeleteSource = async () => {
    if (!deletingNoteId) {
      return;
    }

    await deleteNote(deletingNoteId);

    if (error) {
      console.error(error);
    } else {
      setNotes((prev) =>
        prev.filter((source) => source._id !== deletingNoteId),
      );
    }

    handleClose();
  };

  const setDeleteNote = (id: string) => {
    setDeletingNoteId(id);
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  };

  const handleClose = () => {
    setDeletingNoteId(null);
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  };

  const getNoteFilename = () => {
    if (!deletingNoteId) {
      return "";
    }

    return notes.filter(({ _id }) => _id === deletingNoteId)[0].filename;
  };

  return (
    <>
      <div className="flex flex-col gap-4">
        {notes.length > 0 ? (
          notes.map(({ _id, filename }) => (
            <div className="flex gap-2" key={_id}>
              <div className="flex gap-2 bg-dark-08 rounded-lg px-4 py-2 w-full items-center">
                {getIconFromSource(filename)}
                {filename}
              </div>
              <IconButton
                className="text-red"
                icon={DeleteIcon}
                onClick={() => setDeleteNote(_id)}
              />
            </div>
          ))
        ) : (
          <span>
            You have not uploaded notes yet.{" "}
            <b>Chose a file and press Upload new note.</b>
          </span>
        )}
      </div>

      <ConfirmationDialog
        dialogRef={dialogRef}
        title={`Delete ${getNoteFilename()} ?`}
        content="Deleting this note will also delete all the flashcards, puzzles and roadmap goals linked with this file. This action cannot be undone."
        onConfirm={handleDeleteSource}
        onClose={handleClose}
      />
    </>
  );
};
