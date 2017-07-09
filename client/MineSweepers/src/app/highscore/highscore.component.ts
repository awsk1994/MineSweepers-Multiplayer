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
  title = 'timeTaken';
  reverse = false;

  constructor(private gameService: GameService,
    private ngZone: NgZone) {
    this.gameService.getHighscore().subscribe(
      (data) => {
        if (data.error != null) {
          alert(data.error);
        } else {
          this.scores = data;
        }
      });
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
