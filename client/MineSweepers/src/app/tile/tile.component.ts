import { Component, Input, EventEmitter } from '@angular/core';
import { Tile, TileState, TileMsg } from './tile.model';
import { Coord } from '../coord';
import { GameService } from '../game.service';
import { GameboardService } from '../gameboard/gameboard.service';

@Component({
  selector: 'tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.css']
})
export class TileComponent {
  @Input() tile: Tile;
  @Input() x: number;
  @Input() y: number;

  //@Output() clickDetected = new EventEmitter();
  constructor(private gameService: GameService,
    private gameboardService: GameboardService) { }

  click(event) {
    let mouse = event.which;
    this.gameboardService.triggerResetErrorMsg();
    if (mouse == 1) { // left click
      if (this.tile.state == TileState.Flagged){
        // do nothing when flagged.
      } else if (this.tile.isBomb) {
        this.tile.state = TileState.Revealed;
        this.gameboardService.tilesLeft--;
        this.gameService.handleClick(TileMsg.ClickedOnBomb);
      } else if (this.tile.value == 0) {
        this.gameboardService.spreadReveal(this.x, this.y, 0);
        this.gameService.handleClick(TileMsg.ClickedOnNumber);
      } else {
        this.tile.state = TileState.Revealed;
        this.gameboardService.tilesLeft--;
        this.gameService.handleClick(TileMsg.ClickedOnNumber);
      }
    } else if (mouse == 3) { // right click
      // Toggle between UnTouched and Flagged. Revealed is ignored.
      if (this.tile.state == TileState.UnTouched) {
        if(this.gameService.flagCount < this.gameService.bombCount){
          this.tile.state = TileState.Flagged;
          this.gameboardService.tilesLeft--;
          this.gameService.handleClick(TileMsg.Flagged);
        } else if(this.gameService.flagCount >= this.gameService.bombCount){
          this.gameboardService.triggerMsgByTitle('exceedFlagLimitError', true);
        }
      } else if (this.tile.state == TileState.Flagged) {
        this.tile.state = TileState.UnTouched;
        this.gameboardService.tilesLeft++;
        this.gameService.handleClick(TileMsg.UnFlagged);
      }
    }
  }
}