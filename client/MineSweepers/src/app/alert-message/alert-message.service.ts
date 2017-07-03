import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class AlertMessageService {
  
  triggerAlertMessage = new EventEmitter();

  constructor() { }

  displayAlertMesssage(status, data){
    this.triggerAlertMessage.emit({
      'status': status,
      'data': data
    });
  }

}