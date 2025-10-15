import { useEffect, useRef, useState } from 'react';
import './App.css';

interface WSMessage {
  type: string;
  payload: any;
}

function App() {
  const [messages, setMessages] = useState<string[]>(["hii there", "hello"]);
  const wsRef = useRef<WebSocket | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    // Dynamic WebSocket URL
    const wsUrl =
      window.location.hostname === "localhost"
        ? "ws://localhost:8080"
        : "wss://broadcasting-chat-app.onrender.com";

    const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          type: "join",
          payload: { roomId: "red" }
        })
      );
    };

    ws.onmessage = (event) => {
      try {
        const data: WSMessage = JSON.parse(event.data);
        if (data.type === "chat") {
          setMessages((prev) => [...prev, data.payload.message]);
        } else {
          setMessages((prev) => [...prev, event.data]);
        }
      } catch {
        setMessages((prev) => [...prev, event.data]);
      }
    };

    wsRef.current = ws;

    return () => {
      ws.close();
    };
  }, []);

  const sendMessage = () => {
    const message = inputRef.current?.value.trim();
    if (message && wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(
        JSON.stringify({
          type: "chat",
          payload: { message }
        })
      );
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') sendMessage();
  };

  return (
    <div className="h-screen bg-gray-900 flex flex-col">
      {/* Messages area */}
      <div className="flex-1 bg-gray-800 p-4 overflow-y-auto border-b border-gray-700">
        {messages.map((msg, index) => (
          <div
            key={index}
            className="mb-2 bg-gray-700 p-2 rounded-md max-w-xs"
          >
            <span>{msg}</span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="flex p-3 bg-gray-800 border-t border-gray-700">
        <input
          ref={inputRef}
          type="text"
          placeholder="Type a message..."
          className="flex-1 p-2 rounded-l-md bg-gray-700 text-white outline-none placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
          onKeyDown={handleKeyPress}
        />
        <button
          className="bg-blue-500 text-white px-6 rounded-r-md hover:bg-blue-600 transition"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default App;
