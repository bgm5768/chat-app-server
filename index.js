const express = require("express");
const { Server } = require("socket.io");
const { createServer } = require("http");

const roomMgr = require('./src/roomManger');

const registerRoomHandler = require("./src/eventHandler/roomHandler");
const registerChatHandler = require("./src/eventHandler/chatHandler");

const port = process.env.PORT || 8080;
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: ["http://112.171.31.123:3002" , "https://nonamed.vercel.app"],
    // or with an array of origins
    // origin: ["https://my-frontend.com", "https://my-other-frontend.com", "http://localhost:3000"],
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


httpServer.listen(port , () => {
  console.log(`SERVER IS RUNNING IN PORT ${port}`);
});