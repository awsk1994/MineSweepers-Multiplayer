import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameService } from '../game.service'
import { SoloService } from './solo.service';

import { ModalService } from '../modal/modal.service';
import { ModalContent } from '../modal/modalContent.model';

@Component({
  selector: 'solo',
  templateUrl: './solo.component.html',
  styleUrls: ['./solo.component.css']
})
export class SoloComponent implements OnInit {
  constructor(route: ActivatedRoute,
    private gameService: GameService,
    private soloService: SoloService) {
    this.isSolo = route.snapshot.data['isSolo'];
    this.displayRequestName = this.isSolo ? false : true;
  }

  ngOnInit() { }
  isSolo: string;
  displayRequestName:boolean = false;
  displayRooms:boolean = false;

  prepareGame(difficulty) { this.gameService.prepareGame(difficulty); };
  startGame() { this.gameService.startGame(); };
  resumeGame() { this.gameService.resumeGame(); };
  pauseGame() { this.gameService.pauseGame(); };
  changeDifficulty(difficulty) { this.gameService.changeDifficulty(difficulty); };
  gameOver(status) { this.gameService.gameOver(status); };
  showGameoverModal(status) { this.gameService.showGameoverModal(status); };

  getNickname(nickname){
    this.displayRequestName = false;
    this.displayRooms = true;
    this.soloService.nickname = nickname;
  }
}