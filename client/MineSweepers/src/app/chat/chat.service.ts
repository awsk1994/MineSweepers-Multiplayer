import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ChatService {
  private url = 'http://localhost:3000';  
  private socket;

  constructor() { }

  sendMessage(message){
    this.socket.emit('chat message', message);    
  }

  getMessages() {
    let observable = new Observable(observer => {
      this.socket = io(this.url);
      this.socket.on('chat message', (msg) => {
        observer.next(msg);    
      });
      return () => {
        this.socket.disconnect();
      };  
    })     
    return observable;
  }  

}
