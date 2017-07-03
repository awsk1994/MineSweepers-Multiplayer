import { Component, OnInit, Input } from '@angular/core';
import { GameService } from '../game.service';

@Component({
  selector: 'difficulty',
  templateUrl: './difficulty.component.html',
  styleUrls: ['./difficulty.component.css']
})
export class DifficultyComponent {
  @Input() isSolo:boolean;

  constructor(private gameService:GameService) { }

  changeDifficulty(difficulty){
    this.gameService.changeDifficulty(difficulty);
  }

  restart(){
    this.gameService.restart();
  }
}
