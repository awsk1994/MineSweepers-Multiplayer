// ========= Helper Functions =========
module.exports = {
  emitRoomsList: function(models, io){
    // Find easy rooms.
    models.Room.findAll({
      where: { difficulty: 0 }
    }).then(function(easyRooms, err){
      if(err){
        console.error("ERROR: Error has occured while getting all rooms with difficulty = 0.")
        return;
      } 

      // Find medium rooms.
      models.Room.findAll({
        where: { difficulty: 1 }
      }).then(function(mediumRooms, err){
        if(err){
          console.error("ERROR: Error has occured while getting all rooms with difficulty = 1.")
          return;
        }

        // Find hard rooms.
        models.Room.findAll({
          where: { difficulty: 2 }
        }).then(function(hardRooms, err){
          if(err){
            console.error("ERROR: Error has occured while getting all rooms with difficulty = 2.")
            return;
          }

          io.emit('roomsUpdate', {
            '0': easyRooms,
            '1': mediumRooms,
            '2': hardRooms
          });
        });
      });
    });
  }
}