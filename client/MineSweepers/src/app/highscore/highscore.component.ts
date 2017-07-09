import { Component, OnInit, NgZone } from '@angular/core';
import { GameService } from '../game.service';

@Component({
  selector: 'highscore',
  templateUrl: './highscore.component.html',
  styleUrls: ['./highscore.component.css']
})
export class HighscoreComponent implements OnInit {

  scores = [];
  difficulty = 'hard';

  constructor(private gameService:GameService,
              private ngZone:NgZone) {
      console.log('constructor');
  }

  ngOnInit() {
    this.gameService.getHighscore().subscribe(
      (data) => {
        if(data.error != null){
          alert(data.error);
        } else {
          this.scores = data;
        }
    }
    )
  }

  changeDifficulty(difficulty){
    this.difficulty = difficulty;
  }

}
