import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });

let userCount = 0;

interface User {
    socket: WebSocket;
    room: string;
}


let allSockets: User[] = [];

wss.on("connection", (socket) => {

    userCount = userCount + 1;

    console.log("User Connected # " + userCount);
    

    socket.on("message", (message) => {
        const parseMessage =  JSON.parse(message as unknown as string);
        if(parseMessage.type === "join") {
            allSockets.push({
                socket,
                room:parseMessage.payload.roomId
            })
        }

        if(parseMessage.type == "chat") {
            let currUserRoom = null;

            for(let i = 0; i < allSockets.length; i++) {
                if(allSockets[i].socket == socket) {
                    currUserRoom = allSockets[i].room
                }
            }

            for(let i = 0; i < allSockets.length; i++) {
                if(allSockets[i].room == currUserRoom) {
                    allSockets[i].socket.send(parseMessage.payload.message)
                }
            }
        }

    })

})