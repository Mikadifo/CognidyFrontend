import { GeneratingSection } from "../components/GenerationNotification";
import GenerationStatusDto from "../dtos/GenerationStatusDto";

const STORE_KEY = "new-note-status";

export function addNewNote(noteId: string) {
  const noteStatus = {
    noteId,
    puzzles: "generating",
    flashcards: "generating",
    goals: "generating",
  };

  localStorage.setItem(STORE_KEY, JSON.stringify(noteStatus));
}

export function removeNewNoteStatus() {
  localStorage.removeItem(STORE_KEY);
}

export function updateNewNoteStatus(status: GenerationStatusDto) {
  const noteStatus = {
    noteId: getNewNoteId(),
    ...status,
  };

  localStorage.setItem(STORE_KEY, JSON.stringify(noteStatus));
}

export function getNewNoteId() {
  const noteStatus = localStorage.getItem(STORE_KEY);

  if (noteStatus) {
    return JSON.parse(noteStatus).noteId;
  }

  return "";
}

export function getNewNoteStatus() {
  const noteStatus = localStorage.getItem(STORE_KEY);

  if (noteStatus) {
    return JSON.parse(noteStatus);
  }

  return {};
}

export function isSectionComplete(section: GeneratingSection) {
  let sectionString = "flashcards";

  if (section === GeneratingSection.ROADMAP) {
    sectionString = "goals";
  }

  if (section === GeneratingSection.PUZZLES) {
    sectionString = "puzzles";
  }

  return getNewNoteStatus()[sectionString] !== "generating";
}

export function allSectionsComplete() {
  const sections = ["flashcards", "goals", "puzzles"];
  const newStatus = getNewNoteStatus();

  for (let section of sections) {
    if (newStatus[section] === "generating") {
      return false;
    }
  }

  return true;
}
