import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { GameService } from '../game.service'
import { SoloService } from './solo.service';
import { RequestNameService } from '../request-name/request-name.service';
import { ModalService } from '../modal/modal.service';
import { ModalContent } from '../modal/modalContent.model';
import { SocketService } from '../socket.service';
import { HeaderComponent } from '../header/header.component';
import { HttpService } from '../http.service';

@Component({
  selector: 'solo',
  templateUrl: './solo.component.html',
  styleUrls: ['./solo.component.css']
})
export class SoloComponent implements OnInit {

  isSolo: string;
  displayRoom: boolean = true;
  roomId: string;
  nickname: string;

  constructor(private route: ActivatedRoute,
              private gameService: GameService,
              private soloService: SoloService,
              private requestNameService: RequestNameService,
              private socketService: SocketService,
              private httpService: HttpService) {
    this.isSolo = route.snapshot.data['isSolo'];
    this.nickname = this.requestNameService.getNickname();
    route.params.subscribe(params => {
      this.roomId = params['roomId'];
    });
  }

  ngOnInit() {
    console.log("solo | ngOnInit()");
    this.requestNameService.nicknameChanged.subscribe(
      (nickname) => this.nickname = nickname
    );
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