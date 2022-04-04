const uuid = require("uuid");

module.exports = ( roomNsp , socket , roomMgr ) => {

    console.log("roomNsp sock size : " + roomNsp.sockets.size)
    
    socket.emit("roomlist", roomMgr.getRoomsList());

    const createRoom = (payload) => {
        roomMgr.add( 
            {
                roomUid: uuid.v4(),
                info : {
                    owner: payload.userName ,
                    roomCountMembers: 0,
                    roomMembers: [],
                    roomName: payload.roomName,
                }
            }
        )
        socket.emit("roomlist", roomMgr.getRoomsList());
        socket.broadcast.emit("roomlist", roomMgr.getRoomsList());
    }
  
  
    socket.on("createRoom", createRoom);
  }