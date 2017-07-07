import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ChatService {
  private url = 'http://localhost:3000';  
  private socket;

  constructor() {
    this.socket = io(this.url);
  }

  sendMessage(username, message){
    this.socket.emit('globalChat', username, message);    
  }

  getLogs() {
    let observable = new Observable(observer => {
      this.socket.on('globalChat', (log) => {
        observer.next(log);    
      });
      return () => {
        this.socket.disconnect();
      };
    })
    return observable;
  }


  createClient(){
    this.socket.emit('createClient');
  }

  sendHighscore(name, time){
    this.socket.emit('sendHighscore', name, time);
  }

}
