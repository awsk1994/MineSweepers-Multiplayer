import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'game',
  templateUrl: './game.component.html'
})
export class GameComponent{
  length:number = 29;   // max length (as of 20170401) is 29.
  rowSplit:number = Math.round(12/length);
  tiles:string[][] = [[]];

  constructor(){
    for(let i=0; i<this.length; i++){
      this.tiles[i] = [];
      for(let j=0; j<this.length; j++){
        this.tiles[i][j] = 'E';
      }
    }

    this.tiles[0][0] = 'F';
    this.tiles[0][1] = '1';
    this.tiles[1][0] = 'B';
    this.tiles[1][1] = '2';
  }
}
