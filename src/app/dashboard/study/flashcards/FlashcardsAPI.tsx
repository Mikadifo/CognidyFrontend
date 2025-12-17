"use client";
import { useEffect, useState } from "react";
import Flashcard from "@/app/components/Flashcard";
import { api } from "@/app/utils/apiFetch";
import GeminiCard from "./GeminiButton";
import { useAuth } from "@/app/hooks/useAuth";
import {
  createGuestCard,
  deleteGuestCard,
  editGuestCard,
  getGuestCards,
} from "./GuestCards";
import Alert from "@/app/components/Alert";

type ApiCard = {
  //parts of the flashcard
  id: string;
  front: string;
  back: string;
  section?: string;
};

export default function FlashcardsApi() {
  //const API = process.env.NEXT_PUBLIC_API_URL!;
  const [cards, setCards] = useState<ApiCard[] | null>(null); //list of flashcards, can be null if no flashcards yet
  const [loading, setLoading] = useState(true); //loading for initial startup
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null); //takes id of card that might be deleted

  const [front, setFront] = useState(""); //card states
  const [back, setBack] = useState("");
  const [saving, setSaving] = useState(false);

  const [deletingId, setDeletingId] = useState<string | null>(null); //tracks id of card being deleted

  const canSave = front.trim().length > 0 && back.trim().length > 0 && !saving; //saves when both sides on a card have text and isn't saving already

  const [editingID, setEditingID] = useState<string | null>(null); //id of card being edited
  const [editFront, setEditFront] = useState(""); //areas being edited
  const [editBack, setEditBack] = useState("");
  const [savingEdit, setSavingEdit] = useState(false);

  const maxMultiCards = 20; //total cards that can be created at once with multi card creation tab
  const [aiMode, setAiMode] = useState<"single" | "multi">("single"); //tab to create one or multiple cards in gemini area
  const [multiTopic, setMultiTopic] = useState(""); //topic for ai flashcard creation
  const [multiCount, setMultiCount] = useState(3); //the amount of multiple flashcards being created, by default it's 3
  const [generatingMulti, setGeneratingMulti] = useState(false);
  const canGenerateMulti =
    multiTopic.trim().length > 0 &&
    multiCount > 0 &&
    multiCount <= maxMultiCards &&
    !generatingMulti;

  const { getToken } = useAuth(); //authentication
  const token = getToken();
  const guestMode = !token || token === "guest";

  const [section, setSection] = useState(""); //card tag filtering
  const [editSection, setEditSection] = useState("");
  const [activeSection, setActiveSection] = useState<"all" | string>("all");

  const sections =
    cards?.map((c) => c.section).filter((s): s is string => !!s) ?? []; //all sections

  const uniqueSections = Array.from(new Set(sections)); //prevents duplications
  const visibleCards = !cards
    ? []
    : activeSection === "all"
      ? cards
      : cards.filter((c) => c.section === activeSection); //all cards or section of cards

  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    //causes error alerts to only show for a set amount of time
    if (!alert.open) return;

    const timeout = setTimeout(() => {
      setAlert((prev) => ({
        ...prev,
        open: false,
      }));
    }, 2000); //popup for 2 seconds
    return () => clearTimeout(timeout);
  }, [alert.open, setAlert]);

  useEffect(() => {
    (async () => {
      try {
        if (guestMode) {
          //gets local storage
          const guestData = getGuestCards();
          setCards(guestData); //shows list of flashcards of a guest user
        } else {
          const data = await api.fetchFlashcards();
          setCards(data); //fetches flashcards from database of authenticated user and shows them
        }
      } catch {
        setAlert({
          open: true,
          message: "Failed to load",
          severity: "error",
        }); //error popup
        setCards([]); //on error keeps the list of cards empty
      } finally {
        setLoading(false);
      }
    })();
  }, [guestMode]);

  async function createCard(e: React.FormEvent) {
    //creates a flashcard with a form
    e.preventDefault();
    if (!canSave) return;

    try {
      setSaving(true);
      if (guestMode) {
        const guestCreated = createGuestCard(
          front.trim(),
          back.trim(),
          section.trim() || undefined,
        );
        if (!guestCreated.ok) {
          setAlert({
            open: true,
            message:
              "Guest limit has been reached. Please create an account or login to create more.",
            severity: "error",
          });
          return;
        }
        setCards(guestCreated.cards); //puts created card into guest's local storage
      } else {
        const created = await api.createFlashcard({
          //for authenticated users
          front: front.trim(),
          back: back.trim(),
          section: section.trim() || undefined, //section can be none
        }); //creates flashcard with backend post route
        setCards((prev) => (prev ? [...prev, created] : [created])); //puts created flashcard at the end of the flashcards list
      }
      setFront(""); //fields becomes null after a card is created
      setBack("");
      setSection("");
    } catch {
      setAlert({
        open: true,
        message: "Failed to create card.",
        severity: "error",
      });
    } finally {
      setSaving(false);
    }
  }

  async function deleteCard(id: string) {
    const prev = cards ?? [];
    setCards(prev.filter((c) => c.id !== id));
    setDeletingId(id);

    try {
      if (guestMode) {
        const guestDelete = deleteGuestCard(id); //deletes local storage flashcard
        setCards(guestDelete); //updates local flashcards
        return;
      } else {
        await api.deleteFlashcard(id); //uses backend delete route
      }
    } catch {
      //error handling if card is being set to delete and isn't able to
      setCards(prev);
      setAlert({
        open: true,
        message: "Failed to delete card.",
        severity: "error",
      });
    } finally {
      setDeletingId(null);
    }
  }

  function startEdit(card: ApiCard) {
    //areas in the card that can be updated
    setEditingID(card.id);
    setEditFront(card.front);
    setEditBack(card.back);
    setEditSection(card.section ?? "");
  }

  function cancelEdit() {
    //when canceling an edits all the edit fields become null
    setEditingID(null);
    setEditFront("");
    setEditBack("");
    setEditSection("");
  }

  async function saveEdit() {
    if (!editingID) return; //if no edit id there will be no edit
    try {
      setSavingEdit(true);

      if (guestMode) {
        //if guestmode then inputs params to locally edit a card
        const editGuest = editGuestCard(
          editingID,
          editFront.trim(),
          editBack.trim(),
          editSection.trim() || undefined,
        );
        if (!editGuest.ok) {
          setAlert({
            open: true,
            message: "This card could not be found.",
            severity: "error",
          });
          return;
        }
        setCards(editGuest.cards);
        setEditingID(null);
        return;
      }
      else {
        
        const resp = await api.editFlashcard(editingID, { //backend edit route
          front: editFront.trim(),
          back: editBack.trim(),
          section: editSection.trim(),
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const updated = (resp as any).data ?? resp;
        setCards((prev) =>
          (prev ?? []).map((c) =>
            c.id === editingID ? (updated as ApiCard) : c,
          ),
        );
      }
      cancelEdit(); //as shown above sets edit fields to null
    } catch (e) {
      setAlert({
        open: true,
        message:
          e instanceof Error
            ? `Failed to save: ${e.message}`
            : "Failed to save",
        severity: "error",
      });
    } finally {
      setSavingEdit(false);
    }
  }


  async function handleGenerateMulti(e: React.FormEvent) {
    e.preventDefault();
    if (!canGenerateMulti) return;

    if (guestMode) {
      //if guest mode feature is not available
      setAlert({
        open: true,
        message:
          "To use AI card generation please create an account or sign in.",
        severity: "error",
      });
      return;
    }

    try {
      setGeneratingMulti(true);

      const res = await api.createAiMulticards(
        multiTopic.trim(),
        multiCount,
        section.trim() || undefined,
      ); //backend route that uses the user inputs of topic count and potentially section

      setCards((prev) => (prev ? [...prev, ...res.cards] : res.cards)); //adds the amount of new cards created to back of existing card list
      setMultiTopic("");
      setMultiCount(3);
      setSection(""); //clears fields after cards are generated
    } catch (e) {
      console.error("AI multi error:", e);
      setAlert({
        open: true,
        message: "Failed to generate AI cards.",
        severity: "error",
      });
    } finally {
      setGeneratingMulti(false);
    }
  }

  async function handleConfirmDelete() {
    if (!confirmDeleteId) return; //stops card from being deleted if no is selected
    await deleteCard(confirmDeleteId); //if yes is selected then deletion carries on
    setConfirmDeleteId(null); //when finished removes any id from deletion
  }

  return (
    <div className="flex flex-col gap-6">
      <Alert alert={alert} setAlert={setAlert} />
      {/* create card has two fields for front and back */}
      {/* user create card section */}
      <form
        onSubmit={createCard}
        className="rounded-2xl border border-black/10 bg-white p-4 shadow-sm"
      >
        <h3 className="mb-3 text-lg font-semibold">Create flashcard</h3>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="flex flex-col gap-1">
            <label className="text-sm text-black/70">Front</label>
            <input
              value={front}
              onChange={(e) => setFront(e.target.value)}
              placeholder="ex. What planet do humans live on?"
              className="rounded-lg border border-black/20 px-3 py-2 outline-none focus:ring-2 focus:ring-black/20"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm text-black/70">Back</label>
            <input
              value={back}
              onChange={(e) => setBack(e.target.value)}
              placeholder="ex. Earth"
              className="rounded-lg border border-black/20 px-3 py-2 outline-none focus:ring-2 focus:ring-black/20"
            />
          </div>
        </div>

        {/* optional section input area to be able to tag cards */}
        <div className="flex flex-col gap-1">
          <label className="text-sm text-black/70"> Section (optional) </label>
          <input
            value={section}
            onChange={(e) => setSection(e.target.value)}
            placeholder="ex. Astrology, Math, etc."
            className="rounded-lg border border-black/20 px-3 py-2 outline-none focus:ring-2 focus:ring-black/20"
          />
        </div>

        <div className="mt-3 flex items-center gap-3">
          <button
            type="submit"
            disabled={!canSave}
            className="rounded-xl bg-brand px-4 py-2 text-white disabled:opacity-50"
          >
            {saving ? "Saving…" : "Create flashcard"}
          </button>
        </div>
      </form>

      {/* loading area for cards if non created yet display a message saying so */}
      {loading && <div className="text-sm text-black/60">Loading…</div>}
      {!loading && cards && cards.length === 0 && (
        <div className="text-sm text-black/60">No flashcards yet.</div>
      )}

      {/* optional sections being able to be picked */}
      {!loading && cards && cards.length > 0 && (
        <>
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <span className="text-sm text-black/70"> Filter by section:</span>
            <button
              type="button"
              onClick={() => setActiveSection("all")}
              className={`rounded-full px-3 py-1 text-xs ${
                activeSection === "all"
                  ? "bg-black text-white"
                  : "bg-black/5 text-black"
              }`}
            >
              All
            </button>
            {uniqueSections.map((sec) => (
              <button
                key={sec}
                type="button"
                onClick={() => setActiveSection(sec)}
                className={`rounded-full px-3 py-1 text-xs ${
                  activeSection === sec
                    ? "bg-black text-white"
                    : "bg-black/5 text-black"
                }`}
              >
                {sec}
              </button>
            ))}
          </div>
          {/* flashcard list */}
          <div className="flex flex-wrap gap-3">
            {visibleCards.map((c) => (
              <div key={c.id} className="flex flex-col gap-2 rounded-lg p-3">
                <Flashcard question={c.front} answer={c.back} />
                {c.section && (
                  <span className="pl-2 text-xs text-black/60">
                    Section: {c.section}
                  </span>
                )}
                {/* Edit and delete buttons */}
                <div className="flex gap-2 pl-2">
                  <button
                    type="button"
                    onClick={() => startEdit(c)}
                    className="rounded-md border px-2 py-1 text-xs"
                  >
                    Edit
                  </button>
                  <button
                    disabled={deletingId === c.id}
                    aria-busy={deletingId === c.id}
                    onClick={() => setConfirmDeleteId(c.id)}
                    className="self-start rounded-md border px-2 py-1 text-xs text-red-600 hover:bg-red-50"
                  >
                    {deletingId === c.id ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* edit modal with options to edit front back or section of the card */}
      {editingID && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          role="dialog"
          aria-modal="true"
          onClick={(e) => {
            if (e.currentTarget === e.target) cancelEdit();
          }}
        >
          <div className="w-full max-w-lg rounded-xl bg-white p-5 shadow-lg">
            <div className="mb-4">
              <h2 className="text-lg font-semibold">Edit Flashcard</h2>
            </div>
            <div className="grid gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-sm text-black/70">Front</label>
                <input
                  value={editFront}
                  onChange={(e) => setEditFront(e.target.value)}
                  placeholder="Front"
                  className="rounded-lg border border-black/20 px-3 py-2 outline-none focus:ring-2 focus:ring-black/20"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm text-black/70">Back</label>
                <input
                  value={editBack}
                  onChange={(e) => setEditBack(e.target.value)}
                  placeholder="Back"
                  className="rounded-lg border border-black/20 px-3 py-2 outline-none focus:ring-2 focus:ring-black/20"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm text-black/70">Section</label>
                <input
                  value={editSection}
                  onChange={(e) => setEditSection(e.target.value)}
                  placeholder="Math, Science, etc."
                  className="rounded-lg border border-black/20 px-3 py-2 outline-none focus:ring-2 focus:ring-black/20"
                />
              </div>
            </div>
            <div className="mt-4 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={cancelEdit}
                className="rounded-md border px-3 py-1"
                disabled={savingEdit}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={saveEdit}
                disabled={savingEdit || (!editFront.trim() && !editBack.trim())}
                className="rounded-md bg-black px-3 py-1 text-white disabled:opacity-50"
              >
                {savingEdit ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* delete confirmation modal asking the user if they are sure they'd like to delete their flashcard */}
      {confirmDeleteId && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 p-4"
          role="dialog"
          aria-modal="true"
          onClick={(e) => {
            if (e.currentTarget === e.target) setConfirmDeleteId(null);
          }}
        >
          <div className="w-full max-w-sm rounded-xl bg-white p-4 shadow-lg">
            <p className="mb-4 text-sm text-black/80">
              Are you sure that you want to delete this flashcard?
            </p>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setConfirmDeleteId(null)}
                className="rounded-md border px-3 py-1 text-sm"
                disabled={deletingId === confirmDeleteId}
              >
                No
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="rounded-md border text-red-600 px-3 py-1 text-sm disabled:opacity-50"
                disabled={deletingId === confirmDeleteId}
              >
                {deletingId === confirmDeleteId ? "Deleting..." : "Yes"}
              </button>
            </div>
          </div>
        </div>
      )}

    {/* ai section */}
    {guestMode ? ( //if guest mode tell user the feature is only available if they signup/login
    <div className="mt-4 rounded-2xl border border-black/10 bg-white p-4 shadow-sm">
    <div className="mb-3 flex items-center justify-between gap-2">
      <p className="text-sm font-semibold text-black/80">
        Create Flashcards With Google Gemini
      </p> 
    </div>
    <div className="text-lg font-bold text-black/40 text-center">
        To use this feature, please create an account or sign in.
    </div>
    </div>
    ):(
    <div className="mt-4 rounded-2xl border border-black/10 bg-white p-4 shadow-sm">
    <div className="mb-3 flex items-center justify-between gap-2">
      <p className="text-sm font-semibold text-black/80">
        Create Flashcards With Google Gemini
      </p>
      <div className="flex gap-2 text-xs font-medium">
        <button
        type="button"
        onClick={() => setAiMode("single")}
        className={`rounded-full px-3 py-1 ${
          aiMode === "single"
          ? "bg-black text-white"
          : "bg-black/5 text-black"
        }`}
        >
          Single
        </button>
        <button
        type="button"
        onClick={() => setAiMode("multi")}
        className={`rounded-full px-3 py-1 ${
          aiMode === "multi"
          ? "bg-black text-white"
          : "bg-black/5 text-black"
        }`}
        >
          Multi
        </button>
      </div>
    </div>

          {aiMode === "single" ? ( //uses gemini card module to create a single card
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-3 md:flex-row md:items-center">
                <div className="flex flex-col gap-1 w-full md:w-56 md:self-start md:mt-4.25">
                  <label className="text-sm text-black/70">
                    {" "}
                    Section (optional){" "}
                  </label>
                  <input
                    value={section}
                    onChange={(e) => setSection(e.target.value)}
                    placeholder="ex. Astrology, Math, etc."
                    className="rounded-lg border border-black/20 px-3 py-2 outline-none focus:ring-2 focus:ring-black/20"
                  />
                </div>
                <div className="flex-1">
                  <GeminiCard
                    className="mb-2"
                    section={section.trim() || undefined}
                    onCreated={(card) => {
                      setCards((prev) => (prev ? [...prev, card] : [card]));
                      setSection("");
                    }}
                  />
                </div>
              </div>
            </div>
          ) : (
            // form created inline for multi ai card creation tab
            <form
              onSubmit={handleGenerateMulti}
              className="flex flex-col gap-3 md:flex-row md:items-end"
            >
              <div className="flex flex-col gap-1 flex-1">
                <label className="text-sm text-black/70">Topic</label>
                <input
                  value={multiTopic}
                  onChange={(e) => setMultiTopic(e.target.value)}
                  placeholder='ex. "Pixar Movies"'
                  className="rounded-lg border border-black/20 px-3 py-2 outline-none focus:ring-2 focus:ring-black/20"
                />
              </div>
              <div className="flex flex-col gap-1 w-32">
                <label className="text-sm text-black/70">Number of cards</label>
                <input
                  type="number"
                  min={1}
                  max={maxMultiCards}
                  value={multiCount}
                  onChange={(e) => setMultiCount(Number(e.target.value) || 0)}
                  className="w-32 rounded-lg border border-black/20 px-3 py-2 outline-none focus:ring-2 focus:ring-black/20"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm text-black/70">
                  {" "}
                  Section (optional){" "}
                </label>
                <input
                  value={section}
                  onChange={(e) => setSection(e.target.value)}
                  placeholder="ex. Astrology, Math, etc."
                  className="rounded-lg border border-black/20 px-3 py-2 outline-none focus:ring-2 focus:ring-black/20"
                />
              </div>
              <button
                type="submit"
                disabled={!canGenerateMulti}
                className="rounded-xl bg-brand px-4 py-2 text-white disabled:opacity-50"
              >
                {generatingMulti ? "Generating..." : "Generate Flashcards"}
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
