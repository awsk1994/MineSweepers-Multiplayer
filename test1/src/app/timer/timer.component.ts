import { Component, Input, Output, OnInit, OnDestroy, EventEmitter} from '@angular/core';

@Component({
  selector: 'timer',
  templateUrl: './timer.component.html'
})
export class TimerComponent implements OnInit, OnDestroy{
  totalTicks:number = 10;
  ticks:number;
  timer;
  isPaused:boolean;
  @Output() reachedZero = new EventEmitter<boolean>();

  
  constructor(){
    this.reset();
  }

  ngOnInit() { 
    let timer = setInterval(() => {
      if(!this.isPaused){
        this.ticks -= 1;
      }

      if(this.ticks == 0){
        this.isPaused = true;
        this.ticks = -1;
        this.reachedZero.emit();
      }
    }, 1000);
  }

  reset(){
    this.ticks = this.totalTicks;
    this.isPaused = true;
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
