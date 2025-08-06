import { useEffect, useRef, useState } from 'react';
import './App.css';

function App() {
  const [messages, setMessages] = useState(["hii there", "hello"]);
  const wsRef = useRef(null);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");

    ws.onopen = () => {
      ws.send(JSON.stringify({
        type: "join",
        payload: { roomId: "red" }
      }));
    };

    ws.onmessage = (event) => {
      setMessages((prev) => [...prev, event.data]);
    };

    wsRef.current = ws;

    return () => {
      ws.close(); // Cleanup on component unmount
    };
  }, []);

  const sendMessage = () => {
    const input = document.getElementById("msg");
    const message = input?.value.trim();

    if (message && wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({
        type: "chat",
        payload: { message }
      }));
      input.value = ""; // Clear input
    }
  };

  return (
    <div className="h-screen bg-gray-900 flex flex-col">
      {/* Messages area */}
      <div className="flex-1 bg-gray-800 p-4 overflow-y-auto border-b border-gray-700">
        {messages.map((msg, index) => (
          <div key={index} className="mb-2 bg-gray-700 p-2 rounded-md max-w-xs">
            <span>{msg}</span>
          </div>
        ))}
      </div>

      {/* Input area */}
      <div className="flex p-3 bg-gray-800 border-t border-gray-700">
        <input
          type="text"
          id="msg"
          placeholder="Type a message..."
          className="flex-1 p-2 rounded-l-md bg-gray-700 text-white outline-none placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
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
