import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';

@Component({
  selector: 'difficulty',
  templateUrl: './difficulty.component.html',
  styleUrls: ['./difficulty.component.css']
})
export class DifficultyComponent {

  constructor(private gameService:GameService) { }

  changeDifficulty(difficulty){
    this.gameService.changeDifficulty(difficulty);
  }
}
