import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { GameService } from '../game.service'
import { RequestNameService } from '../request-name/request-name.service';
import { ModalService } from '../modal/modal.service';
import { ModalContent } from '../modal/modalContent.model';
import { SocketService } from '../socket.service';
import { HeaderComponent } from '../header/header.component';
import { HttpService } from '../http.service';
import { GameboardService } from '../gameboard/gameboard.service';

@Component({
  selector: 'solo',
  templateUrl: './solo.component.html',
  styleUrls: ['./solo.component.css']
})
export class SoloComponent implements OnInit {

  isSolo: boolean;
  displayRoom: boolean = true;
  roomId: string;
  nickname: string;

  constructor(private route: ActivatedRoute,
              private gameService: GameService,
              private requestNameService: RequestNameService,
              private socketService: SocketService,
              private httpService: HttpService,
              private gameboardService: GameboardService) {
    this.isSolo = route.snapshot.data['isSolo'];
    this.nickname = this.requestNameService.getNickname();
    route.params.subscribe(params => {
      this.roomId = params['roomId'];
    });

    // TODO: Set these inside the constructor of game service.
    this.gameService.isSolo = this.isSolo;
    this.gameService.roomId = parseInt(this.roomId);
    this.gameService.socketService = this.socketService;
  }

  ngOnInit() {
    console.log("solo | ngOnInit()");
    this.requestNameService.nicknameChanged.subscribe(
      (nickname) => this.nickname = nickname
    );

    this.socketService.prepareGame().subscribe(
      (gameBoardData) => {
        console.log("prepareGame: " + gameBoardData);
        let difficulty = 0;   //todo: should be given by the socket?
        this.displayRoom = false;
        this.gameboardService.triggerResetAllMsg();
        this.gameboardService.triggerMsgByTitle('clickToStartMsg', true);
        this.gameService.resetGameComponents(difficulty);
        this.gameboardService.prepareGameBoardCreatedByServer(gameBoardData);
      }
    )

    this.socketService.getObservable('onFinishGame').subscribe(
      (otherIsWin) => {
        console.log("OnFinishGame. Data:");
        console.log(otherIsWin);
        let isWin = otherIsWin == 1 ? 0 : 1;
        this.showGameoverModal(isWin);
      }
    )
  }

  ngOnDestroy() {
    console.log("solo | ngOnDestroy()");
  }

  prepareGame(difficulty) { this.gameService.prepareGame(difficulty); };
  startGame() { this.gameService.startGame(); };
  resumeGame() { this.gameService.resumeGame(); };
  pauseGame() { this.gameService.pauseGame(); };
  changeDifficulty(difficulty) { this.gameService.changeDifficulty(difficulty); };
  gameOver(status) { this.gameService.gameOver(status); };
  showGameoverModal(status) { this.gameService.showGameoverModal(status); };
}