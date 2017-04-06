import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'game-info',
  templateUrl: './game-info.component.html'
})
export class GameInfoComponent {
  time:string;
  score:number;

  @Input() flagged = 0;
  @Input() gameState = "init";
  @Input() tilesTouched = 0;
  @Input() numBombs = 0;

  constructor() {
    this.time = "05:00";
    this.score = 0;
    this.flagged = 0;
  }
}
