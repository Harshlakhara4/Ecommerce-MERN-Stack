import { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";
import { Send, X } from "lucide-react";

// Connect to WebSocket server
const socket = io("https://ecommerce-mern-stack-335t.onrender.com");

function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Listen for AI messages
useEffect(() => {
  console.log("Connecting to WebSocket...");
  socket.on("connect", () => {
    console.log("✅ WebSocket connected:", socket.id);
  });

  socket.on("disconnect", () => {
    console.log("❌ WebSocket disconnected");
  });

  socket.on("receiveMessage", (newMessage) => {
    console.log("📩 Message received:", newMessage);
    setMessages((prev) => [...prev, newMessage]);
  });

  return () => {
    socket.off("receiveMessage");
    socket.off("connect");
    socket.off("disconnect");
  };
}, []);


  async function sendMessage() {
    if (!message.trim()) return;

    const newMessage = { sender: "user", text: message };
    setMessages((prev) => [...prev, newMessage]); // Show user message
    setMessage("");
    setLoading(true);

    try {
      const { data } = await axios.post("https://ecommerce-mern-stack-335t.onrender.com/api/chat/message", {
        message,
      });

      const aiMessage = { sender: "bot", text: data.reply || "⚠️ AI did not respond." };
      socket.emit("sendMessage", aiMessage); // Send AI response to socket
      setMessages((prev) => [...prev, aiMessage]); // Show AI response
    } catch (error) {
      console.error("Error getting AI response", error);
      setMessages((prev) => [...prev, { sender: "bot", text: "⚠️ AI is unavailable." }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      {/* Chat Toggle Button - Left Center */}
      <button
        className="fixed left-4 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        💬 Chat with Us
      </button>

      {/* Chat Box - Bigger Size (Left Center) */}
      {isOpen && (
        <div className="fixed left-10 top-1/2 transform -translate-y-1/2 w-96 bg-white border rounded-lg shadow-lg p-4">
          {/* Chat Header */}
          <div className="flex justify-between items-center border-b pb-2">
            <h3 className="text-lg font-semibold">Chat with us</h3>
            <X className="cursor-pointer" onClick={() => setIsOpen(false)} />
          </div>

          {/* Message Display (Increased Height) */}
          <div className="h-48 overflow-y-auto mt-2 p-2 space-y-2 bg-gray-100 rounded-md">
            {messages.length === 0 ? (
              <p className="text-gray-500 text-center">Say something to start chatting!</p>
            ) : (
              messages.map((msg, index) => (
                <div
                  key={index}
                  className={`p-2 rounded-lg ${msg.sender === "user" ? "bg-blue-200 text-right" : "bg-gray-200 text-left"}`}
                >
                  <strong>{msg.sender === "user" ? "" : ""}:</strong> {msg.text}
                </div>
              ))
            )}
            {loading && <p className="text-gray-500">Typing...</p>}
          </div>

          {/* Message Input */}
          <div className="flex mt-2 border-t pt-2">
            <input
              type="text"
              className="flex-1 border p-2 rounded-lg"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              className="ml-2 bg-blue-500 text-white p-2 rounded-lg"
              onClick={sendMessage}
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatBox;
