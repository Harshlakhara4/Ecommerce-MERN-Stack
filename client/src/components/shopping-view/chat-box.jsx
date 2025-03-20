import { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";
import { Send, X } from "lucide-react";

// Connect to WebSocket server
const socket = io("https://ecommerce-mern-stack-335t.onrender.com", {
  transports: ["websocket"],
});



function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Listen for AI messages
useEffect(() => {
  socket.on("connect", () => {
    console.log("✅ WebSocket Connected:", socket.id);
  });

  socket.on("disconnect", () => {
    console.log("❌ WebSocket Disconnected");
  });

  socket.on("receiveMessage", (newMessage) => {
    console.log("📩 Received Message:", newMessage);
    setMessages((prev) => [...prev, newMessage]); // Update chat UI
  });

  return () => {
    socket.off("connect");
    socket.off("disconnect");
    socket.off("receiveMessage");
  };
}, []);


  useEffect(() => {
    console.log(`ChatBox is now ${isOpen ? "OPEN" : "CLOSED"}`);
  }, [isOpen]);

console.log("Current isOpen state:", isOpen);

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

  console.log("harsh");

  return (
  <div>
      {/* Chat Toggle Button - Fixed on the Left Side */}
      <button
        className="fixed left-4 bottom-16 bg-blue-600 text-white px-4 py-3 rounded-full shadow-lg flex items-center gap-2 hover:bg-blue-700 transition-all duration-300 z-[99999]"
        onClick={() => setIsOpen(!isOpen)}
      >
        💬 Chat with Us
      </button>

      {/* Chat Box - Left Side Fixed & Always on Top */}
      {isOpen && (
        <div
          className="fixed left-4 bottom-24 w-80 z-[99999] bg-white border rounded-lg shadow-xl p-4 pointer-events-auto"
        >
          {/* Chat Header */}
          <div className="flex justify-between items-center border-b pb-2">
            <h3 className="text-lg font-semibold">Chat with us</h3>
            <X className="cursor-pointer text-gray-500 hover:text-black" onClick={() => setIsOpen(false)} />
          </div>

          {/* Message Display */}
          <div className="h-60 overflow-y-auto mt-2 p-2 space-y-2 bg-gray-100 rounded-md">
            {messages.length === 0 ? (
              <p className="text-gray-500 text-center">Say something to start chatting!</p>
            ) : (
              messages.map((msg, index) => (
                <div
                  key={index}
                  className={`p-2 rounded-lg ${msg.sender === "user" ? "bg-blue-200 text-right" : "bg-gray-200 text-left"}`}
                >
                  {msg.text}
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
              className="ml-2 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
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
