import { Component, OnInit } from '@angular/core';
import { GameboardService } from './gameboard.service';
import { Tile, TileState } from '../tile/tile.model';
import { GameService } from '../game.service';

/**
 * This is the gameboard where minesweeper takes place.
 */
@Component({
  selector: 'gameboard',
  templateUrl: './gameboard.component.html',
  styleUrls: ['./gameboard.component.css']
})
export class GameboardComponent implements OnInit {
  boardData: Tile[][];
  gameBoard: Tile[][];

  /**
   * Boolean triggered when user puts down more flags than the number of bombs. Note that when this message shows up, it does not mean that the user have put all the flags in the correct position. It simply means # of flags > # of bombs.
   */
  exceedFlagLimitError = false;
  /**
   * Boolean triggered after all flags have been laid, and it triggers user to finish the game by clicking the rest of the tiles.
   */
  finishGameMsg = false;
  /**
   * Boolean to trigger message to prompt user to click the board to start game.
   */
  clickToStartMsg = false;

  constructor(private gameboardService: GameboardService,
    private gameService: GameService) {
    this.gameboardService.gameboardUpdated.subscribe(
      (gameBoard: Tile[][]) => {
        this.gameBoard = gameBoard;
      }
    )
    this.gameboardService.msgDetected.subscribe(
      (message) => {
        //console.log(message);
        if (message.title === 'resetError') {
          // reset any other error here.
          this.exceedFlagLimitError = false;
        } else if (message.title === 'resetAll') {
          this.exceedFlagLimitError = false;
          this.finishGameMsg = false;
          this.clickToStartMsg = false;
        } 
        
        else if (message.title === 'exceedFlagLimitError') {
          this.exceedFlagLimitError = message.status;
        } else if (message.title === 'finishGameMsg') {
          this.finishGameMsg = message.status;
        } else if(message.title === 'clickToStartMsg'){
          this.clickToStartMsg = message.status;
        }
      }
    )
  }

  ngOnInit() {
    console.log("gameBoard: prepareGame");
    this.gameService.prepareGame(0);
  };

  prepareGameboard(size: number) {
    this.gameboardService.prepareGameBoard(size, size);
  }

  revealAll() {
    this.gameboardService.revealAll();
  }
}