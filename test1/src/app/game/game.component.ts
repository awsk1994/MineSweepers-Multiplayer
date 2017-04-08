import { Component, ViewChild} from '@angular/core';
import { TimerComponent } from '../timer/timer.component';

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
    let tilesTouched:number = 0;

    if (mouse == 1){  //left click
      if(this.state == 0){  //hidden -> reveal
        this.state = 1;
        tilesTouched++;
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
        tilesTouched++;
      } else if(this.state == 1){
        // do nothing if right clcik on a revealed tile
      } else if(this.state == 2){ // flag -> hidden
        this.state = 0;
        flagChange = -1;
        tilesTouched--;
      }
    } else {
      alert("unexpected mouse event!");
    }
    return [flagChange, bombTriggered, spreadReveal, tilesTouched];
  }
}

@Component({
  selector: 'game',
  templateUrl: './game.component.html'
})
export class GameComponent{
  sizes:number[] = [10, 17, 29]; // max selectedSize (as of 20170401) is 29.
  selectedSize:number = this.sizes[0];   
  @ViewChild(TimerComponent) TimerComponent: TimerComponent;

  numBombs:number;
  tiles:Tile[][];
  flagged:number;
  state:string;  //init, running, gameover, pause
  tilesTouched:number;

  constructor(){
    this.reset(true);
  }

  selectSize(size){
    this.selectedSize = size;
    this.reset();
  }

  reachedZero(){
    this.gameOver();
  }

  reset(init:boolean=false){
    this.flagged = 0;
    this.tiles = [[]];
    this.state = "init";
    this.tilesTouched = 0;
    this.numBombs = this.selectedSize;
    this.initiateBoard(this.selectedSize, this.numBombs);
    this.assignBombs(this.selectedSize, this.numBombs);
    if(!init){
      this.TimerComponent.reset();
    }
    //this.printBoard();
  }

  printBoard(){
    for(let i:number=0; i<this.tiles.length; i++){
      let arr:string[] = [];
      for(let j:number=0; j<this.tiles[i].length; j++){
        arr.push(this.tiles[i][j].value);
      }
      console.log(arr);
    } 
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
      this.TimerComponent.start();
    }

    // don't do anything if gamover;; will change to click to reset in future.
    if(this.state == "gameover"){
      this.reset();
    }

    if(this.state == "init" || this.state == "running"){
      let result = tile.click(event.which); // [flagChange, bombTriggered, spreadReveal, tilesTouched]
      this.flagged += result[0];

      if(result[1] == true){  //bomb triggered
        this.gameOver(false);
      } else if(result[2] == true){ //spread reveal
        this.spreadReveal(i,j);
      }

      this.tilesTouched += result[3];
      if(this.tilesTouched == (this.selectedSize * this.selectedSize)){
        this.gameOver(true);
      }
    }
  }

  initiateBoard(selectedSize:number, numBombs:number){
    console.log("initiateBoard. selectedSize: " + selectedSize + ", numBombs: " + numBombs);

    // initiate each board with empty values.
    for(let i=0; i<selectedSize; i++){
      this.tiles[i] = [];
      for(let j=0; j<selectedSize; j++){
        this.tiles[i][j] = new Tile('');
      }
    }
    console.log("DONE INITIATE");
  }

  gameOver(win:boolean = false){
    this.revealAll();
    this.state = "gameover";
    if(win==true){
      alert("Congrats. You won!");
    } else {
      alert("gameOver!!");
    }
  }

  assignBombs(selectedSize:number, numBombs:number){
    // randomly assign bombs.
    for(let i:number=0;i<numBombs;i++){
      let tileCoord = this.getRandomTile(selectedSize);
      // if this tile is already a bomb, then get another random tile.
      if(this.tiles[tileCoord.x][tileCoord.y].value == 'B'){
        let tileCoord = this.getRandomTile(selectedSize);
      }
      this.tiles[tileCoord.x][tileCoord.y].value = 'B';
    }

    // calculate the num value of each non-bomb tile.
    for(let i:number=0;i<selectedSize;i++){
      for(let j:number=0;j<selectedSize;j++){
        if(this.tiles[i][j].value != 'B'){
          let count:number = 0;
          let topValid:boolean = (j-1)>0;
          let bottomValid:boolean = (j+1)<(selectedSize-1);
          let leftValid:boolean = (i-1)>0;
          let rightValid:boolean = (i+1)<(selectedSize-1);

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
    // is bomb tile?
    if(this.tiles[i][j].value == 'B'){
      return;
    }

    if(this.tiles[i][j].value != '0'){
      if(this.tiles[i][j].state == 0){
        this.tiles[i][j].state = 1;
        this.tilesTouched++;
      }
      return;
    }
    
    // reveal tile. if flag, don't reveal, but also don't skip.
    if(this.tiles[i][j].state == 0){
      this.tiles[i][j].state = 1;
      this.tilesTouched++;
    }

    // all direction is actually 90 degrees to the left (eg. top = left);
    if(this.isValidTile(i, j-1) && this.tiles[i][j-1].state == 0){ //top
      this.spreadReveal(i,j-1); 
    }
    if(this.isValidTile(i, j+1) && this.tiles[i][j+1].state == 0){ //bottom
      this.spreadReveal(i, j+1); 
    }
    if(this.isValidTile(i-1, j) && this.tiles[i-1][j].state == 0){ //left
      this.spreadReveal(i-1,j); 
    }
    if(this.isValidTile(i+1, j) && this.tiles[i+1][j].state == 0){ //right
      this.spreadReveal(i+1,j); 
    }
  }

  isValidTile(i,j){
    return this.tiles[i] != null && this.tiles[i][j] != null;
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  getRandomTile(selectedSize:number){
    let rand:number = this.getRandomInt(0, (selectedSize * selectedSize));
    let row:number;
    let col:number;

    if(rand == 0){
      row = 0;
      col = 0;
    } else {
      row = Math.floor(rand/selectedSize);
      col = rand - (row * selectedSize);
    }
    return new coord(row, col);
  }
}