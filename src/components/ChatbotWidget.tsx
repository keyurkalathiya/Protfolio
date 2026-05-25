import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, X, Send, Sparkles, RefreshCw, ChevronDown, Check, User, Bot, CornerDownLeft, Settings } from "lucide-react";
import { getLocalReply } from "../utils/localReply";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const SUGGESTED_PROMPTS = [
  { text: "Tell me about Keyur's research.", id: "s1" },
  { text: "What's his master's degree specialization?", id: "s2" },
  { text: "List Keyur's core coding languages.", id: "s3" },
  { text: "Are there any notable web projects built?", id: "s4" },
  { text: "How can I contact or hire Keyur?", id: "s5" },
];

// Lightweight customized inline markdown-to-html formatter for markdown elements
function FormattedMessage({ text }: { text: string }) {
  // Simple custom parser to turn bold text (**something**), bullets (- item), and links ([text](url)) into react nodes
  const lines = text.split("\n");
  
  return (
    <div className="space-y-1.5 text-xs sm:text-sm leading-relaxed text-[#D7E2EA]">
      {lines.map((line, lIdx) => {
        let trimmed = line.trim();
        // Check list items
        const isBullet = trimmed.startsWith("- ") || trimmed.startsWith("* ");
        if (isBullet) {
          trimmed = trimmed.substring(2);
        }

        // Custom parser for **bold** and [text](url)
        const parseLineContent = (content: string) => {
          const parts: React.ReactNode[] = [];
          let currentStr = content;
          let keyCounter = 0;

          // Simple regex mapping
          while (currentStr.length > 0) {
            const boldMatch = currentStr.match(/\*\*(.*?)\*\*/);
            const linkMatch = currentStr.match(/\[(.*?)\]\((.*?)\)/);

            if (boldMatch && (!linkMatch || (boldMatch.index !== undefined && linkMatch.index !== undefined && boldMatch.index < linkMatch.index))) {
              const startIdx = boldMatch.index || 0;
              const innerText = boldMatch[1];
              
              if (startIdx > 0) {
                parts.push(<span key={`text-${keyCounter++}`}>{currentStr.substring(0, startIdx)}</span>);
              }
              parts.push(<strong key={`bold-${keyCounter++}`} className="font-extrabold text-[#FF5CE2]">{innerText}</strong>);
              currentStr = currentStr.substring(startIdx + boldMatch[0].length);
            } else if (linkMatch) {
              const startIdx = linkMatch.index || 0;
              const linkText = linkMatch[1];
              const linkUrl = linkMatch[2];

              if (startIdx > 0) {
                parts.push(<span key={`text-${keyCounter++}`}>{currentStr.substring(0, startIdx)}</span>);
              }
              parts.push(
                <a 
                  key={`link-${keyCounter++}`} 
                  href={linkUrl} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="font-medium text-[#FF5CE2] underline decoration-[#FF5CE2]/50 hover:text-white transition-colors"
                >
                  {linkText}
                </a>
              );
              currentStr = currentStr.substring(startIdx + linkMatch[0].length);
            } else {
              parts.push(<span key={`text-${keyCounter++}`}>{currentStr}</span>);
              break;
            }
          }
          return parts;
        };

        const parsedContent = parseLineContent(trimmed);

        if (isBullet) {
          return (
            <div key={lIdx} className="flex items-start gap-2 pl-2">
              <span className="text-[#B600A8] font-bold p-0.5 select-none">•</span>
              <span>{parsedContent}</span>
            </div>
          );
        }

        if (trimmed === "") {
          return <div key={lIdx} className="h-2" />;
        }

        return <p key={lIdx}>{parsedContent}</p>;
      })}
    </div>
  );
}

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "initial-msg",
      role: "assistant",
      content: "Hello! I am Keyur's Portfolio AI Coach. 🙋‍♂️\nAsk me anything regarding Keyur's Computer Science background, machine learning research paper, certified skillsets, or projects! How can I assist you today?",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasNewMessages, setHasNewMessages] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [apiKeyValue, setApiKeyValue] = useState<string>(() => {
    try {
      return localStorage.getItem("custom_gemini_api_key") || "";
    } catch (_) {
      return "";
    }
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const lastMessageRef = useRef<HTMLDivElement>(null);
  const lastScrolledIdRef = useRef<string | null>(null);

  // Auto-scroll on new messages
  useEffect(() => {
    if (messages.length > 1) {
      const lastMsg = messages[messages.length - 1];
      if (lastMsg.role === "assistant") {
        // Scroll to the start/top position of the new assistant message once
        if (lastScrolledIdRef.current !== lastMsg.id) {
          if (lastMessageRef.current && messagesContainerRef.current) {
            messagesContainerRef.current.scrollTo({
              top: lastMessageRef.current.offsetTop - 12,
              behavior: "smooth"
            });
            lastScrolledIdRef.current = lastMsg.id;
          }
        }
      } else {
        // Scroll to the absolute bottom for user's own sent message
        if (messagesEndRef.current) {
          messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
      }
    } else {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [messages]);

  // Handle active loading dots view visibility
  useEffect(() => {
    if (isLoading && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [isLoading]);

  // Handle message sending
  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: textToSend,
    };

    setInputValue("");
    setIsLoading(true);

    // Prepare placeholder assistant message
    const assistantMsgId = `ai-${Date.now()}`;
    const placeholderAssistantMsg: Message = {
      id: assistantMsgId,
      role: "assistant",
      content: "",
    };

    // Update messages to include user message and starting placeholder
    setMessages((prev) => [...prev, userMsg, placeholderAssistantMsg]);

    try {
      // Map entire history for context continuity (excluding the last empty prompt placeholder)
      const apiPayload = {
        messages: [...messages, userMsg].map((m) => ({
          role: m.role,
          content: m.content,
        })),
      };

      const storedKey = localStorage.getItem("custom_gemini_api_key") || "";
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };
      if (storedKey) {
        headers["x-gemini-key"] = storedKey;
      }

      const response = await fetch("/api/chat", {
        method: "POST",
        headers,
        body: JSON.stringify(apiPayload),
      });

      if (!response.ok) {
        const errText = await response.text();
        let errMsg = "Brain server returned an error";
        try {
          const parsedJSON = JSON.parse(errText);
          if (parsedJSON.error) {
            errMsg = parsedJSON.error;
          }
        } catch (_) {
          if (errText) {
            errMsg = errText;
          }
        }
        throw new Error(errMsg);
      }

      // Check if response is standard JSON (such as Vercel serverless / non-streaming backends)
      const contentType = response.headers.get("content-type") || "";
      if (contentType.includes("application/json")) {
        const data = await response.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantMsgId
              ? { ...msg, content: data.reply || "I was unable to retrieve a response at this time." }
              : msg
          )
        );
        setIsLoading(false);
        return;
      }

      if (!response.body) {
        throw new Error("Streaming body not accessible");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let done = false;
      let buffer = "";

      setIsLoading(false); // remove loader dots as soon as stream starts

      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;
        if (value) {
          buffer += decoder.decode(value, { stream: !done });
          // Split into lines (either \r\n or \n) to handle SSE chunks robustly
          const lines = buffer.split(/\r?\n/);
          // Keep the last incomplete line in buffer
          buffer = lines.pop() || "";

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed || !trimmed.startsWith("data: ")) continue;
            
            const dataStr = trimmed.substring(6).trim();
            if (dataStr === "[DONE]") {
              break;
            }

            try {
              const parsed = JSON.parse(dataStr);
              if (parsed.error) {
                throw new Error(parsed.error);
              }
              if (parsed.text) {
                setMessages((prev) =>
                  prev.map((msg) =>
                    msg.id === assistantMsgId
                      ? { ...msg, content: msg.content + parsed.text }
                      : msg
                  )
                );
              }
            } catch (e) {
              console.error("Error processing stream line:", e, dataStr);
            }
          }
        }
      }
    } catch (err) {
      console.error("Chatbot API error, falling back to local portfolio system:", err);
      
      // Retrieve the response from local portfolio rules for Keyur Kalathiya
      const localAnswer = getLocalReply(textToSend);
      
      // Deactivate global loader dot indicators and simulate custom typing/streaming interface
      setIsLoading(false);
      let currentLocText = "";
      const words = localAnswer.split(/\s+/);
      let wordIdx = 0;
      
      const typingTimer = setInterval(() => {
        if (wordIdx < words.length) {
          currentLocText += (wordIdx === 0 ? "" : " ") + words[wordIdx];
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantMsgId
                ? { ...msg, content: currentLocText }
                : msg
            )
          );
          wordIdx++;
        } else {
          clearInterval(typingTimer);
        }
      }, 15);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChatHistory = () => {
    setMessages([
      {
        id: `initial-reset-${Date.now()}`,
        role: "assistant",
        content: "Fresh session loaded! 🌿 What would you like to know about Keyur Kalathiya?",
      },
    ]);
  };

  return (
    <>
      {/* Floating Sparkle/Chat Trigger Button */}
      <div className="fixed bottom-6 right-6 z-40 select-none">
        <motion.button
          id="chatbot-trigger-btn"
          aria-label="Open portfolio AI Coach"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.93 }}
          onClick={() => {
            setIsOpen((prev) => !prev);
            setHasNewMessages(false);
          }}
          className="relative group p-4 rounded-full border border-white/10 hover:border-[#B600A8]/50 text-white cursor-pointer shadow-2xl flex items-center justify-center"
          style={{
            background: "linear-gradient(135deg, #18001F 0%, #B600A8 100%)",
            boxShadow: "0px 8px 30px rgba(182, 0, 168, 0.4), inset 4px 4px 12px rgba(255, 92, 226, 0.3)",
          }}
        >
          {/* Notification Alert Dot */}
          {hasNewMessages && !isOpen && (
            <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF5CE2] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-red-500 border border-white/20"></span>
            </span>
          )}

          {isOpen ? (
            <X className="w-6 h-6 animate-spin-once" />
          ) : (
            <div className="flex items-center gap-1.5">
              <MessageSquare className="w-6 h-6" />
              <span className="text-xs uppercase tracking-widest font-black max-w-0 group-hover:max-w-28 overflow-hidden transition-all duration-300 pr-0 group-hover:pr-1 inline-none whitespace-nowrap">
                Ask AI
              </span>
            </div>
          )}
        </motion.button>
      </div>

      {/* Chat Interface Panel overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="chatbot-expanded-panel"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 25, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            className="fixed bottom-24 right-4 sm:right-6 z-40 w-[calc(100vw-32px)] sm:w-[410px] h-[550px] max-h-[calc(100vh-120px)] bg-[#101014]/98 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden leading-normal text-white"
          >
            {/* Header Area */}
            <div 
              className="px-4 py-3.5 border-b border-white/5 flex items-center justify-between"
              style={{ background: "linear-gradient(90deg, #131317 0%, #201124 100%)" }}
            >
              <div className="flex items-center gap-2.5">
                <div className="relative w-9 h-9 rounded-xl bg-[#B600A8]/20 border border-[#B600A8]/30 flex items-center justify-center text-white">
                  <Bot className="w-5 h-5 text-[#FF5CE2]" />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-[#101014]" />
                </div>
                <div>
                  <h3 className="text-sm font-bold tracking-tight uppercase flex items-center gap-1">
                    Keyur's Portfolio AI Coach <Sparkles className="w-3.5 h-3.5 text-[#FF5CE2]" />
                  </h3>
                  <p className="text-[10px] text-white/50 tracking-wider flex items-center gap-1">
                    Powered by Gemini 3.5-Flash
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                {/* API Settings Gear */}
                <button
                  onClick={() => setShowSettings((prev) => !prev)}
                  title="API Key Settings"
                  className={`p-1 px-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1 text-xs ${showSettings ? "text-[#FF5CE2] bg-white/10" : "text-white/50 hover:text-white hover:bg-white/5"}`}
                >
                  <Settings className="w-3.5 h-3.5" />
                </button>
                {/* Clear Session */}
                <button
                  id="chatbot-reset-btn"
                  onClick={clearChatHistory}
                  title="Clear history"
                  className="p-1 px-1.5 hover:text-white hover:bg-white/5 text-white/50 rounded-lg transition-all text-xs flex items-center gap-1 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
                {/* Close Widget button */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 px-1.5 hover:text-white hover:bg-white/5 text-white/50 rounded-lg transition-all cursor-pointer"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* API Settings Pane */}
            {showSettings && (
              <div className="bg-[#16161c] border-b border-white/5 p-3.5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white tracking-wide">Custom Gemini API Key</span>
                  <span className="text-[9px] font-bold text-[#FF5CE2] uppercase tracking-wider bg-[#FF5CE2]/10 px-1.5 py-0.5 rounded border border-[#FF5CE2]/20">
                    Local Storage
                  </span>
                </div>
                <p className="text-[11px] text-white/60 leading-relaxed">
                  To chat instantly without configuring Vercel environment variables, paste your personal Gemini API key here. It remains secure inside your local browser storage.
                </p>
                <div className="flex gap-2">
                  <input
                    type="password"
                    value={apiKeyValue}
                    onChange={(e) => {
                      const val = e.target.value.trim();
                      setApiKeyValue(val);
                      if (val) {
                        try {
                          localStorage.setItem("custom_gemini_api_key", val);
                        } catch (_) {}
                      } else {
                        try {
                          localStorage.removeItem("custom_gemini_api_key");
                        } catch (_) {}
                      }
                    }}
                    placeholder="AI_... (Gemini API Key)"
                    className="flex-1 px-2.5 py-1.5 text-xs bg-black/40 border border-white/10 rounded-lg outline-none focus:border-[#B600A8]/50 text-white placeholder-white/20 select-text"
                  />
                  {apiKeyValue && (
                    <button
                      onClick={() => {
                        setApiKeyValue("");
                        try {
                          localStorage.removeItem("custom_gemini_api_key");
                        } catch (_) {}
                      }}
                      className="px-2.5 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-lg transition-all text-[11px] font-medium cursor-pointer"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Conversation Flow Area */}
            <div ref={messagesContainerRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10">
              {messages.map((m, index) => {
                const isAI = m.role === "assistant";
                const isLast = index === messages.length - 1;
                return (
                  <div
                    key={m.id}
                    ref={isLast ? lastMessageRef : undefined}
                    className={`flex items-start gap-2.5 max-w-[85%] ${isAI ? "mr-auto" : "ml-auto flex-row-reverse"}`}
                  >
                    {/* Icon tag */}
                    <div className={`w-7 h-7 rounded-lg shrink-0 flex items-center justify-center border text-[10px] ${
                      isAI 
                        ? "bg-[#180C1E] border-[#B600A8]/30 text-[#FF5CE2]" 
                        : "bg-white/10 border-white/10 text-white"
                    }`}>
                      {isAI ? <Bot className="w-4 h-4" /> : <User className="w-3.5 h-3.5" />}
                    </div>

                    <div className="space-y-1">
                      {/* Bubble Text */}
                      <div className={`rounded-xl px-3.5 py-2.5 rounded-tl-none ${
                        isAI 
                          ? "bg-[#16161C] border border-white/5 text-white/95" 
                          : "bg-[#B600A8]/20 border border-[#B600A8]/30 text-white"
                      }`}>
                        <FormattedMessage text={m.content} />
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Loader Bouncing Dots */}
              {isLoading && (
                <div className="flex items-start gap-2.5 max-w-[85%] mr-auto">
                  <div className="w-7 h-7 rounded-lg shrink-0 flex items-center justify-center bg-[#180C1E] border border-[#B600A8]/30 text-[#FF5CE2]">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="bg-[#16161C] border border-white/5 rounded-xl px-4 py-3 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#FF5CE2] animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 rounded-full bg-[#FF5CE2] animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 rounded-full bg-[#FF5CE2] animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}

              {/* Message Anchor for auto-scroll */}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Prompts Area */}
            {messages.length === 1 && !isLoading && (
              <div className="px-4 pb-2 pt-1 border-t border-white/5 bg-[#0A0A0C]/40">
                <span className="text-[9px] uppercase tracking-wider text-white/45 font-bold block mb-1.5 select-none">
                  Suggested Prompts:
                </span>
                <div id="cb-suggestions-container" className="flex flex-wrap gap-1.5">
                  {SUGGESTED_PROMPTS.map((prompt) => (
                    <button
                      id={`suggested-prompt-btn-${prompt.id}`}
                      key={prompt.id}
                      onClick={() => handleSendMessage(prompt.text)}
                      className="text-[11px] bg-white/5 hover:bg-[#B600A8]/10 hover:border-[#B600A8]/30 border border-white/5 rounded-full px-2.5 py-1 text-left text-white/80 hover:text-[#FF5CE2] transition-all cursor-pointer whitespace-nowrap overflow-hidden text-ellipsis max-w-full"
                    >
                      {prompt.text}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Footer Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputValue);
              }}
              className="p-3 border-t border-white/5 bg-[#0C0C0E] flex items-center gap-2"
            >
              <input
                id="chatbot-input-field"
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask something about Keyur..."
                className="flex-1 bg-[#15151A] border border-white/10 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#B600A8] transition-all"
                disabled={isLoading}
              />
              <button
                id="chatbot-send-btn"
                type="submit"
                disabled={!inputValue.trim() || isLoading}
                className="p-2.5 rounded-xl bg-[#B600A8] hover:bg-[#B600A8]/80 text-white disabled:opacity-40 disabled:hover:bg-[#B600A8] transition-all shrink-0 cursor-pointer flex items-center justify-center border border-white/10"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
