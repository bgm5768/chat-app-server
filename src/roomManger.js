module.exports = (() => {
    let roomDataList = [];
    let roomUidList = [];
  
    return {
      add: function(roomData) {
        roomDataList.push(roomData);
        roomUidList.push(roomData.roomUid)
      },
      remove: function(roomData) {
        //remove room data
      },
      getRoomsList: function() {
        return roomDataList;
      },
      getRoomUidList: function() {
        return roomUidList;
      },
      isRoomExists: function(uid) {
        let isExistRoom = false;
  
        for (idx = 0; idx < roomUidList.length; ++idx) {
          if (uid === roomUidList[idx] ) {
            isExistRoom = true;
            break;
          } else {
            isExistRoom = false;
          }
        }
        return isExistRoom;
      },
      
    };
  })();