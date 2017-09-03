import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class RequestNameService {
  triggerRequestName = new EventEmitter();
  nicknameChanged = new EventEmitter();
  nickname = "";
  
  constructor() { }

  handleRequestName() {
      this.triggerRequestName.emit();
  }
  
  getNickname(){
    if(!this.nickname || this.nickname == ''){
      //this.handleRequestName();
      this.nickname = "Guest";
    }
    return this.nickname;
  }
}
