import { Component, OnInit } from '@angular/core';
import { SocketService } from '../socket.service';
@Component({
  selector: 'rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {

  constructor(private socketService:SocketService) { }

  rooms;
  ngOnInit(){
    this.socketService.roomsUpdate().subscribe(
      (rooms)=>{ 
        this.rooms = rooms;
      }
    );
  }

  createRoom(name, diff){
    this.socketService.createRoom(name, 0);
  }

  getRooms(){
    this.socketService.getRooms();
  }

}
