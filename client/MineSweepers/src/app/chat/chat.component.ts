import { Component, OnInit, OnDestroy } from '@angular/core';
import { LengthLimit } from '../sharedPipes';
import { ChatService } from './chat.service';

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
  connection;

  constructor(private chatService:ChatService) {}

  ngOnInit() {
    this.connection = this.chatService.getMessages().subscribe(
      (msg:string) => {
        this.logs.push(msg);
      }
    );
  }

  ngOnDestroy() {
    this.connection.unsubscribe();
  }

  sendMessage(message){
    console.log('send message: ' + message);
    // http send message
    this.chatService.sendMessage(message);
    //this.logs.push(message);
    this.message = '';
  }

}
