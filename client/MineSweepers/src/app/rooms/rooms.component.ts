import { Component, OnInit } from '@angular/core';
import { SoloService } from '../solo/solo.service';
import { SocketService } from '../socket.service';
@Component({
  selector: 'rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {

  constructor(private socketService:SocketService,
              private soloService:SoloService) { }

  rooms;
  difficulty:number;
  displayCreateRoom:boolean = false;
  

  ngOnInit(){
    this.socketService.roomsUpdate().subscribe(
      (rooms)=>{ 
        this.rooms = rooms;
      }
    );
  }

  createRoom(difficulty:number, roomName:string){
    var nickname = this.soloService.nickname;
    this.socketService.createRoom({
      'difficulty': difficulty,
      'room_name': roomName,
      'created_by': nickname
    });
  }

  getRooms(difficulty){
    this.difficulty = difficulty;
    this.socketService.getRooms(difficulty);
  }

  joinRoom(roomId){
    console.log("join room: " + roomId);
  }

  toggleDisplayCreateRoom(){
    this.displayCreateRoom = !this.displayCreateRoom;
  }
}
