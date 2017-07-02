import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameService } from '../game.service'

import { ModalService } from '../modal/modal.service';
import { ModalContent } from '../modal/modalContent.model';

@Component({
  selector: 'solo',
  templateUrl: './solo.component.html',
  styleUrls: ['./solo.component.css']
})
export class SoloComponent implements OnInit {
  constructor(route: ActivatedRoute,
    private gameService: GameService) {
    this.isSolo = route.snapshot.data['isSolo'];
  }

  ngOnInit() { }
  isSolo: string;

  prepareGame(difficulty) { this.gameService.prepareGame(difficulty); };
  startGame() { this.gameService.startGame(); };
  resumeGame() { this.gameService.resumeGame(); };
  pauseGame() { this.gameService.pauseGame(); };

  changeDifficulty(difficulty) { this.gameService.changeDifficulty(difficulty); };
  gameOver(status) { this.gameService.gameOver(status); };

  showGameoverModal(status) { this.gameService.showGameoverModal(status); };
}