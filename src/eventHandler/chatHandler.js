module.exports = ( chatNsp , socket , roomMgr , io ) => {

    console.log("chansp sock size : " + chatNsp.sockets.size)

    socket.on("disconnect" , () => {
        console.log("chansp sock size : " + chatNsp.sockets.size)
        console.log("disconn chat")
    })

    chatNsp.on("disconnect" , () => {
        console.log("disconn chatNsp")
      })
      

    const requestRoomJoin = (payload) => {
        if(roomMgr.isRoomExists(payload.uid)) {
            socket.join(payload.uid)

            chatNsp.to(payload.uid).emit('sysmsg', {
              nick: payload.nick , 
              message: "님이 방에 입장하였습니다."
            });
        }
    }

    const requestRoomLeave = (payload) => {
        socket.leave(payload.uid);

        chatNsp.to(payload.uid).emit('sysmsg', {
            nick: payload.nick , 
            message: "님이 방에서 퇴장하였습니다."
        });
    }

    const receive_message = (payload) => {
        chatNsp.to(payload.uid).emit('message',  {
            nick : payload.nick ,
            message : payload.message ,
            socketID : socket.id
          } );
    }
      

      socket.on("request_room_join", requestRoomJoin);
      socket.on("request_room_leave", requestRoomLeave);
      socket.on("message", receive_message);
}
