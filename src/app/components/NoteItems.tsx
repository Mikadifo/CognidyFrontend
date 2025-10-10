"use client";

import React, { Dispatch, FC, SetStateAction } from "react";
import { IconButton } from "@/app/components/IconButton";
import { Note } from "../models/Note";
import DeleteIcon from "@/app/assets/icons/trashcan.svg";
import PdfIcon from "@/app/assets/icons/pdf.svg";
import MdIcon from "@/app/assets/icons/markdown.svg";
import TxtIcon from "@/app/assets/icons/textNotes.svg";
import { AUTH_TOKEN, BASE_API } from "../constants";

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
  const handleDeleteSource = (id: string) => {
    const confirmed = confirm(
      "All flashcards, puzzles and roadmaps generated using this file will also be deleted. Are you sure you want to continue?",
    );

    if (confirmed) {
      fetch(`${BASE_API}/notes/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: AUTH_TOKEN, // TODO: use login token instead and also check for guest user, need auth hook
        },
      })
        .then(async (res) => {
          if (!res.ok) {
            const data = await res.json();
            throw new Error(data.error || "Failed to delete note");
          }

          return res.json();
        })
        .then((data) => {
          console.log(data);
          setNotes((prev) => prev.filter((source) => source._id !== id));
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {notes.length > 0 ? (
        notes.map(({ _id, filename }) => (
          <div className="flex gap-2" key={_id}>
            <div className="flex gap-2 bg-dark-08 rounded-lg px-4 py-2 w-full items-center">
              {getIconFromSource(filename)}
              {filename}
            </div>
            <IconButton
              icon={DeleteIcon}
              onClick={() => handleDeleteSource(_id)}
            />
          </div>
        ))
      ) : (
        <span>
          You don't have any notes uploaded yet.{" "}
          <b>Chose a file and press Upload new note.</b>
        </span>
      )}
    </div>
  );
};
