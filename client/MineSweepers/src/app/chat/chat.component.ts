import { Component, OnInit, OnDestroy } from '@angular/core';
import { LengthLimit } from '../sharedPipes';
import { SocketService } from '../socket.service';
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

  constructor(private socketService:SocketService) {

  }
  
  getNickname(){
    let nickname = localStorage.getItem('nickname');
    if(!nickname){
      nickname = "Unknown";
    }
    return nickname;
  }

  ngOnInit() {
    this.socketService.getLogs().subscribe(
      (log) => {
        this.logs.push(log);
      }
    );
  }

  /**
   * @param message The content to send to server.
   */
  sendMessage(message){
    console.log('send message: ' + message);
    // http send message
    this.username = this.getNickname();
    this.socketService.sendMessage(this.username, message);
    this.message = '';
  }
}
