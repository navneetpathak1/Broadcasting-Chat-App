"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8080 });
let userCount = 0;
let allSockets = [];
wss.on("connection", (socket) => {
    userCount = userCount + 1;
    console.log("User Connected # " + userCount);
    socket.on("message", (message) => {
        const parseMessage = JSON.parse(message);
        if (parseMessage.type === "join") {
            allSockets.push({
                socket,
                room: parseMessage.payload.roomId
            });
        }
        if (parseMessage.type == "chat") {
            let currUserRoom = null;
            for (let i = 0; i < allSockets.length; i++) {
                if (allSockets[i].socket == socket) {
                    currUserRoom = allSockets[i].room;
                }
            }
            for (let i = 0; i < allSockets.length; i++) {
                if (allSockets[i].room == currUserRoom) {
                    allSockets[i].socket.send(parseMessage.payload.message);
                }
            }
        }
    });
});
