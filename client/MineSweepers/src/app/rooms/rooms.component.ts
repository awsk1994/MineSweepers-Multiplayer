import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SoloService } from '../solo/solo.service';
import { SocketService } from '../socket.service';
import { HttpService } from '../http.service';

@Component({
  selector: 'rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {

  rooms = {};
  difficulty: number = 0;
  displayCreateRoom: boolean = false;
  @Output() changeViewToRoom = new EventEmitter<string>();

  /**
   * This is the 'Difficulty' variable in Create new room.
   */
  newDifficulty: number;

  /**
   * This is the 'Room Name' variable in Create new room.
   */
  newRoomName: string;

  constructor(private socketService: SocketService,
              private soloService: SoloService,
              private httpService: HttpService) {
    this.resetRooms();
  }

  ngOnInit() {
    this.socketService.roomsUpdate().subscribe(
      (rooms) => {
        console.log(rooms);
        this.rooms = rooms;
      }
    );
    this.getRooms(this.difficulty);
  }

  createRoom(difficulty: number, roomName: string) {
    var nickname = localStorage.getItem('nickname');
    if(nickname == null){
      alert("Nickname not found. Will use 'Unknown User' as nickname for now.");
      nickname = 'Unknown User';
    }
    this.httpService.post('/createRoom', {
      'difficulty': difficulty,
      'created_by': nickname,
      'room_name': roomName
    }).subscribe(
      (data) => {
        if (data.error != null) {
          alert(data.error);
        } else {
          this.resetCreateRoom();
          this.difficulty = difficulty;
          this.rooms[difficulty].push(data.detail);
        }
      });
  };

  getRooms(difficulty) {
    this.difficulty = difficulty;
    this.socketService.getRooms();
  }

  joinRoom(room) {
    this.changeViewToRoom.emit(room);
  }

  deleteAllRooms() {
    this.httpService.post('/deleteRooms', {}).subscribe(
      (data) => {
        if (data.error != null) {
          alert(data.error);
        } else {
          alert("Deleted rooms successfully!");
          this.resetRooms();
        }
      }
    );
  };

  resetRooms() {
    this.rooms = {
      '0': [],
      '1': [],
      '2': []
    };
  }

  resetCreateRoom() {
    this.newDifficulty = -1;
    this.newRoomName = '';
    this.displayCreateRoom = false;
  }

  toggleDisplayCreateRoom() {
    this.displayCreateRoom = !this.displayCreateRoom;
  }
}
