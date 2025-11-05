"use client";
import { useEffect, useState } from "react";
import Flashcard from "@/app/components/Flashcard";

type ApiCard = { id: string; front: string; back: string };

export default function FlashcardsApi() {
  const API = process.env.NEXT_PUBLIC_API_URL!;
  const [cards, setCards] = useState<ApiCard[] | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const canSave = front.trim().length > 0 && back.trim().length > 0 && !saving;

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API}/flashcards`, { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        setCards(await res.json());
      } catch {
        setErr("Failed to load");
        setCards([]);
      } finally {
        setLoading(false);
      }
    })();
  }, [API]);

  async function createCard(e: React.FormEvent) {
    e.preventDefault();
    if (!canSave) return;

    try {
      setSaving(true);
      setErr(null);
      const res = await fetch(`${API}/flashcards`, {
        // post/create route from backend
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ front: front.trim(), back: back.trim() }),
      });
      const data = await res.json();
      if (!res.ok || data?.error) {
        throw new Error(data?.error || `HTTP ${res.status}`);
      }

      setCards((prev) =>
        prev
          ? [{ id: data.id, front: data.front, back: data.back }, ...prev]
          : [data],
      );
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
      const res = await fetch(`${API}/flashcards/${id}`, {
        method: "DELETE",
      }); //delete route from backend
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || `HTTP ${res.status}`); //error if id is not correct
      }
    } catch {
      //error handling if card is being set to delete and isn't able to
      setCards(prev);
      setErr("Failed to delete card");
    } finally {
      setDeletingId(null);
    }
  }

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
            <div key={c.id} className="flex flex-col gap-2">
              <Flashcard question={c.front} answer={c.back} />
              <button
                disabled={deletingId === c.id}
                aria-busy={deletingId === c.id}
                onClick={() => deleteCard(c.id)}
                className="rounded-md border px-2 py-1 text-xs text-red-600 hover:bg-red-50 self-start"
              >
                {/* delete button mapped to card id so if clicked will delete card above it */}
                {deletingId === c.id ? "Deleting..." : "Delete"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
