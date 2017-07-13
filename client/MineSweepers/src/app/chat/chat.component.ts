import { Component, OnInit, OnDestroy } from '@angular/core';
import { LengthLimit } from '../sharedPipes';
import { SocketService } from '../socket.service';
import { RequestNameService } from '../request-name/request-name.service';

import * as io from 'socket.io-client';

/**
 * Chat component allows users to chat with each other (via sockets). In multiplayer mode, the user can switch beteween global chat and game chat.
 */
@Component({
  selector: 'chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  logs = [];
  message:string;
  username:string;
  roomName:string;
  roomMessage:string;

  constructor(private socketService:SocketService,
  private requestNameService:RequestNameService) {
    this.username = this.getNickname();
  }

  ngOnInit() {
    this.socketService.getLogs().subscribe(
      (log) => {
        this.logs.push(log);
      }
    );
    this.requestNameService.nicknameChanged.subscribe(
      ()=>{
        this.username = this.getNickname();
      }
    )
  }

  getNickname(){
    let nickname = localStorage.getItem('nickname');
    if(!nickname){
      nickname = "Unknown";
    }
    return nickname;
  }

  /**
   * Send 'GLOBAL' chat
   * @param message The content to send to server.
   */
  sendGlobalMessage(message){
    console.log('send global message: ' + message);
    // http send message
    this.username = this.getNickname();
    this.socketService.sendGlobalMessage(this.username, message);
    this.message = '';
  }

  /**
   * Send to a specific room's chat.
   * @param message The content to send to server.
   */
  sendRoomMessage(roomName, roomMessage){
    console.log('send room message: ' + roomMessage + ', to room: ' + roomName);
    // http send message
    this.username = this.getNickname();
    this.socketService.sendRoomMessage(this.username, roomName, roomMessage);
    this.roomName = '';
    this.roomMessage = '';
  }
}
