"use client";
import { useEffect, useState } from "react";
import Flashcard from "@/app/components/Flashcard";
import {api} from "@/app/utils/apiFetch"
import GeminiCard from "./GeminiButton";


type ApiCard = { id: string; front: string; back: string };

export default function FlashcardsApi() {
  //const API = process.env.NEXT_PUBLIC_API_URL!;
  const [cards, setCards] = useState<ApiCard[] | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const canSave = front.trim().length > 0 && back.trim().length > 0 && !saving;

  const [editingID, setEditingID] = useState<string | null>(null);
  const [editFront, setEditFront] = useState("");
  const [editBack, setEditBack] = useState("");
  const [savingEdit, setSavingEdit] = useState(false)

  const [aiMode, setAiMode] = useState<"single" | "multi">("single");
  const [multiTopic, setMultiTopic] = useState("")
  const [multiCount, setMultiCount] = useState(3);
  const [generatingMulti, setGeneratingMulti] = useState(false);
  const canGenerateMulti = multiTopic.trim().length > 0 && multiCount > 0 && multiCount <= 20 && !generatingMulti;

  useEffect(() => {
    (async () => {
      try {
        const data = await api.fetchFlashcards();
        setCards(data);
      } catch {
        setErr("Failed to load");
        setCards([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function createCard(e: React.FormEvent) {
    e.preventDefault();
    if (!canSave) return;

    try {
      setSaving(true);
      setErr(null);
      const created = await api.createFlashcard({ front: front.trim(), back: back.trim() });
      setCards(prev => (prev ? [created, ...prev] : [created]));
      setFront("");
      setBack("");
    } catch {
      setErr("Failed to create card");
    } finally {
      setSaving(false);
    }
  }

  async function deleteCard(id: string) {
    const prev = cards ?? [];
    setCards(prev.filter((c) => c.id !== id));
    setDeletingId(id);

    try {
      await api.deleteFlashcard(id)
    } catch {
      //error handling if card is being set to delete and isn't able to
      setCards(prev);
      setErr("Failed to delete card");
    } finally {
      setDeletingId(null);
    }
  }

  function startEdit(card: ApiCard){
    setEditingID(card.id);
    setEditFront(card.front);
    setEditBack(card.back);
  }

  function cancelEdit(){
    setEditingID(null);
    setEditFront("");
    setEditBack("");
  }

  async function saveEdit(){
    if (!editingID) return;
    try{
      setSavingEdit(true);
      setErr(null);
      const resp = await api.editFlashcard(editingID, {
        front: editFront.trim(),
        back: editBack.trim(),
      });
      const updated = (resp as any).data ?? resp;
      setCards(prev =>
      (prev ?? []).map(c => (c.id === editingID ? (updated as ApiCard) : c))
      );
      cancelEdit();
    }catch (e){
      setErr(e instanceof Error ? `Failed to save: ${e.message}` : "Failed to save");
    } finally {
      setSavingEdit(false);
    }
  }

  async function  handleGenerateMulti(e: React.FormEvent) {
    e.preventDefault();
    if(!canGenerateMulti) return;

    try {
      setErr(null);
      setGeneratingMulti(true);
      const res = await api.createAiMulticards(multiTopic.trim(), multiCount);

      setCards(prev =>
        prev ? [...res.cards, ...prev] : res.cards
      );
    } catch (e) {
      console.error("AI multi error:", e);
      setErr("Failed to generate AI cards");
    } finally {
      setGeneratingMulti(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* create card has two fields for front and back */}
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

        <div className="mt-3 flex items-center gap-3">
          <button
            type="submit"
            disabled={!canSave}
            className="rounded-xl bg-brand px-4 py-2 text-white disabled:opacity-50"
          >
            {saving ? "Saving…" : "Create flashcard"}
          </button>
          {err && <span className="text-sm text-red-600">Error: {err}</span>}
        </div>
      </form>


      {loading && <div className="text-sm text-black/60">Loading…</div>}
      {!loading && cards && cards.length === 0 && (
        <div className="text-sm text-black/60">No flashcards yet.</div>
      )}

    {!loading && cards && cards.length > 0 && (
      <div className="flex flex-wrap gap-3">
        {cards.map((c) => (
          <div key={c.id} className="flex flex-col gap-2 rounded-lg p-3">
            <Flashcard question={c.front} answer={c.back} />
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
                  onClick={() => deleteCard(c.id)}
                  className="self-start rounded-md border px-2 py-1 text-xs text-red-600 hover:bg-red-50"
                  >
                    {deletingId === c.id ? "Deleting..." : "Delete"}
                </button>
            </div>
          </div>
        ))}
        </div>
    )}

    {editingID && (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
        role="dialog"
        aria-modal="true"
        onClick={(e) => { if (e.currentTarget === e.target) cancelEdit(); }}
        >
          <div className="w-full max-w-lg rounded-xl bg-white p-5 shadow-lg">
            <div className="mb-4">
              <h2 className="text-lg font-semibold">Edit Flashcard</h2>
              </div>
              <div className="grid gap-3">
                <div className="flex flex-col gap-1">
                  <label className= "text-sm text-black/70">Front</label>
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

    <div className="mt-4 rounded-2x1 border border-black/10 bg-white p-4 shadow-sm">
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

    {aiMode === "single" ? (
      <GeminiCard
        className="mb-2"
        onCreated={(card) => 
          setCards(prev => (prev ? [card, ...prev]: [card]))
        }
        />

    ): (
      <form onSubmit={handleGenerateMulti} className="flex flex-col gap-3 md:flex-row md-items-end">
        <div className="flex flex-col gap-1 flex-1">
          <label className="text-sm text-black/70">Topic</label>
          <input
            value={multiTopic}
            onChange={e => setMultiTopic(e.target.value)}
            placeholder='ex. "Pixar Movies"'
            className="rounded-lg border border-black/20 px-3 py-2 outline-none focus:ring-2 focus:ring-black/20"
            />
          </div>
          <div className="flex flex-col gap-1 w-32">
            <label className="text-sm text-black/70">Number of cards</label>
            <input
              type="number"
              min={1}
              max={20}
              value={multiCount}
              onChange={e => setMultiCount(Number(e.target.value) || 0)}
              className="w-32 rounded-lg border border-black/20 px-3 py-2 outline-none focus:ring-2 focus:ring-black/20"
              />
        </div>
        <button
          type="submit"
          disabled={!canGenerateMulti}
          className="rounded-xl bg-black text-white px-2 py-1 text-sm disabled:opacity-50"
          >
            {generatingMulti ? "Generating..." : "Generate Flashcards"}
          </button>
      </form>
    )}
    </div>
    </div>
  );
}
