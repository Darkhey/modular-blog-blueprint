import { useState, useRef, useEffect, useCallback } from "react";
import { MessageCircle, X, Send, Loader2, Sparkles, RotateCcw } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Link, useLocation } from "react-router-dom";
import { toast } from "sonner";

type Msg = { role: "user" | "assistant"; content: string };

const QUICK_CHIPS = [
  { label: "💰 Fördermittel", message: "Welche Fördermittel gibt es 2025/2026 für eine energetische Sanierung?" },
  { label: "🏠 Sanierungsstart", message: "Ich möchte mein Haus sanieren. Wo fange ich am besten an?" },
  { label: "🔥 Heizung tauschen", message: "Was kostet ein Heizungstausch und welche Förderungen gibt es?" },
  { label: "☀️ Solar", message: "Lohnt sich eine Solaranlage für mein Haus? Was kostet das?" },
  { label: "🧱 Dämmung", message: "Was kostet eine Fassadendämmung und wie viel spare ich damit?" },
  { label: "🛁 Bad renovieren", message: "Was kostet eine Badezimmer-Renovierung und gibt es Förderungen?" },
];

const MAX_MESSAGES_PER_SESSION = 30;

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat-assistant`;

function MarkdownLink({ href, children }: { href?: string; children?: React.ReactNode }) {
  if (href?.startsWith("/")) {
    return (
      <Link to={href} className="text-primary underline hover:text-primary/80 font-medium">
        {children}
      </Link>
    );
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-primary underline hover:text-primary/80 font-medium">
      {children}
    </a>
  );
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [msgCount, setMsgCount] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  const resetChat = useCallback(() => {
    setMessages([]);
    setMsgCount(0);
    setInput("");
  }, []);

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || isLoading || msgCount >= MAX_MESSAGES_PER_SESSION) return;

      const userMsg: Msg = { role: "user", content: text.trim() };
      setMessages((prev) => [...prev, userMsg]);
      setInput("");
      setIsLoading(true);
      setMsgCount((c) => c + 1);

      let assistantText = "";

      const upsert = (chunk: string) => {
        assistantText += chunk;
        setMessages((prev) => {
          const last = prev[prev.length - 1];
          if (last?.role === "assistant" && prev.length > 0 && prev[prev.length - 2]?.content === userMsg.content) {
            return prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: assistantText } : m));
          }
          return [...prev, { role: "assistant", content: assistantText }];
        });
      };

      try {
        const resp = await fetch(CHAT_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({
            message: text.trim(),
            history: messages.map((m) => ({ role: m.role, content: m.content })),
            currentPage: location.pathname,
          }),
        });

        if (resp.status === 429) {
          toast.error("Zu viele Anfragen. Bitte warte einen Moment.");
          setMessages((prev) => [
            ...prev,
            { role: "assistant", content: "⏳ Zu viele Anfragen. Bitte warte einen Moment und versuche es dann erneut." },
          ]);
          return;
        }

        if (resp.status === 402) {
          toast.error("AI-Kontingent vorübergehend erschöpft.");
          setMessages((prev) => [
            ...prev,
            { role: "assistant", content: "Das AI-Kontingent ist vorübergehend erschöpft. Bitte versuche es später erneut." },
          ]);
          return;
        }

        if (!resp.ok || !resp.body) {
          throw new Error("Stream failed");
        }

        const reader = resp.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });

          let nl: number;
          while ((nl = buffer.indexOf("\n")) !== -1) {
            let line = buffer.slice(0, nl);
            buffer = buffer.slice(nl + 1);
            if (line.endsWith("\r")) line = line.slice(0, -1);
            if (line.startsWith(":") || line.trim() === "") continue;
            if (!line.startsWith("data: ")) continue;
            const json = line.slice(6).trim();
            if (json === "[DONE]") break;
            try {
              const parsed = JSON.parse(json);
              const content = parsed.choices?.[0]?.delta?.content;
              if (content) upsert(content);
            } catch {
              buffer = line + "\n" + buffer;
              break;
            }
          }
        }

        // Final flush
        if (buffer.trim()) {
          for (let raw of buffer.split("\n")) {
            if (!raw) continue;
            if (raw.endsWith("\r")) raw = raw.slice(0, -1);
            if (raw.startsWith(":") || raw.trim() === "") continue;
            if (!raw.startsWith("data: ")) continue;
            const jsonStr = raw.slice(6).trim();
            if (jsonStr === "[DONE]") continue;
            try {
              const parsed = JSON.parse(jsonStr);
              const content = parsed.choices?.[0]?.delta?.content;
              if (content) upsert(content);
            } catch { /* ignore */ }
          }
        }
      } catch (e) {
        console.error("Chat error:", e);
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: "Entschuldigung, es gab einen Fehler. Bitte versuche es erneut." },
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, messages, msgCount, location.pathname]
  );

  return (
    <>
      {/* Floating button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-20 right-4 z-50 bg-primary text-primary-foreground rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
          aria-label="Chat öffnen"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-4 right-4 z-50 w-[370px] max-w-[calc(100vw-2rem)] h-[540px] max-h-[calc(100vh-6rem)] bg-background border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-fade-in">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-primary text-primary-foreground rounded-t-2xl">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              <span className="font-semibold text-sm">Sanierungshelfer</span>
            </div>
            <div className="flex items-center gap-1">
              {messages.length > 0 && (
                <button onClick={resetChat} className="hover:bg-primary-foreground/20 rounded p-1 transition-colors" title="Neuer Chat">
                  <RotateCcw className="w-4 h-4" />
                </button>
              )}
              <button onClick={() => setOpen(false)} className="hover:bg-primary-foreground/20 rounded p-1 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
            {messages.length === 0 && (
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  👋 Hallo! Ich bin dein <strong>Sanierungshelfer</strong>. Ich kann dir helfen bei:
                </p>
                <ul className="text-xs text-muted-foreground space-y-1 ml-1">
                  <li>💰 Fördermittel & Kosten einschätzen</li>
                  <li>🏠 Sanierungsreihenfolge planen</li>
                  <li>🔧 Den richtigen Rechner finden</li>
                  <li>📖 Passende Ratgeber empfehlen</li>
                </ul>
                <div className="flex flex-wrap gap-1.5">
                  {QUICK_CHIPS.map((chip) => (
                    <button
                      key={chip.label}
                      onClick={() => sendMessage(chip.message)}
                      className="text-xs bg-muted hover:bg-muted/80 text-foreground px-2.5 py-1.5 rounded-full transition-colors"
                    >
                      {chip.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] px-3 py-2 rounded-2xl text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-md"
                      : "bg-muted text-foreground rounded-bl-md"
                  }`}
                >
                  {msg.role === "assistant" ? (
                    <div className="prose prose-sm max-w-none [&_p]:my-1 [&_ul]:my-1 [&_ol]:my-1 [&_li]:my-0.5 [&_h3]:text-sm [&_h3]:font-semibold [&_h3]:mt-2">
                      <ReactMarkdown components={{ a: MarkdownLink as any }}>
                        {msg.content}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    msg.content
                  )}
                </div>
              </div>
            ))}

            {isLoading && messages[messages.length - 1]?.role !== "assistant" && (
              <div className="flex justify-start">
                <div className="bg-muted px-3 py-2 rounded-2xl rounded-bl-md">
                  <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-border">
            {msgCount >= MAX_MESSAGES_PER_SESSION && (
              <div className="px-3 py-1.5 text-xs text-muted-foreground text-center bg-muted/50">
                Nachrichten-Limit erreicht. <button onClick={resetChat} className="text-primary underline">Neuen Chat starten</button>
              </div>
            )}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage(input);
              }}
              className="px-3 py-2 flex gap-2"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={msgCount >= MAX_MESSAGES_PER_SESSION ? "Limit erreicht" : "Frage stellen…"}
                disabled={isLoading || msgCount >= MAX_MESSAGES_PER_SESSION}
                className="flex-1 text-sm bg-muted rounded-full px-4 py-2 outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading || msgCount >= MAX_MESSAGES_PER_SESSION}
                className="bg-primary text-primary-foreground rounded-full w-9 h-9 flex items-center justify-center disabled:opacity-50 hover:bg-primary/90 transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
