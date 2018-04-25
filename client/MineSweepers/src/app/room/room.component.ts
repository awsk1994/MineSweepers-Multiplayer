import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
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
  players;
  ready = false;
  roomId = -1;
  nickname;
  countDownToStartGame = false;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private httpService: HttpService,
    private requestNameService: RequestNameService,
    private socketService: SocketService) {

    // window.onbeforeunload = function(event) {
    //   alert("before unload");
    //   socketService.test("before unload");
    // };

    console.log("room constructor");
    this.nickname = this.requestNameService.getNickname();

    // Get Room Id
    route.params.subscribe(params => {
      this.roomId = params['roomId'];
      console.log("try to join room: " + this.roomId);
      this.socketService.joinRoom(this.nickname, this.roomId);
    });

    this.socketService.getObservable('playersUpdate').subscribe(
      (players) => {
        console.log("players:");
        console.log(players);
        this.players = players;
      }
    );
  }

  ngOnDestroy() {
    console.log("Leaving room: ngOnDestroy. name: " + this.nickname + ", room Id: " + this.roomId);
    this.socketService.leaveRoom(this.roomId);
  };

  ngOnInit() {

  }

  toggleReady() {
    this.ready = !this.ready;
    this.socketService.sendReadyStatus(this.roomId, this.ready)
  }

  returnToRooms() {
    console.log("room id: " + this.roomId);
    this.router.navigate(['/multiplayer']);
  }
}
