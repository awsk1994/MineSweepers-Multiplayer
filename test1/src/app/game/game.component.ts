import { Component, OnInit } from '@angular/core';

class Tile {
  value: string;
  hide: boolean;

  constructor(value:string, hide:boolean = false) {
    this.value = value;
    this.hide = hide;
  }

  click(){
    this.hide = !this.hide;
    console.log("Tile info: value: " + this.value + ", hide: " + this.hide);
  }
}

class coord{
  x:number;
  y:number;
  constructor(x:number, y:number){
    this.x = x;
    this.y = y;
  }
}

@Component({
  selector: 'game',
  templateUrl: './game.component.html'
})
export class GameComponent{
  length:number = 10;   // max length (as of 20170401) is 29.
  tiles:Tile[][] = [[]];
  numBombs:number = 10;

  constructor(){
    this.initiateBoard(this.length, this.numBombs);
    this.assignBombs(this.length, this.numBombs);
    // for(let i=0; i<this.length; i++){
    //   this.tiles[i] = [];
    //   for(let j=0; j<this.length; j++){
    //     this.tiles[i][j] = new Tile('0');
    //   }
    // }

    // this.tiles[0][0] = new Tile('F');
    // this.tiles[0][1] = new Tile('1');
    // this.tiles[1][0] = new Tile('B');
    // this.tiles[1][1] = new Tile('2');
  }


  initiateBoard(length:number, numBombs:number){
    console.log("initiateBoard. length: " + length + ", numBombs: " + numBombs);

    // initiate each board with empty values.
    for(let i=0; i<length; i++){
      this.tiles[i] = [];
      for(let j=0; j<length; j++){
        this.tiles[i][j] = new Tile('');
      }
    }
    console.log("DONE INITIATE");
  }

  assignBombs(length:number, numBombs:number){
    console.log("START ASSING BOMB");
    // randomly assign bombs.
    for(let i:number=0;i<numBombs;i++){
      let tileCoord = this.getRandomTile(length);
      console.log("tile(1). bomb #: " + numBombs + ", x: " + tileCoord.x + ", y: " + tileCoord.y);

      if(this.tiles[tileCoord.x][tileCoord.y].value == 'B'){
        let tileCoord = this.getRandomTile(length);
        console.log("tile(2). bomb #: " + numBombs + ", x: " + tileCoord.x + ", y: " + tileCoord.y);
      }
      this.tiles[tileCoord.x][tileCoord.y] = new Tile('B');
      //console.log("tileCoord: (" + tileCoord.x + ", " + tileCoord.y + ")");
    }

    // calculate the num value of each non-bomb tile.
    for(let i:number=0;i<length;i++){
      for(let j:number=0;j<length;j++){
        if(this.tiles[i][j].value != 'B'){
          let count:number = 0;
          let topValid:boolean = (j-1)>0;
          let bottomValid:boolean = (j+1)<(length-1);
          let leftValid:boolean = (i-1)>0;
          let rightValid:boolean = (i+1)<(length-1);

          // // top limit
          if(this.tiles[i]!=null && this.tiles[i][j-1]!=null){
            if(this.tiles[i][j-1].value == 'B'){
              count++;
            }
          }

          // // bottom limit
          if(this.tiles[i]!=null && this.tiles[i][j+1]!=null){
            if(this.tiles[i][j+1].value == 'B'){
              count++;
            }
          }

          // left limit
          if(this.tiles[i-1]!=null && this.tiles[i-1][j]!=null){
            if(this.tiles[i-1][j].value == 'B'){
              count++;
            }
          }

          // right limit
          if(this.tiles[i+1]!=null && this.tiles[i+1][j]!=null){
            if(this.tiles[i+1][j].value == 'B'){
              count++;
            }
          }

          // top-left
          if(this.tiles[i-1]!=null && this.tiles[i-1][j-1]!=null){
            if(this.tiles[i-1][j-1].value == 'B'){
              count++;
            }
          }

          // top-right
          if(this.tiles[i+1]!=null && this.tiles[i+1][j-1]!=null){
            if(this.tiles[i+1][j-1].value == 'B'){
              count++;
            }
          }

          // bottom-left
          if(this.tiles[i-1]!=null && this.tiles[i-1][j+1]!=null){
            if(this.tiles[i-1][j+1].value == 'B'){
              count++;
            }
          }

          // bottom-right
          if(this.tiles[i+1]!=null && this.tiles[i+1][j+1]!=null){
            if(this.tiles[i+1][j+1].value == 'B'){
              count++;
            }
          }

          this.tiles[i][j].value = count.toString();
        }
      }
    }

  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  getRandomTile(length:number){
    let rand:number = this.getRandomInt(0, (length * length));
    let row:number;
    let col:number;

    if(rand == 0){
      row = 0;
      col = 0;
    } else {
      row = Math.floor(rand/length);
      col = rand - (row * length) - 1;
    }
    console.log("rand: " + rand + ", row: " + row + ", col: " + col);
    return new coord(row, col);
  }

}
