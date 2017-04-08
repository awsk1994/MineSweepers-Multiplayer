import { Component, OnInit, Input} from '@angular/core';
import { SharedDataService } from '../shared-data.service';
@Component({
  selector: 'game-info',
  templateUrl: './game-info.component.html'
})
export class GameInfoComponent {
  time:number;
  score:number;

  @Input() flagged = 0;
  @Input() gameState = "init";
  @Input() tilesTouched = 0;
  @Input() numBombs = 0;

  sharedData;

  constructor(sharedData:SharedDataService) {
    this.score = 0;
    this.flagged = 0;
    this.sharedData = sharedData;
    this.time = sharedData.time;
  }
}
