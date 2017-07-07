import { Component, OnInit, OnDestroy } from '@angular/core';
import { LengthLimit } from '../sharedPipes';
import { ChatService } from './chat.service';
import * as io from 'socket.io-client';

@Component({
  selector: 'chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  logs = [];
  message:string;
  username:string = 'awong1234567890';
  connection;

  socket = null;
  constructor(private chatService:ChatService) {
    // this.socket = io('http://localhost:3000');
    // this.socket.on('globalChat', function(msg){
    //   console.log('globalchat: ' + msg);
    // });
  }

  ngOnInit() {
    this.connection = this.chatService.getLogs().subscribe(
      (log) => {
        this.logs.push(log);
      }
    );
  }

  ngOnDestroy() {
    this.connection.unsubscribe();
  }

  sendMessage(message){
    console.log('send message: ' + message);
    // http send message
    this.chatService.sendMessage(this.username, message);
    //this.logs.push(message);
    this.message = '';
  }
  createClient(){
    this.chatService.createClient();
  }

}
