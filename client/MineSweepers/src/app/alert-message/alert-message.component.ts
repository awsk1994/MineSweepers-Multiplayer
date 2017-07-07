import { Component } from '@angular/core';
import { AlertMessageService } from './alert-message.service';
import { GameService } from '../game.service';
import { MinToMsPipe } from '../sharedPipes';
import { SocketService } from '../socket.service';

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
  displayAlertMessage: boolean;
  displayNicknameInput: boolean = false;

  constructor(private alertMessageService: AlertMessageService,
    private gameService: GameService,
    private socketService: SocketService) {
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
  }

  closeAlertMessageAndRestart() {
    this.resetVariables();
    this.gameService.restart();
  }

  resetVariables() {
    this.displayAlertMessage = false;
    this.displayNicknameInput = false;
    this.nickname = null;
    this.title = null;
    this.data = null;
    this.status = null;
  }

  backdropClicked() {
    console.log("backdropClicked");
    this.closeAlertMessageAndRestart();
  }

//todo: don't know if it works.
  submitHighscore(name, time) {
    // todo...
    console.log("name: " + name + ", time: " + time);
    let timeInMs = new MinToMsPipe().transform(time);
    console.log("todo: submit highscore!.. call gameservice. Name: " + name + ", Time: " + timeInMs);
    this.gameService.sendHighscore(name, time);
    alert("Score sent.")
    this.closeAlertMessageAndRestart();
  }

}