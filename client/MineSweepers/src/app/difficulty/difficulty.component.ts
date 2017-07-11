import { Component, Input } from '@angular/core';
import { GameService } from '../game.service';

/**
 * Difficulty includes difficulty buttons and reset button. Clicking these buttons will trigger a confirm box to terminate game.
 */
@Component({
  selector: 'difficulty',
  templateUrl: './difficulty.component.html',
  styleUrls: ['./difficulty.component.css']
})
export class DifficultyComponent {
  @Input() isSolo: boolean;

  constructor(private gameService: GameService) { }

  /**
   * Triggered when user changes difficulty on solo/multiplayer page. Then, call gameService to change the difficulty.
   * @param {number} difficulty  0=easy, 1=medium, 2=hard
   */
  changeDifficulty(difficulty:number) {
    this.gameService.changeDifficulty(difficulty);
  }

  /**
   * Triggered when user clicks 'restart'.
   */
  restart() {
    this.gameService.restart();
  }
}
