import { Component, OnInit, NgZone } from '@angular/core';
import { GameService } from '../game.service';

@Component({
  selector: 'highscore',
  templateUrl: './highscore.component.html',
  styleUrls: ['./highscore.component.css']
})
export class HighscoreComponent implements OnInit {

  scores = [];
  difficulty = 'easy';
  title = 'timeTaken';
  reverse = false;

  constructor(private gameService: GameService,
    private ngZone: NgZone) {
    this.gameService.getHighscore().subscribe(
      (data) => {
        if (data.error != null) {
          alert(data.error);
        } else {
          this.addRanking(data['easy']);
          this.addRanking(data['medium']);
          this.addRanking(data['hard']);

          this.scores = data;
        }
      });
  }

  addRanking(scores){
    for(var i=0;i<scores.length;i++){
      scores[i].ranking = i + 1;
    }
  }

  ngOnInit() {

  }

  changeDifficulty(difficulty) {
    this.difficulty = difficulty;
  }

  sort(title) {
    console.log("sort: " + title);
    if (this.title == title) {
      this.reverse = !this.reverse;
    } else {
      this.title = title;
      this.reverse = false;
    }
  }

}
