import { Injectable, EventEmitter } from '@angular/core';
import { Tile, TileState, TileMsg } from '../tile/tile.model';
import { Coord } from '../coord';
import { UtilsService } from '../utils.service';
import { TimerService } from '../timer/timer.service';

@Injectable()
export class GameboardService {

  constructor(private utilsService: UtilsService ){}

  gameBoard:Tile[][];
  gameboardUpdated = new EventEmitter<Tile[][]>();
  tilesLeft = 0;
  msgDetected = new EventEmitter();
  resetErrorMsg = new EventEmitter();

  updateGameBoard(gameBoard){
    this.gameBoard = gameBoard;
  }

  spreadReveal(x,y, depth){
    //todo: add this to config
    let spreadRevealDepthLimit = 4;
    
    // out of bounds.
    if(x < 0 || x > (this.gameBoard.length -1) 
    || y < 0 || y > (this.gameBoard.length -1)){
      return;
    }

    let tile = this.gameBoard[x][y];
    if(tile.isBomb || tile.state == TileState.Flagged){
      return;
    }

    if(tile.state == TileState.UnTouched){
      tile.state = TileState.Revealed;
      this.tilesLeft--;
      this.updateGameBoard(this.gameBoard);
    
      if(tile.value == 0 && depth < spreadRevealDepthLimit){
        depth++;
        this.spreadReveal(x, y+1, depth);
        this.spreadReveal(x+1, y+1, depth);
        this.spreadReveal(x+1, y, depth,);
        this.spreadReveal(x+1, y-1, depth);
        this.spreadReveal(x, y-1, depth,);
        this.spreadReveal(x-1, y-1, depth);
        this.spreadReveal(x-1, y, depth);
        this.spreadReveal(x-1, y+1, depth);
      }
    } else {
      //console.log("random");
    }
  }

  revealAll(){
    for(let i=0;i<this.gameBoard.length;i++){
      for(let j=0;j<this.gameBoard[0].length;j++){
        this.gameBoard[i][j].state = TileState.Revealed;
      }
    }
    this.gameboardUpdated.emit(this.gameBoard);
  }

  prepareGameBoardCreatedByServer(gameBoardData: number[][]){
    this.gameBoard = this.convertServerGameBoard(gameBoardData);
    this.gameboardUpdated.emit(this.gameBoard);
  }

  convertServerGameBoard(gameBoardData){
    console.log("convertServerGameBoard");
    console.log(gameBoardData);

    let gameBoard: Tile[][] = [];
    for (let i = 0; i < gameBoardData.length; i++) {
      let row: Tile[] = [];
      for (let j = 0; j < gameBoardData[0].length; j++) {
        if(gameBoardData[i][j] == -1){
          row.push(new Tile(true, TileState.UnTouched, -1));
        } else {
          row.push(new Tile(false, TileState.UnTouched, gameBoardData[i][j]));
        }
      }
      gameBoard.push(row);
    }

    this.printGameBoard(gameBoard);
    return gameBoard;
  }

  printGameBoard(gameBoard: Tile[][]){
    for(let i=0;i<gameBoard.length;i++){
      let row: number[] = [];
      for(let j=0;j<gameBoard[0].length;j++){
        row.push(gameBoard[i][j].value);
        console.log('v: ' + gameBoard[i][j].value);
      }
      console.log("==");
      //console.log(row);
    }
  }

  prepareGameBoard(size: number, numBombs: number) {
    // this.tilesLeft = size * size;
    let gameBoard: Tile[][] = this.createEmptyBoard(size);
    this.assignBombs(numBombs, gameBoard);
    this.gameBoard = gameBoard;
    this.gameboardUpdated.emit(gameBoard);
  }

  createEmptyBoard(size: number) {
    let boardData: Tile[][] = [];
    for (let i = 0; i < size; i++) {
      let row: Tile[] = [];
      for (let j = 0; j < size; j++) {
        row.push(new Tile(false, TileState.UnTouched, 0));
      }
      boardData.push(row);
    }
    
    return boardData;
  }

  assignBombs(numBombs: number, gameBoard: Tile[][]) {
    if (numBombs > (gameBoard.length * gameBoard.length)) {
      alert("ERROR: number of bombs cannot exceed total number of tiles.");
    }

    // randomly assign bombs
    for (let i: number = 0; i < numBombs; i++) {
      this.assignEachBomb(i, gameBoard);
    }
  }

  assignEachBomb(index: number, gameBoard: Tile[][]) {
    let bombCoord = this.utilsService.getRandomTile(gameBoard.length);
    // while tile already have a bomb, randomly get another one.
    while (gameBoard[bombCoord.x][bombCoord.y].isBomb) {
      bombCoord = this.utilsService.getRandomTile(gameBoard.length);
    };
    if (gameBoard[bombCoord.x][bombCoord.y].isBomb) {
      alert("Error: duplicate bomb");
    }
    gameBoard[bombCoord.x][bombCoord.y].isBomb = true;
    gameBoard[bombCoord.x][bombCoord.y].value = -1;
    this.calcDistFromBomb(gameBoard, bombCoord);
  }

  calcDistFromBomb(gameBoard: Tile[][], bombCoord: Coord) {
    let topValid = true,
      rightValid = true,
      bottomValid = true,
      leftValid = true;

    if (bombCoord.x - 1 < 0) { leftValid = false; }
    if (bombCoord.x + 1 > gameBoard.length - 1) { rightValid = false; }
    if (bombCoord.y - 1 < 0) { topValid = false; }
    if (bombCoord.y + 1 > gameBoard.length - 1) { bottomValid = false; }

    if (leftValid) {
      gameBoard[bombCoord.x - 1][bombCoord.y].value++;
    }
    if (rightValid) {
      gameBoard[bombCoord.x + 1][bombCoord.y].value++;
    }
    if (topValid) {
      gameBoard[bombCoord.x][bombCoord.y - 1].value++;
    }
    if (bottomValid) {
      gameBoard[bombCoord.x][bombCoord.y + 1].value++;
    }

    // top-right
    if (topValid && rightValid) {
      gameBoard[bombCoord.x + 1][bombCoord.y - 1].value++;
    }
    //bottom-right
    if (bottomValid && rightValid) {
      gameBoard[bombCoord.x + 1][bombCoord.y + 1].value++;
    }
    //bottom-left
    if (bottomValid && leftValid) {
      gameBoard[bombCoord.x - 1][bombCoord.y + 1].value++;
    }
    //top-left
    if (topValid && leftValid) {
      gameBoard[bombCoord.x - 1][bombCoord.y - 1].value++;
    }
  }

  checkWinGame(){
    for(let i=0;i<this.gameBoard.length;i++){
      for(let j=0;j<this.gameBoard[i].length;j++){
        // if there are any bombs not flagged, then it's considered lost.
        if(this.gameBoard[i][j].isBomb && this.gameBoard[i][j].state != TileState.Flagged){
          return false;
        }
      }
    }
    return true;
  }

  triggerMsgByTitle(title, status){
    this.msgDetected.emit({'title': title, 'status': status})
  }

  triggerResetErrorMsg(){
    this.msgDetected.emit({'title': 'resetError', 'status': true})
  }

  triggerResetAllMsg(){
    this.msgDetected.emit({'title': 'resetAll', 'status': true})
  }
}
