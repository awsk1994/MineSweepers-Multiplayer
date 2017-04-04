import { Component, OnInit } from '@angular/core';

class coord{
  x:number;
  y:number;
  constructor(x:number, y:number){
    this.x = x;
    this.y = y;
  }
}

class Tile {
  value: string;
  state: number;  // 0=hide, 1=reveal, 2=flag.
  
  constructor(value:string, state:number = 0) {
    this.value = value;
    this.state = state;
  }

  click(mouse:number){
    let flagChange:number = 0;
    let bombTriggered:boolean = false;
    let spreadReveal:boolean = false;

    if (mouse == 1){  //left click
      if(this.state == 0){  //hidden -> reveal
        this.state = 1;
        if(this.value == 'B'){
          bombTriggered = true;
        } else if(this.value == '0'){
          spreadReveal = true;
        }
      } else if(this.state == 1){
        // do nothing; once revealed, cannot hide.
      } else if (this.state == 2){
        // do nothing if left click on a flag.
      }
    } else if (mouse == 3){ //right click
      if(this.state == 0){  // hidden -> flag
        this.state = 2;
        flagChange = 1;
      } else if(this.state == 1){
        // do nothing if right clcik on a revealed tile
      } else if(this.state == 2){ // flag -> hidden
        this.state = 0;
        flagChange = -1;
      }
    } else {
      alert("unexpected mouse event!");
    }
    return [flagChange, bombTriggered, spreadReveal];
  }
}

@Component({
  selector: 'game',
  templateUrl: './game.component.html'
})
export class GameComponent{
  length:number = 7;   // max length (as of 20170401) is 29.
  numBombs:number = 7;

  tiles:Tile[][];
  flagged:number;
  state:string;  //init, running, gameover, pause

  constructor(){
    this.reset();
  }

  reset(){
    this.flagged = 0;
    this.tiles = [[]];
    this.state = "init";
    this.initiateBoard(this.length, this.numBombs);
    this.assignBombs(this.length, this.numBombs);
  }

  revealAll(){
    for(let i:number=0; i<this.tiles.length; i++){
      for(let j:number=0; j<this.tiles[i].length; j++){
        this.tiles[i][j].state = 1;
      }
    }
  }

  hideAll(){
    for(let i:number=0; i<this.tiles.length; i++){
      for(let j:number=0; j<this.tiles[i].length; j++){
        this.tiles[i][j].state = 0;
      }
    }
  }

  handleClick(event, tile, i, j){
    console.log("event: " + event.which + ", tile: " + tile.value);// + ", index: " + index);

    if(this.state == "init"){
      this.hideAll();
      this.state = "running";
    }

    // don't do anything if gamover;; will change to click to reset in future.
    if(this.state == "gameover"){
      return;
    }

    if(this.state == "init" || this.state == "running"){
      let result = tile.click(event.which); // [flagChange, bombTriggered, spreadReveal]
      this.flagged += result[0];

      if(result[1] == true){  //bomb triggered
        this.revealAll();
        this.state = "gameover";
      } else if(result[2] == true){ //spread reveal
        this.spreadReveal(i,j);
      }
    }
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
    // randomly assign bombs.
    for(let i:number=0;i<numBombs;i++){
      let tileCoord = this.getRandomTile(length);
      // if this tile is already a bomb, then get another random tile.
      if(this.tiles[tileCoord.x][tileCoord.y].value == 'B'){
        let tileCoord = this.getRandomTile(length);
      }
      this.tiles[tileCoord.x][tileCoord.y].value = 'B';
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

          // top limit
          if(this.tiles[i]!=null && this.tiles[i][j-1]!=null){
            if(this.tiles[i][j-1].value == 'B'){
              count++;
            }
          }

          // bottom limit
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

  spreadReveal(i,j){
  
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
      col = rand - (row * length);
    }
    return new coord(row, col);
  }
}