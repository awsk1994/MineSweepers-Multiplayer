import { Component } from '@angular/core';
import { AlertMessageService } from './alert-message.service';
import { GameService } from '../game.service';

@Component({
  selector: 'alert-message',
  templateUrl: './alert-message.component.html',
  styleUrls: ['./alert-message.component.css']
})
export class AlertMessageComponent {

  title: string;
  data;
  displayAlertMessage: boolean;

  constructor(private alertMessageService: AlertMessageService,
    private gameService:GameService) {
    this.alertMessageService.triggerAlertMessage.subscribe(
      (data) => {
        if(data.status == 0){
          this.title = "Game Over";
        } else if(data.status == 1){
          this.title = "You Win!"
        }
        this.data = data.data;
        this.displayAlertMessage = true;
      }
    );
  }

  closeAlertMessageAndRestart(){
    this.displayAlertMessage = false;
    this.gameService.restart();
  }

  backdropClicked(){
    console.log("backdropClicked");
    this.closeAlertMessageAndRestart();
  }

  submitHighscore(){
    // todo...
    console.log("todo: submit highscore!.. call gameservice.");
  }

}