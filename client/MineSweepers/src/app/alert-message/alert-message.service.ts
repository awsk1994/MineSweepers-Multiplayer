import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class AlertMessageService {
  
  triggerAlertMessage = new EventEmitter();

  constructor() { }

/**
 * Called by GameService
 * @param status 0=gameOver(lose) 1=win!
 * @param data Other metadata, such as difficulty, time used (min:sec), flags placed and total bombs.
 */
  displayAlertMesssage(status, data){
    this.triggerAlertMessage.emit({
      'status': status,
      'data': data
    });
  }
}