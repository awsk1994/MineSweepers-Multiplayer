import { Injectable } from '@angular/core';
import { Coord } from './coord';
import { Tile } from './tile/tile.model';

@Injectable()
export class UtilsService {
  getRandomTile(size: number) {
    let x = Math.floor(Math.random() * (size - 1));
    let y = Math.floor(Math.random() * (size - 1));
    return new Coord(x,y);
  }

  printGameBoard(gameBoard:Tile[][]){
    for(let i=0;i<gameBoard.length;i++){
      let row:string = '';
      for(let j=0;j<gameBoard[i].length;j++){
        let tile = gameBoard[i][j];
        row += "{ B:" + tile.isBomb + ",S:" + tile.state + ",V:" + tile.value + "}, ";
      }
      console.log(row);
    }
  }
}
