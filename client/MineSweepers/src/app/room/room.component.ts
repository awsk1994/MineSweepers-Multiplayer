import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SoloService } from '../solo/solo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SocketService } from '../socket.service';

@Component({
  selector: 'room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  room:string;
  @Output() changeViewToRoomList = new EventEmitter();
  roomId;

  constructor(soloService:SoloService, 
  private route: ActivatedRoute, 
  private router:Router,
  private socketService:SocketService) {
    this.room = soloService.room;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.roomId = params['roomId'];
      console.log("roomId: " + this.roomId);
    });
  }

  returnToRoomsList(){
    //this.changeViewToRoomList.emit();
    this.router.navigate(['multiplayer']);
  }
}
