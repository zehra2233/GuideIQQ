import React, { useState, useEffect, useRef } from "react";
import Sidebar from "../../components/Sidebar";
import "./Announcechatbox.css";
import uskudarLogo from "../../assets/uskudar.png";
import { db } from "../../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

function Announcechatbox() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      text: "Welcome to the GuideIQ. What information can I help you find today?",
      sender: "assistant",
    },
  ]);

  const [fromButton, setFromButton] = useState(false);
  const [showQuestions, setShowQuestions] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef(null);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Load Announcement questions from Firestore
  useEffect(() => {
    async function fetchQuestions() {
      try {
        const q = query(
          collection(db, "questions"),
          where("category", "==", "Announcement")
        );
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setQuestions(data);
      } catch (err) {
        console.error("Error fetching questions:", err);
      }
      setLoading(false);
    }
    fetchQuestions();
  }, []);

  const handleSend = () => {
    if (!fromButton || !message.trim()) return;

    const found = questions.find(q => q.question === message);
    const fullAnswer = found
      ? found.answer
      : "I'm sorry, I don't have an answer for that question.";

    setMessages((prev) => [
      ...prev,
      { text: message, sender: "user" },
      { text: "", sender: "assistant", typing: true }
    ]);

    setMessage("");
    setFromButton(false);

    // Typing animation — letter by letter
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          text: fullAnswer.slice(0, i),
          sender: "assistant",
          typing: i < fullAnswer.length
        };
        return updated;
      });
      if (i >= fullAnswer.length) clearInterval(interval);
    }, 30);
  };

  const handleCommonQuestion = (question) => {
    setMessage(question);
    setFromButton(true);
    setShowQuestions(false);
  };

  return (
    <>
      {/* HEADER */}
      <header className="main-header">
        Guide<span className="iq">IQ</span>
      </header>

      {/* BODY */}
      <div className="ann-page-body">
        <Sidebar />

        <div className="ann-page-content">
          <div className="chat-wrapper">
            <div className="chat-messages">
              {messages.map((msg, index) => (
                <div key={index} className={`chat-row ${msg.sender}`}>
                  {msg.sender === "assistant" && (
                    <img src={uskudarLogo} alt="Üsküdar" className="chat-avatar" />
                  )}
                  <div className={`chat-bubble ${msg.sender}`} style={{ whiteSpace: "pre-wrap" }}>
                    {msg.text}
                    {msg.typing && (
                      <span style={{
                        display: "inline-block",
                        width: "2px",
                        height: "15px",
                        background: "#333",
                        marginLeft: "2px",
                        verticalAlign: "middle",
                        animation: "blink 0.7s infinite"
                      }} />
                    )}
                  </div>
                  {msg.sender === "user" && (
                    <div className="chat-user-avatar">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                        <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
                      </svg>
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* INPUT */}
            <div className="chat-input">
              <input
                type="text"
                value={message}
                placeholder="Select a question"
                readOnly
                onClick={() => setShowQuestions(true)}
              />
              <button className="send-btn" onClick={handleSend}>➤</button>
            </div>
          </div>
        </div>
      </div>

      {/* POPUP */}
      {showQuestions && (
        <div className="popup-overlay" onClick={() => setShowQuestions(false)}>
          <div className="common-questions popup" onClick={(e) => e.stopPropagation()}>
            <h4>Select A Question To Ask</h4>

            {loading ? (
              <p style={{ textAlign: "center", padding: "10px" }}>Loading...</p>
            ) : questions.length === 0 ? (
              <p style={{ textAlign: "center", padding: "10px" }}>No questions available.</p>
            ) : (
              questions.map((q) => (
                <button key={q.id} onClick={() => handleCommonQuestion(q.question)}>
                  {q.question}
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Announcechatbox;