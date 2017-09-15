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
  },
  createAndAssignGameboard: function(difficulty){
    let gameBoardSize = difficultyConfig[difficulty].size;
    let numBombs = difficultyConfig[difficulty].bombs;
    
    let gameBoard = createEmptyboard(gameBoardSize);
    assignBombs(numBombs, gameBoard);
    return gameBoard;
  }
}



/* ========== Helper Functions to prepare Gameboard ========== */

let difficultyConfig = {
    '0': { 'size': 6, 'bombs': 3 }, // easy
    '1': { 'size': 10, 'bombs': 10 }, // medium
    '2': { 'size': 15, 'bombs': 15 }  // hard
}

function createEmptyboard(size) {
    let boardData = [];
    for (let i = 0; i < size; i++) {
      let row = [];
      for (let j = 0; j < size; j++) {
        row.push(0);
      }
      boardData.push(row);
    }
    
    return boardData;
  }

function assignBombs(numBombs, gameBoard) {
    if (numBombs > (gameBoard.length * gameBoard.length)) {
      alert("ERROR: number of bombs cannot exceed total number of tiles.");
    }

    // randomly assign bombs
    for (let i = 0; i < numBombs; i++) {
      assignEachBomb(i, gameBoard);
    }
  }

function assignEachBomb(index, gameBoard) {
    let bombCoord = getRandomTile(gameBoard.length);
    // while tile already have a bomb, randomly get another one.
    while (gameBoard[bombCoord.x][bombCoord.y] == -1) {
      bombCoord = getRandomTile(gameBoard.length);
    };
    if (gameBoard[bombCoord.x][bombCoord.y] == -1) {
      console.error("Error: duplicate bomb");
    }
    gameBoard[bombCoord.x][bombCoord.y] = -1;
    calcDistFromBomb(gameBoard, bombCoord);
  }

function getRandomTile(size) {
    let x = Math.floor(Math.random() * (size - 1));
    let y = Math.floor(Math.random() * (size - 1));
    return {x: x, y: y};
  }

function calcDistFromBomb(gameBoard, bombCoord) {  
    let leftValid = (bombCoord.x - 1 < 0) ? false : true;
    let rightValid = (bombCoord.x + 1 > gameBoard.length - 1) ? false : true;
    let topValid = (bombCoord.y - 1 < 0 ) ? false : true;
    let bottomValid = (bombCoord.y + 1 > gameBoard.length - 1 ) ? false : true;
  
    if (leftValid && gameBoard[bombCoord.x - 1][bombCoord.y] != -1 ) { gameBoard[bombCoord.x - 1][bombCoord.y]++; }
    if (rightValid && gameBoard[bombCoord.x + 1][bombCoord.y] != -1 ) { gameBoard[bombCoord.x + 1][bombCoord.y]++; }
    if (topValid && gameBoard[bombCoord.x][bombCoord.y - 1] != -1 ) { gameBoard[bombCoord.x][bombCoord.y - 1]++; }
    if (bottomValid && gameBoard[bombCoord.x][bombCoord.y + 1] != -1 ) { gameBoard[bombCoord.x][bombCoord.y + 1]++; }

    // top-right
    if (topValid && rightValid && gameBoard[bombCoord.x + 1][bombCoord.y - 1] != -1 ) { gameBoard[bombCoord.x + 1][bombCoord.y - 1]++; }
    //bottom-right
    if (bottomValid && rightValid && gameBoard[bombCoord.x + 1][bombCoord.y + 1] != -1 ) { gameBoard[bombCoord.x + 1][bombCoord.y + 1]++; }
    //bottom-left
    if (bottomValid && leftValid && gameBoard[bombCoord.x - 1][bombCoord.y + 1] != -1 ) { gameBoard[bombCoord.x - 1][bombCoord.y + 1]++; }
    //top-left
    if (topValid && leftValid && gameBoard[bombCoord.x - 1][bombCoord.y - 1] != -1 ) { gameBoard[bombCoord.x - 1][bombCoord.y - 1]++; }
  }