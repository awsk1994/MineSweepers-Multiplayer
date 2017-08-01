import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { HttpService } from '../http.service';
import { RequestNameService } from '../request-name/request-name.service';
import { SocketService } from '../socket.service';

@Component({
  selector: 'room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  players = [];
  ready = false;
  roomId = -1;
  nickname;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private httpService: HttpService,
    private requestNameService: RequestNameService,
    private socketService: SocketService) {
    // Get Room Id
    route.params.subscribe(params => {
      this.roomId = params['roomId'];
      this.httpService.post('/joinRoom', {
        'roomId': this.roomId,
        'nickname': this.requestNameService.getNickname()
      }).subscribe(
        (data) => {
          if (data.error != null) {
            alert(data.error);
          } else {
            this.socketService.joinRoom(this.requestNameService.getNickname(), this.roomId);
            this.players = data.detail.players;
          }
        });
    });
  }

  ngOnInit() {

  }

  toggleReady() {
    this.ready = !this.ready;
  }

  returnToRooms() {
    this.router.navigate(['/multiplayer']);
    //todo: leaveRoom (update db). Need to set route change to detect leave room.
  }
}
