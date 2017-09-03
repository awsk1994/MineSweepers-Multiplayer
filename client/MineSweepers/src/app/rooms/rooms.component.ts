import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SoloService } from '../solo/solo.service';
import { SocketService } from '../socket.service';
import { HttpService } from '../http.service';
import { Router } from "@angular/router";
import { RequestNameService } from '../request-name/request-name.service';

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
              private httpService: HttpService,
              private router: Router,
              private requestNameService: RequestNameService) {
    this.resetRooms();
  }

  ngOnInit() {
    this.socketService.roomsUpdate().subscribe(
      (rooms) => {
        console.log(rooms);
        this.rooms = rooms;
      }
    );
    this.socketService.getRooms();
    this.getRoomsByDifficulty(this.difficulty);
  }

  createRoom(difficulty: number, roomName: string) {
    this.httpService.post('/createRoom', {
      'difficulty': difficulty,
      'created_by': this.requestNameService.getNickname(),
      'room_name': roomName
    }).subscribe(
      (data) => {
        if (data.error != null) {
          alert(data.error);
        } else {
          this.resetCreateRoom();
          this.difficulty = difficulty;
          this.rooms[difficulty].push(data.detail);
          this.joinRoom(data.detail);
          //console.log(data.detail);
        }
      });
  };

  getRoomsByDifficulty(difficulty) {
    this.difficulty = difficulty;
  }

  joinRoom(room) {
    this.router.navigate(['multiplayer', room.id]);
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
