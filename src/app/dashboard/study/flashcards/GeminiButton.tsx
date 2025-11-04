"use client";
import { useState } from "react";

type ApiCard = { id: string; front: string; back:string };

export default function GeminiCard({
  url = "http://127.0.0.1:8000/api/study/ai-card", //backend
  onCreated,
  className = "",
}: {
  url?: string;
  onCreated?: (card: ApiCard) => void;
  className?: string;
}) {
  const [topic, setTopic] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [err, setErr] = useState("")

  const canGo = topic.trim().length > 0 && status !== "loading"; //button disabled unless you type something in

function mapError(code?: string, preview?: string) {
    switch (code) {
      case "topic_required": return "Topic is required.";
      case "bad_json":       return "AI returned bad JSON. Try again.";
      case "missing_fields": return "AI response missing fields. Try again.";
      default:               return preview ? `Server error: ${preview}` : "Something went wrong.";
    }
  }

async function handleCreate() {
    if (!canGo) return;
    try {
      setErr("");
      setStatus("loading");
      const res = await fetch(url, { //post method from backend
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: topic.trim() }),
      });
      const data = await res.json();

      if (!res.ok || data?.error) { 
        setStatus("error");
        setErr(mapError(data?.error, data?.preview));
        return;
      }

      onCreated?.(data as ApiCard);
      setTopic("");
      setStatus("idle");
    } catch (e: any) {
      setStatus("error");
      setErr(e?.message || "Network error.");
    }
  }
  return (
    <div className={["rounded-2xl border border-black/10 bg-white p-4 shadow-sm", className].join(" ")}>
      <div className="flex flex-col gap-3 md:flex-row md:items-end">
        <div className="flex-1">
          <label className="block text-sm text-black/70 mb-1">Create Flashcards With Google Gemini</label>
          <input
            value={topic}
            onChange={(e)=> setTopic(e.target.value)}
            placeholder='ex. "What is photosynthesis"'
            className="w-full rounded-lg border border-black/20 px-3 py-2 outline-none focus:ring-2 focus:ring-black/20
            "/>
        </div>
          <button
            type="button"
            onClick={handleCreate} 
            disabled={!canGo} 
            aria-busy={status === "loading"}
            className="rounded-xl bg-black text-white px-4 py-2 text-sm disabled:opacity-50"
            >
              {status === "loading" ? "Generating..." : "Generate flashcard"}
            </button>
      </div>
        <p aria-live="polite" className="mt-2 text-xs text-red-600 min-h-4">
          {status === "error" ? err: ""}
        </p>
    </div>
  ); 
}