import { Component, Input, OnInit, OnDestroy } from '@angular/core';
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

  logs = {'global': [], 'room': []};
  selectedLog = 'global';

  message:string;
  username:string;
  @Input() roomId;

  roomMessage:string;

  constructor(private socketService:SocketService,
  private requestNameService:RequestNameService) {
    this.username = this.requestNameService.getNickname();
  }

  ngOnInit() {
    this.socketService.getGlobalLogs().subscribe(
      (log) => {
        this.logs.global.push(log);
      }
    );

    this.socketService.getRoomLogs().subscribe(
      (log) => {
        this.logs.room.push(log);
      }
    );

    this.requestNameService.nicknameChanged.subscribe(
      ()=>{
        this.username = this.requestNameService.getNickname();
      }
    );
  }

  sendMessage(roomId, message){
    if(this.selectedLog == 'global'){
      this.sendGlobalMessage(message);
    } else {
      this.sendRoomMessage(roomId, message);
    }
    this.message = '';
  };

  /**
   * Send 'GLOBAL' chat
   * @param message The content to send to server.
   */
  sendGlobalMessage(message){
    console.log('send global message: ' + message);
    // http send message
    this.socketService.sendGlobalMessage(this.username, message);
  }

  /**
   * Send to a specific room's chat.
   * @param message The content to send to server.
   */
  sendRoomMessage(roomId, roomMessage){
    console.log('send room message: ' + roomMessage + ', to room: ' + roomId);
    // http send message
    this.socketService.sendRoomMessage(this.username, roomId, roomMessage);
  }
}
