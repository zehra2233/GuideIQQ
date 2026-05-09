import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import "./Announcechatbox.css";

function Announcechatbox() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      text: "Welcome to the GuideIQ . What information can I help you find today?",
      sender: "assistant",
  },
  ]);

  const [fromButton, setFromButton] = useState(false);
  const [showQuestions, setShowQuestions] = useState(false);

  const handleSend = () => {
    if (!fromButton || !message.trim()) return;

    setMessages((prev) => [
      ...prev,
      { text: message, sender: "user" },
    ]);

    setMessage("");
    setFromButton(false);
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
        <span className="change-university">Change University</span>
      </header>

      {/* BODY */}
      <div className="page-body">
        <Sidebar />

        <div className="page-content">
          <div className="chat-wrapper">
            <div className="chat-messages">
              {messages.map((msg, index) => (
                <div key={index} className={`chat-row ${msg.sender}`}>
                  <div className={`chat-bubble ${msg.sender}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
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

      {/* 🔥 CENTER POPUP */}
      {showQuestions && (
        <div
          className="popup-overlay"
          onClick={() => setShowQuestions(false)}
        >
          <div
            className="common-questions popup"
            onClick={(e) => e.stopPropagation()}
          >
            <h4>Select A Question To Ask</h4>

            <button onClick={() => handleCommonQuestion(
              "Are there any campus events happening this Friday?"
            )}>
              Are there any campus events happening this Friday?
            </button>

            <button onClick={() => handleCommonQuestion(
              "What is the final deadline to drop a course?"
            )}>
              What is the final deadline to drop a course?
            </button>

            <button onClick={() => handleCommonQuestion(
              "Is the Library open on the holiday next Monday?"
            )}>
              Is the Library open on the holiday next Monday?
            </button>

<button onClick={() => handleCommonQuestion(
              "What changes have been announced regarding lectures, exams, or schedules?"
            )}>
What changes have been announced regarding lectures, exams, or schedules?
            </button>

            <button onClick={() => handleCommonQuestion(
              "When are the tuition fee payment start and deadline dates?"
            )}>
When are the tuition fee payment start and deadline dates?            </button>

              <button onClick={() => handleCommonQuestion(
              "Has the university announced any campus closures?"
            )}>
Has the university announced any campus closures?
            </button>
             <button onClick={() => handleCommonQuestion(
              "Has the university announced any campus closures?"
            )}>
What are the latest university announcements?
            </button>

          </div>
        </div>
      )}
    </>
  );
}

export default Announcechatbox;