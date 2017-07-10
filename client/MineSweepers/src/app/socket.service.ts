import { Http, Response, Headers } from "@angular/http";
import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SocketService {
  private url = 'http://localhost:3000';
  private socket;

  constructor() {
    console.log("socket service constructor");
    this.socket = io(this.url);
  }

  sendMessage(username, message) {
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


/* MULTIPLAYER */
  createRoom(data) {
    this.socket.emit('createRoom', data);
  }

  // will trigger roomsUpdate message, and update rooms.
  getRooms(difficulty) {
    console.log(this.socket);
    this.socket.emit('getRooms', difficulty);
  }

  roomsUpdate() {
    let observable = new Observable(observer => {
      this.socket.on('roomsUpdate', (rooms) => {
        observer.next(rooms);
      });
      return () => {
        this.socket.disconnect();
      };
    })
    return observable;
  }

  gameStart() {
    let observable = new Observable(observer => {
      this.socket.on('gameStart', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    })
    return observable;
  }

  // whenever flag added or numbers revealed, update server.
  updateGame(data){
    this.socket.emit('updateGame', data);
  }

  // status: win or lose?
  finishGame(status){
    this.socket.emit('finishGame', status);
  }

  // restartGame? true or false
  restartGame(status){
    this.socket.emit('restartGame', status);
  }

  // agree to restart as well?
  agreeRestartGame(status){
    this.socket.emit('agreeRestartGame', status);
  }
}
