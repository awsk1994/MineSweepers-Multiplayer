import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameService } from '../game.service'
import { SoloService } from './solo.service';
import { RequestNameService } from '../request-name/request-name.service';
import { ModalService } from '../modal/modal.service';
import { ModalContent } from '../modal/modalContent.model';

@Component({
  selector: 'solo',
  templateUrl: './solo.component.html',
  styleUrls: ['./solo.component.css']
})
export class SoloComponent implements OnInit {

  isSolo: string;
  displayRooms:boolean = false;
  displayRoom:boolean = false;
  roomId: string = '-1';

  constructor(route: ActivatedRoute,
    private gameService: GameService,
    private soloService: SoloService,
    private requestNameService:RequestNameService) {
    this.isSolo = route.snapshot.data['isSolo'];
    if(!this.isSolo){
      this.changeViewToRoomList();
    } else {
      this.changeViewToNone();
    }
    console.log("soloConstructor");
    if(localStorage.getItem('nickname')==null){
      console.log("soloConstructor: Cannot find nickname. Trigger request name.");
      this.requestNameService.handleRequestName();
    }
  }

  ngOnInit() { }

  prepareGame(difficulty) { this.gameService.prepareGame(difficulty); };
  startGame() { this.gameService.startGame(); };
  resumeGame() { this.gameService.resumeGame(); };
  pauseGame() { this.gameService.pauseGame(); };
  changeDifficulty(difficulty) { this.gameService.changeDifficulty(difficulty); };
  gameOver(status) { this.gameService.gameOver(status); };
  showGameoverModal(status) { this.gameService.showGameoverModal(status); };

  changeViewToNone(){
    this.displayRooms = false;
    this.displayRoom = false;
  }

  changeViewToRoomList(){
    this.displayRooms = true;
    this.displayRoom = false;
  }

  changeViewToRoom(room){
    this.soloService.room = room;
    this.displayRooms = false;
    this.displayRoom = true;
  }
}