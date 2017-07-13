import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class RequestNameService {
  triggerRequestName = new EventEmitter();
  nicknameChanged = new EventEmitter();
  
  constructor() { }

  handleRequestName() {
      this.triggerRequestName.emit();
  }
}
