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
    console.log("socket service constructor.");
    this.socket = io(this.url);
  }

  getObservable(socketMsgName) {
    let observable = new Observable(observer => {
      this.socket.on(socketMsgName, (log) => {
        observer.next(log);
      });
      return () => {
        this.socket.disconnect();
      };
    })
    return observable;
  }

  // roomsUpdate() {
  //   let observable = new Observable(observer => {
  //     this.socket.on('roomsUpdate', (rooms) => {
  //       observer.next(rooms);
  //     });
  //     return () => {
  //       this.socket.disconnect();
  //     };
  //   })
  //   return observable;
  // }

  // playersUpdate(){
  //   let observable = new Observable(observer => {
  //     this.socket.on('playersUpdate', (players) => {
  //       observer.next(players);
  //     });
  //     return () => {
  //       this.socket.disconnect();
  //     };
  //   })
  //   return observable;
  // }

  // Can't use getObservable because it specifies a number[][] return type.
  prepareGame() {
    let observable = new Observable<number[][]>(observer => {
      this.socket.on('prepareGame', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    })
    return observable;
  }

  // gameStart() {
  //   let observable = new Observable(observer => {
  //     this.socket.on('gameStart', (data) => {
  //       observer.next(data);
  //     });
  //     return () => {
  //       this.socket.disconnect();
  //     };
  //   })
  //   return observable;
  // }

  sendGlobalMessage(username, message) {
    this.socket.emit('globalChat', username, message);
  }

  sendRoomMessage(username, roomName, message){
    console.log(username + ", " + roomName + "," + message);
    this.socket.emit('roomChat', username, roomName, message);
  }

  /* MULTIPLAYER */
  createRoom(data) {
    this.socket.emit('createRoom', data);
  }

  // will trigger roomsUpdate message, and update rooms.
  getRooms() {
    this.socket.emit('getRooms');
  }

  joinRoom(nickname, roomId){
    this.socket.emit('joinRoom', nickname, roomId);
  }

  leaveRoom(roomId){
    this.socket.emit('leaveRoom', roomId);
  }

  finishGame(isWin, roomId) {
    this.socket.emit('finishGame', isWin, roomId )
  }
  test(msg){
    this.socket.emit(msg);
  }
  // whenever flag added or numbers revealed, update server.
  updateGame(data){
    this.socket.emit('updateGame', data);
  }

  // restartGame? true or false
  restartGame(status){
    this.socket.emit('restartGame', status);
  }

  // agree to restart as well?
  agreeRestartGame(status){
    this.socket.emit('agreeRestartGame', status);
  }

  sendReadyStatus(roomId, ready){
    this.socket.emit('readyStatus', roomId, ready);
  }
}
