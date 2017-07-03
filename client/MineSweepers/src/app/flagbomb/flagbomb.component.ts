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
  flagPercent:number;
  bombPercent:number;

  constructor(private gameService:GameService) {
      this.gameService.flagBombUpdated.subscribe(
        (data)=>{
          this.flagCount = data.flagCount;
          this.bombCount = data.bombCount;
          this.flagPercent = Math.floor((this.flagCount/this.bombCount) * 100);
          this.bombPercent = 100 - this.flagPercent;
          console.log("updated. flag%: " + this.flagPercent);

        }
      )
  }
}
