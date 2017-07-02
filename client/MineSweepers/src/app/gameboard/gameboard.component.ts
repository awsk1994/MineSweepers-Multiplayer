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

  constructor(private gameboardService: GameboardService,
    private gameService: GameService) {
    this.gameboardService.gameboardUpdated.subscribe(
      (gameBoard: Tile[][]) => {
        this.gameBoard = gameBoard;
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