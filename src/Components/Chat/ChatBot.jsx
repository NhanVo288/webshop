import { useEffect, useState, useRef } from "react";
import axios from "axios";
import ChatbotIcon from "./ChatBotIcon.jsx";
import ChatForm from "./ChatForm.jsx";
import ChatMessage from "./ChatMessage.jsx";
import './index.css'

const ChatBot = ({ apiKey }) => {
  const [chatHistory, setChatHistory] = useState([]);
  const [showChatbot, setShowChatbot] = useState(false);
  const chatBodyRef = useRef();

  const generateBotResponse = async (history) => {
  const updateHistory = (text) => {
    setChatHistory((prev) => [
      ...prev.filter((msg) => msg.text !== "Thinking..."),
      { role: "model", text },
    ]);
  };

  try {
    // Giới hạn history để không ăn token
    const messages = history
      .slice(-6)
      .map(({ role, text }) => ({
        role: role === "model" ? "assistant" : "user",
        content: text,
      }));

    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.3-70b-versatile",
        messages,
        temperature: 0.7,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer`,
        },
      }
    );

    const botText =
      response.data.choices[0]?.message?.content || " Bot không trả lời được";

    updateHistory(botText);
  } catch (error) {
    console.error("Groq error:", error);

    updateHistory(" Bot đang bận, thử lại sau nhé!");
  }
};


  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTo({
        top: chatBodyRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [chatHistory]);

  return (
    <>
      <div className={`container ${showChatbot ? "show" : ""}`}>
        <button onClick={() => setShowChatbot(!showChatbot)} id="chatbot-toggler">
          <span className="material-symbols-rounded">
            {showChatbot ? "close" : "mode_comment"}
          </span>
        </button>

        <div className="chatbot-popup">
          <div className="chat-header">
            <div className="header-info">
              <ChatbotIcon />
              <h3>ChatBot</h3>
              <p>Online</p>
            </div>
            <button
              onClick={() => setShowChatbot(false)}
              className="material-symbols-rounded"
            >
              close
            </button>
          </div>

          <div ref={chatBodyRef} className="chat-body">
            <div className="message bot-message">
              <ChatbotIcon />
              <p className="message-text">
                Hey there 🧐 <br /> How can I assist you today?
              </p>
            </div>

            {chatHistory.map((chat, index) => (
              <ChatMessage key={index} chat={chat} />
            ))}
          </div>

          <div className="chat-footer">
            <ChatForm
              chatHistory={chatHistory}
              setChatHistory={setChatHistory}
              generateBotResponse={generateBotResponse}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatBot;
