import { Component, Input, Output, OnInit, OnDestroy, EventEmitter} from '@angular/core';
import {SharedDataService} from '../shared-data.service'

@Component({
  selector: 'timer',
  templateUrl: './timer.component.html',
})
export class TimerComponent implements OnInit, OnDestroy{
  totalTicks:number = 30;
  ticks:number;
  timer;
  isPaused:boolean;
  @Output() reachedZero = new EventEmitter<boolean>();
  sharedData:SharedDataService;

  constructor(sharedData:SharedDataService){
    this.sharedData = sharedData;
    this.reset();
  }

  ngOnInit() { 
    let timer = setInterval(() => {

      if(!this.isPaused){
        this.ticks -= 1;
        this.sharedData.setTime(this.ticks);
      }

      if(this.ticks == 0){
        this.isPaused = true;
        this.reachedZero.emit();
      }
    }, 1000);
  }

  reset(){
    this.ticks = this.totalTicks;
    this.isPaused = true;
    this.sharedData.setTime(this.ticks);

    console.log("reset: " + this.ticks);
  }

  start(){
    this.isPaused = false;
  }

  pause(){
    this.isPaused = true;
  }

  resume(){
    this.isPaused = false;
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }
}
