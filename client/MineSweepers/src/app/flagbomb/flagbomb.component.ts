import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';

/**
 * This is the UI for the flagBomb at bottom of gameboard.
 */
@Component({
  selector: 'flagbomb',
  templateUrl: './flagbomb.component.html',
  styleUrls: ['./flagbomb.component.css']
})
export class FlagbombComponent implements OnInit {

  flagCount: number;
  bombCount: number;
  flagPercent: number;
  bombPercent: number;

  constructor(private gameService: GameService) {
        this.gameService.flagBombUpdated.subscribe(
      (data) => {
        this.flagCount = data.flagCount;
        this.bombCount = data.bombCount;
        this.flagPercent = Math.floor((this.flagCount / this.bombCount) * 100);
        this.bombPercent = 100 - this.flagPercent;
        console.log("updated. flag%: " + this.flagPercent);
      }
    )
  }

  /**
   * onInit, this subscribes ot flagBombUpdated, and displays the flag and bomb count.
   */
  ngOnInit() {

  }
}
