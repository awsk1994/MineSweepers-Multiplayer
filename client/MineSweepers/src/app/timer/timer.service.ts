import { Injectable, EventEmitter } from '@angular/core';

export enum TimerStatus{
  PAUSED,
  RUNNING
}

@Injectable()
export class TimerService {
  public time:number = 0;
  public timerThread;
  timeUpdated = new EventEmitter();
  state:number = TimerStatus.PAUSED;
  
  constructor() {}

  run(){
    if(this.state == TimerStatus.PAUSED){
      this.timerThread = setInterval(() => {
        this.state = TimerStatus.RUNNING;
        this.time = this.time + 1000;
        this.timeUpdated.emit(this.time);
      }, 1000);
    } else {
      alert("ERROR on TimerService: timerState is RUNNING. Cannot run timerThread when it is already running.");
    }
  }

  pause(){
    clearInterval(this.timerThread);
    this.state = TimerStatus.PAUSED;
  }

  setTimeToZero(){
    this.time = 0;
    this.timeUpdated.emit(this.time);
  }

  reset(){
    this.pause();
    this.setTimeToZero();
  }
}
