import { Component, OnInit } from '@angular/core';
import { LengthLimit } from '../sharedPipes';

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
  constructor() { }

  ngOnInit() {
  }

  sendMessage(message){
    console.log('send message: ' + message);
    // http send message
    this.logs.push(message);
    this.message = '';
  }

}
