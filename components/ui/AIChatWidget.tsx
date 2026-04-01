"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, Loader2 } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export function AIChatWidget() {
  const { t, lang } = useI18n();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Init with welcome message
  useEffect(() => {
    if (open && !initialized) {
      setMessages([{ role: "assistant", content: t.chat.welcome }]);
      setInitialized(true);
    }
  }, [open, initialized, t.chat.welcome]);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when opened
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300);
  }, [open]);

  const sendMessage = useCallback(async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: Message = { role: "user", content: text };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages, lang }),
      });
      const data = await res.json();
      if (data.content) {
        setMessages((prev) => [...prev, { role: "assistant", content: data.content }]);
      }
    } catch {
      setMessages((prev) => [...prev, {
        role: "assistant",
        content: lang === "ru"
          ? "Извините, произошла ошибка. Напишите мне напрямую в Telegram: @wladislaw_le"
          : "Sorry, an error occurred. Please contact me directly: @wladislaw_le on Telegram",
      }]);
    } finally {
      setLoading(false);
    }
  }, [input, loading, messages, lang]);

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-24 right-5 md:right-8 z-50 w-[340px] md:w-[380px] flex flex-col"
            style={{ maxHeight: "calc(100vh - 140px)" }}
          >
            <div className="glass-card-bright rounded-2xl flex flex-col overflow-hidden shadow-glow-md h-full">
              {/* Header */}
              <div className="flex items-center gap-3 p-4 border-b border-white/8">
                <div className="w-9 h-9 rounded-xl bg-accent/15 border border-accent/30 flex items-center justify-center">
                  <Bot size={18} className="text-accent" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white">{t.chat.title}</p>
                  <p className="text-xs text-white/35">{t.chat.subtitle}</p>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="w-7 h-7 rounded-full hover:bg-white/8 flex items-center justify-center text-white/40 hover:text-white transition-all"
                >
                  <X size={14} />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ minHeight: 280, maxHeight: 380 }}>
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={cn(
                      "flex",
                      msg.role === "user" ? "justify-end" : "justify-start"
                    )}
                  >
                    {msg.role === "assistant" && (
                      <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center mr-2 mt-0.5 shrink-0">
                        <Bot size={12} className="text-accent" />
                      </div>
                    )}
                    <div
                      className={cn(
                        "rounded-2xl px-4 py-2.5 text-sm max-w-[75%] leading-relaxed",
                        msg.role === "user"
                          ? "bg-accent text-white rounded-br-sm"
                          : "bg-white/5 text-white/80 border border-white/6 rounded-bl-sm"
                      )}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center">
                      <Bot size={12} className="text-accent" />
                    </div>
                    <div className="bg-white/5 border border-white/6 rounded-2xl rounded-bl-sm px-4 py-2.5">
                      <div className="flex items-center gap-1.5">
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            className="w-1.5 h-1.5 rounded-full bg-white/30"
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-3 border-t border-white/8">
                <div className="flex items-end gap-2 rounded-xl border border-white/10 bg-white/3 px-3 py-2">
                  <textarea
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKey}
                    placeholder={t.chat.placeholder}
                    rows={1}
                    className="flex-1 bg-transparent text-sm text-white placeholder:text-white/25 resize-none outline-none leading-relaxed max-h-24"
                    style={{ scrollbarWidth: "none" }}
                  />
                  <button
                    onClick={sendMessage}
                    disabled={!input.trim() || loading}
                    className={cn(
                      "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all",
                      input.trim() && !loading
                        ? "bg-accent text-white hover:bg-accent/80"
                        : "bg-white/5 text-white/20"
                    )}
                  >
                    {loading ? <Loader2 size={15} className="animate-spin" /> : <Send size={15} />}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <motion.button
        onClick={() => setOpen(!open)}
        className={cn(
          "fixed bottom-5 right-5 md:right-8 z-50 flex items-center gap-2.5 rounded-full shadow-glow-md transition-all duration-300",
          open
            ? "bg-bg-elevated border border-white/15 text-white/70 px-4 h-12"
            : "bg-accent text-white px-5 h-12"
        )}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3 }}
      >
        {open ? (
          <>
            <X size={16} />
            <span className="text-sm font-medium">Закрыть</span>
          </>
        ) : (
          <>
            <MessageCircle size={18} />
            <span className="text-sm font-semibold">{t.chat.open}</span>
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          </>
        )}
      </motion.button>
    </>
  );
}
