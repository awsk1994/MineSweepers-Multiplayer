import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'game-info',
  templateUrl: './game-info.component.html'
})
export class GameInfoComponent {
  time:string;
  score:number;
  bombsLeft:number;

  constructor() {
    this.time = "05:00";
    this.score = 0;
    this.bombsLeft = 10;
  }
}
