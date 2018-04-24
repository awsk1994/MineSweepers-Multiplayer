import { Component } from '@angular/core';
import { AlertMessageService } from './alert-message.service';
import { GameService } from '../game.service';
import { MinToMsPipe } from '../sharedPipes';
import { SocketService } from '../socket.service';
import { RequestNameService } from '../request-name/request-name.service';
import { Router, ActivatedRoute } from '@angular/router';

/**
 *  AlertMessage Component displays a popover when one gives it a title and message. 
 *  However, it has been adopted to be used to display a popover modal for Game Over.
 */
@Component({
  selector: 'alert-message',
  templateUrl: './alert-message.component.html',
  styleUrls: ['./alert-message.component.css']
})
export class AlertMessageComponent {
  title: string;
  data;
  status;
  nickname;
  displayAlertMessage: boolean = false;
  displayNicknameInput: boolean = false;
  isSolo: boolean = true;

  constructor(private alertMessageService: AlertMessageService,
    private gameService: GameService,
    private socketService: SocketService,
    private requestNameService: RequestNameService,
    private router: Router,
    private route:ActivatedRoute) {
    this.alertMessageService.triggerAlertMessage.subscribe(
      (data) => {
        if (data.status == 0) {
          this.title = "Game Over";
        } else if (data.status == 1) {
          this.title = "You Win!"
        }
        this.data = data;
        this.displayAlertMessage = true;
      }
    );
    this.isSolo = route.snapshot.data['isSolo'];
  }

  /**
   * Called by UI (reset button) or submitHighscore(). 
   * Reset the variables and restart the game.
   */
  closeAlertMessageAndRestart() {
    this.resetVariables();
    this.gameService.restart();
  }

  returnToMultiplayer() {
    this.router.navigate(["../"], {relativeTo: this.route});
    window.location.reload();
  }

  /**
   * Resets all the AlertMessage Components
   */
  resetVariables() {
    this.displayAlertMessage = false;
    this.displayNicknameInput = false;
    this.nickname = null;
    this.title = null;
    this.data = null;
    this.status = null;
  }

  /**
   * Backdrop is the black background under the alertbox.
   */
  backdropClicked() {
    if(this.isSolo){
      this.closeAlertMessageAndRestart();
    } else {
      console.log("INFO | disabling backdrop clicked for multiplayer for now.")
    }
  }

  /**
   * Triggered when game over popover shows up and user clicks to send highscore.
   * @param {string} name username/nickname
   * @param {number} time in milliseconds. (eg. 1 second = 1000 milliseconds)
   */
  submitHighscore(time: number) {
    let name = this.requestNameService.getNickname();
    let timeInMs = new MinToMsPipe().transform(time);
    this.gameService.sendHighscore(name, timeInMs).subscribe(
      (data) => {
        if (data.error != null) {
          alert(data.error);
        } else {
          alert(data.message)
        }
        this.closeAlertMessageAndRestart();
      }
    );
  }
}