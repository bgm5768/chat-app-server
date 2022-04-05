const express = require("express");
const { Server } = require("socket.io");
const { createServer } = require("http");

const roomMgr = require('./roomManger');

const registerRoomHandler = require("./eventHandler/roomHandler");
const registerChatHandler = require("./eventHandler/chatHandler");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: ["http://112.171.31.123:3002" , "https://nonamed.vercel.app/"],
    // or with an array of origins
    // origin: ["https://my-frontend.com", "https://my-other-frontend.com", "http://localhost:3000"],
    credentials: true
  }
});


const chatNsp = io.of("/chat");

const onChatConnection = ( socket ) => {
  registerChatHandler( chatNsp , socket , roomMgr, io );
}
chatNsp.on("connection" , onChatConnection);


const roomNsp = io.of("/rooms");
const onRoomConnection = ( socket ) => {
  registerRoomHandler( roomNsp , socket , roomMgr );
}
roomNsp.on("connection" , onRoomConnection);


io.listen(8080);