"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSend, FiX, FiRefreshCcw, FiMessageCircle } from "react-icons/fi";

type Msg = { role: "user" | "assistant"; content: string };

const CHAT_ENDPOINT =
  "https://moghulfoodsapimanager-internal.replit.app/api/webhook";

function normalizeReply(data: any): string {
  if (data == null) return "Sorry, I didn’t catch that.";
  if (typeof data === "string") return data;
  // common keys
  const candidate =
    data.response ?? data.reply ?? data.message ?? data.content ?? null;
  if (typeof candidate === "string") return candidate;
  try {
    return JSON.stringify(data);
  } catch {
    return String(data);
  }
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: "Hi, I am the AI assistant for Moghul Foods. How may I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  const reset = () => {
    setMessages([{ role: "assistant", content: "New chat started. How can I help?" }]);
  };

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;

    setMessages((m) => [...m, { role: "user", content: text }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(CHAT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      const contentType = res.headers.get("content-type") || "";
      const payload = contentType.includes("application/json")
        ? await res.json()
        : await res.text();

      const reply = normalizeReply(payload);
      setMessages((m) => [...m, { role: "assistant", content: reply }]);
    } catch {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "Network error. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Open chat"
        className="fixed bottom-5 right-5 z-50 h-14 w-14 rounded-full bg-[#020042] text-white shadow-xl hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#020042]"
      >
        <FiMessageCircle className="mx-auto" size={22} />
      </button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
        <motion.aside
        initial={{ opacity: 0, y: 12, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12, scale: 0.98 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="fixed inset-x-2 bottom-24 z-50 w-auto max-w-[420px] mx-auto 
                    sm:inset-auto sm:right-5 sm:bottom-24 sm:w-[95vw] 
                    overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl top-[10vh]"
        >
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-white">
              <div className="text-gray-900 font-semibold">Moghul Foods AI Assistant</div>
              <div className="flex items-center gap-2">
                <button
                  onClick={reset}
                  className="rounded-lg p-2 hover:bg-gray-100"
                  aria-label="New chat"
                  title="New chat"
                >
                  <FiRefreshCcw size={18} className="text-gray-600" />
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="rounded-lg p-2 hover:bg-gray-100"
                  aria-label="Close chat"
                  title="Close"
                >
                  <FiX size={18} className="text-gray-600" />
                </button>
              </div>
            </div>

            <div
              ref={scrollerRef}
              className="max-h-[70vh] overflow-y-auto bg-white p-3 sm:p-4"
            >
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`mb-3 flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] whitespace-pre-wrap rounded-2xl px-4 py-3 shadow-sm ${
                      m.role === "user"
                        ? "bg-[#2f73ff] text-white rounded-br-none"
                        : "bg-[#f7f8fa] text-gray-900 rounded-bl-none"
                    }`}
                  >
                    {m.content}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="mb-3 flex justify-start">
                  <div className="rounded-2xl rounded-bl-none border bg-white px-4 py-3 text-gray-700 shadow-sm">
                    <TypingDots />
                  </div>
                </div>
              )}

              <div ref={endRef} />
            </div>

            <div className="border-b border-gray-150 bg-white p-3">
              <div className="flex items-end gap-2">
               
                  <textarea
                    rows={1}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={onKeyDown}
                    placeholder="Message…"
                    className="w-full px-4 py-[12px] border-2 border-blue-500 rounded-full outline-none text-base bg-gray-50 text-gray-800 placeholder-gray-400"
                  />
               

                <button
                  onClick={send}
                  disabled={loading || !input.trim()}
                  aria-label="Send message"
                  className="grid place-items-center h-11 w-11 rounded-full bg-[#2f73ff] text-white shadow hover:brightness-110 disabled:opacity-50"
                >
                  <FiSend size={18} />
                </button>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}

function TypingDots() {
  return (
    <div className="flex items-center gap-1">
      <span className="sr-only">Assistant is typing…</span>
      <i className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:0ms]" />
      <i className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:120ms]" />
      <i className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:240ms]" />
    </div>
  );
}
