import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SoloService } from '../solo/solo.service';

@Component({
  selector: 'room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  room:string;
  @Output() changeViewToRoomList = new EventEmitter();

  constructor(soloService:SoloService) {
    this.room = soloService.room;
  }

  ngOnInit() {
  }

  returnToRoomsList(){
    this.changeViewToRoomList.emit();
  }
}
