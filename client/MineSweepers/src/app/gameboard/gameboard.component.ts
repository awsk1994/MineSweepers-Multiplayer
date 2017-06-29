import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';
import { Tile } from '../tile';

@Component({
  selector: 'gameboard',
  templateUrl: './gameboard.component.html',
  styleUrls: ['./gameboard.component.css']
})
export class GameboardComponent implements OnInit {
  boardData: Tile[][];
  gameBoard: Tile[][];

  constructor(private gameService:GameService) {
    this.gameBoard = this.gameService.prepareGameBoard(5,5);
  }
  
  ngOnInit() {
  }

}
