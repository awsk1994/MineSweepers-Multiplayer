import { Component, OnInit } from '@angular/core';
import { GameboardService } from './gameboard.service';
import { Tile, TileState } from '../tile/tile.model';
import { GameService } from '../game.service';

@Component({
  selector: 'gameboard',
  templateUrl: './gameboard.component.html',
  styleUrls: ['./gameboard.component.css']
})
export class GameboardComponent implements OnInit {
  boardData: Tile[][];
  gameBoard: Tile[][];

  exceedFlagLimitError = false;
  finishGameMsg = false;

  constructor(private gameboardService: GameboardService,
    private gameService: GameService) {
    this.gameboardService.gameboardUpdated.subscribe(
      (gameBoard: Tile[][]) => {
        this.gameBoard = gameBoard;
      }
    )
    this.gameboardService.msgDetected.subscribe(
      (message) => {
        if (message.title === 'resetError') {
          // reset any other error here.
          this.exceedFlagLimitError = false;
        } else if (message.title === 'resetAll') {
          this.exceedFlagLimitError = false;
          this.finishGameMsg = false;
        } else if (message.title === 'exceedFlagLimitError') {
          this.exceedFlagLimitError = message.status;
        } else if (message.title === 'finishGameMsg') {
          this.finishGameMsg = message.status;
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