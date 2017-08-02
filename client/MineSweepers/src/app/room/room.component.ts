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
      console.log("try to join room");
      //this.socketService.joinRoom(this.requestNameService.getNickname(), this.roomId);
      this.httpService.post('/joinRoom', {
        'roomId': this.roomId,
        'nickname': this.nickname
      }).subscribe(
        (data) => {
          console.log(data);
          if (data.error != null) {
            alert(data.error);
          } else {
            this.socketService.joinRoom(this.nickname, this.roomId);
            this.players = data.detail.players;
          }
        },
        (error)=>{
          alert(error);
          this.returnToRooms();
        });
    });

    this.socketService.playersUpdate().subscribe(
      (players) => {
        console.log("players:");
        console.log(players);
        this.players = players;
      }
    );
  }



  @HostListener('window:unload', [ '$event' ])
  unloadHandler(event) {
    alert("unloadHandler");
    this.socketService.test("unloadHandler");
  }

  @HostListener('window:beforeunload', [ '$event' ])
  beforeUnloadHander(event) {
    alert("beforeUnloadHander");
    this.socketService.test("beforeunload");
  }

  ngOnDestroy() {
    console.log("Leaving room: ngOnDestroy. name: " + this.nickname + ", room Id: " + this.roomId);
    this.socketService.leaveRoom(this.nickname, this.roomId);
  };

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
