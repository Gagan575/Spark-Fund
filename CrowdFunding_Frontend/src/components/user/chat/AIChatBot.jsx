import { useState, useRef, useEffect } from "react";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function AIChatBot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "model",
      text: "👋 Hi! I'm **SparkBot**, your AI assistant for SparkFund.\n\nI can help you with:\n- How to submit or improve your startup idea\n- Understanding AI scores & investments\n- How the platform works\n\nAsk me anything!",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (open && bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open]);

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    const userMsg = { role: "user", text: trimmed };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    // Build history (exclude the initial greeting for cleaner context)
    const history = updatedMessages.slice(1).map((m) => ({
      role: m.role,
      text: m.text,
    }));

    try {
      const res = await axios.post(`${BASE_URL}/ai/chat`, {
        message: trimmed,
        history: history.slice(0, -1), // all except the current user message
      });

      if (res.data.success) {
        setMessages((prev) => [
          ...prev,
          { role: "model", text: res.data.data.reply },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "model", text: "Sorry, I couldn't process that. Please try again." },
        ]);
      }
    } catch (err) {
      console.error("AIChatBot error:", err);
      setMessages((prev) => [
        ...prev,
        { role: "model", text: "⚠️ Connection error. Please check your network." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        role: "model",
        text: "👋 Hi again! How can I help you with SparkFund today?",
      },
    ]);
  };

  // Render simple markdown-style bold (**text**)
  const renderText = (text) => {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) =>
      part.startsWith("**") && part.endsWith("**") ? (
        <strong key={i}>{part.slice(2, -2)}</strong>
      ) : (
        <span key={i}>{part}</span>
      )
    );
  };

  return (
    <div style={styles.wrapper}>
      {/* Floating Button */}
      {!open && (
        <button style={styles.fab} onClick={() => setOpen(true)} title="Ask SparkBot">
          🤖
        </button>
      )}

      {/* Chat Window */}
      {open && (
        <div style={styles.window}>
          {/* Header */}
          <div style={styles.header}>
            <div style={styles.headerLeft}>
              <span style={styles.botIcon}>🤖</span>
              <div>
                <div style={styles.botName}>SparkBot</div>
                <div style={styles.botStatus}>AI Assistant • Always Online</div>
              </div>
            </div>
            <div style={styles.headerActions}>
              <button style={styles.iconBtn} onClick={clearChat} title="Clear chat">
                🗑️
              </button>
              <button style={styles.iconBtn} onClick={() => setOpen(false)} title="Close">
                ✕
              </button>
            </div>
          </div>

          {/* Messages */}
          <div style={styles.messages}>
            {messages.map((msg, idx) => (
              <div
                key={idx}
                style={{
                  ...styles.msgRow,
                  justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                }}
              >
                {msg.role === "model" && (
                  <div style={styles.avatar}>🤖</div>
                )}
                <div
                  style={{
                    ...styles.bubble,
                    ...(msg.role === "user" ? styles.userBubble : styles.botBubble),
                  }}
                >
                  {msg.text.split("\n").map((line, i) => (
                    <div key={i}>{renderText(line)}</div>
                  ))}
                </div>
              </div>
            ))}

            {loading && (
              <div style={{ ...styles.msgRow, justifyContent: "flex-start" }}>
                <div style={styles.avatar}>🤖</div>
                <div style={{ ...styles.bubble, ...styles.botBubble, ...styles.typingBubble }}>
                  <span style={styles.dot} />
                  <span style={{ ...styles.dot, animationDelay: "0.2s" }} />
                  <span style={{ ...styles.dot, animationDelay: "0.4s" }} />
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div style={styles.inputArea}>
            <textarea
              style={styles.textarea}
              placeholder="Ask me about SparkFund..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={1}
              disabled={loading}
            />
            <button
              style={{
                ...styles.sendBtn,
                opacity: loading || !input.trim() ? 0.5 : 1,
              }}
              onClick={sendMessage}
              disabled={loading || !input.trim()}
            >
              ➤
            </button>
          </div>
          <div style={styles.hint}>Press Enter to send • Shift+Enter for new line</div>
        </div>
      )}

      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-6px); }
        }
      `}</style>
    </div>
  );
}

const BRAND = "#d4a762";
const BRAND_LIGHT = "#f8edd3";

const styles = {
  wrapper: {
    position: "fixed",
    bottom: 20,
    right: 90,
    zIndex: 10000,
  },
  fab: {
    width: 56,
    height: 56,
    borderRadius: "50%",
    background: BRAND,
    color: "#fff",
    fontSize: 24,
    border: "none",
    cursor: "pointer",
    boxShadow: "0 4px 16px rgba(212,167,98,0.4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  window: {
    width: 340,
    height: 500,
    background: "#fff",
    borderRadius: 14,
    boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },
  header: {
    background: BRAND,
    padding: "10px 14px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    color: "#fff",
  },
  headerLeft: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  botIcon: {
    fontSize: 28,
  },
  botName: {
    fontWeight: "bold",
    fontSize: 15,
  },
  botStatus: {
    fontSize: 11,
    opacity: 0.85,
  },
  headerActions: {
    display: "flex",
    gap: 6,
  },
  iconBtn: {
    background: "transparent",
    border: "none",
    color: "#fff",
    fontSize: 16,
    cursor: "pointer",
    padding: "2px 5px",
    borderRadius: 4,
  },
  messages: {
    flex: 1,
    overflowY: "auto",
    padding: "12px 10px",
    display: "flex",
    flexDirection: "column",
    gap: 8,
    background: "#f7fafa",
  },
  msgRow: {
    display: "flex",
    alignItems: "flex-end",
    gap: 6,
  },
  avatar: {
    fontSize: 20,
    flexShrink: 0,
  },
  bubble: {
    maxWidth: "78%",
    padding: "8px 12px",
    borderRadius: 14,
    fontSize: 13.5,
    lineHeight: 1.5,
    wordBreak: "break-word",
  },
  userBubble: {
    background: BRAND,
    color: "#fff",
    borderBottomRightRadius: 4,
  },
  botBubble: {
    background: "#fff",
    color: "#1a1a1a",
    border: "1px solid #ddd",
    borderBottomLeftRadius: 4,
  },
  typingBubble: {
    display: "flex",
    alignItems: "center",
    gap: 4,
    padding: "10px 14px",
  },
  dot: {
    display: "inline-block",
    width: 7,
    height: 7,
    borderRadius: "50%",
    background: BRAND,
    animation: "bounce 1s infinite",
  },
  inputArea: {
    display: "flex",
    padding: "8px 10px",
    gap: 8,
    borderTop: "1px solid #eee",
    background: "#fff",
    alignItems: "flex-end",
  },
  textarea: {
    flex: 1,
    resize: "none",
    border: "1px solid #ccc",
    borderRadius: 8,
    padding: "7px 10px",
    fontSize: 13,
    outline: "none",
    fontFamily: "inherit",
    maxHeight: 80,
    overflowY: "auto",
  },
  sendBtn: {
    background: BRAND,
    color: "#fff",
    border: "none",
    borderRadius: 8,
    width: 36,
    height: 36,
    fontSize: 16,
    cursor: "pointer",
    flexShrink: 0,
  },
  hint: {
    fontSize: 10,
    color: "#aaa",
    textAlign: "center",
    paddingBottom: 5,
    background: "#fff",
  },
};
