import { Component } from '@angular/core';
import { GameService } from '../game.service';

@Component({
  selector: 'flagbomb',
  templateUrl: './flagbomb.component.html',
  styleUrls: ['./flagbomb.component.css']
})
export class FlagbombComponent {

  flagCount:number;
  bombCount:number;

  constructor(private gameService:GameService) {
      this.gameService.flagBombUpdated.subscribe(
        (data)=>{
          this.flagCount = data.flagCount;
          this.bombCount = data.bombCount;
        }
      )
  }
}
