import { Component, OnInit } from '@angular/core';
import { LengthLimit } from '../sharedPipes';
import * as io from 'socket.io-client';

@Component({
  selector: 'chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  logs = [
    // 'Hey',
    //  'Wassup',
    //  'How are you?',
    //  'Im doing great',
     'I see. The weather is nice today',
     'I hope it stays like this.',
     'Its predicted to rain tomorrow though'
     ];
  message:string;
  username:string = 'awong1234567890';
  constructor() {
    const socket = io('http://localhost:3000');
    socket.on('chat message', function(msg){
      console.log("got message: " + msg);
      //this.logs.push(msg);
    });
  }

  ngOnInit() {
  }

  sendMessage(message){
    console.log('send message: ' + message);
    // http send message
    this.logs.push(message);
    this.message = '';
  }

}
