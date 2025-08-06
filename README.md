# 📢 Broadcasting Chat App (WebSocket)

This is a simple **real-time chat application** built using **React (frontend)** and **WebSocket (backend)**.  
Users can join a **room**, and any message sent by one user is **broadcasted to all members present in the same room**.

---

## 🚀 Features
- Join chat rooms.
- Real-time message broadcasting using WebSockets.
- Message display with auto-updates.
- Clean UI with Tailwind CSS.
- WebSocket connection cleanup on unmount.

---

## 🛠️ Tech Stack
- **Frontend:** React, Tailwind CSS  
- **Backend:** Node.js, WebSocket (ws)  
- **Protocol:** WebSocket  

---

# WebSockets

WebSockets provide **persistent, full-duplex communication** between a client and a server over a single TCP connection.  
Unlike HTTP (which is request/response-based), WebSockets enable real-time data transfer in both directions without re-establishing the connection.

---

## Key Points
- Protocol: **ws://** (or **wss://** for secure connections)
- Uses a **single TCP connection**
- Supports **event-driven communication**
- Commonly used for **chat apps, live notifications, multiplayer games**, etc.

---

## Polling vs Long Polling vs WebSockets

| Feature          | Polling                     | Long Polling                    | WebSockets                |
|-----------------|---------------------------|---------------------------------|---------------------------|
| Connection      | Multiple HTTP requests    | HTTP request held until data    | Single persistent TCP     |
| Latency         | High                      | Medium                          | Very Low (real-time)      |
| Server Load     | High                      | Medium                          | Low                       |
| Best Use Case   | Rare updates              | Occasional updates              | Real-time apps            |

---

## Libraries for WebSockets
- [websocket](https://www.npmjs.com/package/websocket) – Simple WebSocket library.
- [ws](https://github.com/websockets/ws) – Popular lightweight WebSocket library for Node.js.
- [socket.io](https://socket.io/) – WebSocket wrapper with fallbacks (polling, etc.) and extra features like rooms, namespaces, and broadcasting.

---

## Initialize Project with `ws`
```bash
# Create a new project
npm init -y

# Initialize TypeScript
npx tsc --init

# Install dependencies
npm i ws @types/ws
```

```
https://www.npmjs.com/package/ws
```

# Scaling
## Pub Sub
