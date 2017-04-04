import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'game-info',
  templateUrl: './game-info.component.html'
})
export class GameInfoComponent {
  time:string;
  score:number;
  bombsLeft:number;

  @Input() flagged = 0;
  @Input() gameState = "init";

  constructor() {
    this.time = "05:00";
    this.score = 0;
    this.bombsLeft = 10;
    this.flagged = 0;
  }
}
