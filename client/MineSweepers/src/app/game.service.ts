import { Injectable } from '@angular/core';
import { Tile, TileState, Bomb } from './tile';
import { Coord } from './coord';
import { UtilsService } from './utils.service';

@Injectable()
export class GameService {
  constructor(private utilsService:UtilsService) { }

  prepareGameBoard(size:number, numBombs:number){
    let gameBoard:Tile[][] = this.createEmptyBoard(size);
    this.assignBombs(numBombs, gameBoard);
    //this.calcDistFromBomb(gameBoard);
    return gameBoard;
  }

  createEmptyBoard(size:number){
    let boardData:Tile[][] = [];
    for(let i=0;i<size;i++){
      let row:Tile[] = [];
      for(let j=0;j<size;j++){
        row.push(new Tile(Bomb.NotExist, TileState.UnTouched, 0));
      }
      boardData.push(row);
    }
    return boardData;
  }

  assignBombs(numBombs:number, gameBoard:Tile[][]){
    if(numBombs > (gameBoard.length * gameBoard.length)){
      alert("ERROR: number of bombs cannot exceed total number of tiles.");
    }

    // randomly assign bombs
    for(let i:number=0;i<numBombs;i++){
      this.assignEachBomb(i, gameBoard);
    }
  }

  assignEachBomb(index:number, gameBoard:Tile[][]){
      let bombCoord = this.utilsService.getRandomTile(gameBoard.length);
      // while tile already have a bomb, randomly get another one.
      while(gameBoard[bombCoord.x][bombCoord.y].bomb == Bomb.Exist){
        bombCoord = this.utilsService.getRandomTile(gameBoard.length);
      };
      if(gameBoard[bombCoord.x][bombCoord.y].bomb == Bomb.Exist){
        alert("Error: duplicate bomb");
      }
      gameBoard[bombCoord.x][bombCoord.y].bomb = Bomb.Exist;
      gameBoard[bombCoord.x][bombCoord.y].value = -1;
      this.calcDistFromBomb(gameBoard, bombCoord);
  }

  calcDistFromBomb(gameBoard:Tile[][], bombCoord:Coord){
    let topValid = true,
        rightValid = true,
        bottomValid = true,
        leftValid = true;

    if(bombCoord.x - 1 < 0){ leftValid = false; } 
    if(bombCoord.x + 1 > gameBoard.length-1){ rightValid = false; }
    if(bombCoord.y - 1 < 0){ topValid = false; }
    if(bombCoord.y + 1 > gameBoard.length-1){ bottomValid = false; }
    
    if (leftValid){
      gameBoard[bombCoord.x-1][bombCoord.y].value++;
    } 
    if (rightValid){
      gameBoard[bombCoord.x+1][bombCoord.y].value++;
    } 
    if (topValid){
      gameBoard[bombCoord.x][bombCoord.y-1].value++;
    } 
    if (bottomValid){
      gameBoard[bombCoord.x][bombCoord.y+1].value++;
    }

    // top-right
    if(topValid && rightValid){
      gameBoard[bombCoord.x+1][bombCoord.y-1].value++;
    }
    //bottom-right
    if(bottomValid && rightValid){
      gameBoard[bombCoord.x+1][bombCoord.y+1].value++;
    }
    //bottom-left
    if(bottomValid && leftValid){
      gameBoard[bombCoord.x-1][bombCoord.y+1].value++;
    }
    //top-left
    if(topValid && leftValid){
      gameBoard[bombCoord.x-1][bombCoord.y-1].value++;
    }
  }

  
}
