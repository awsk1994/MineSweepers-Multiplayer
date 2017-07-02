import { Component, OnInit } from '@angular/core';
import { TimerService } from './timer.service';

@Component({
  selector: 'timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {
  time: number;

  constructor(private timerService: TimerService) {

  }

  ngOnInit() {
    this.timerService.timeUpdated.subscribe(
      (time: number) => {
        this.time = time;
      });
    this.resetTimer();
  }

  runTimer() {
    this.timerService.run();
  }

  pauseTimer() {
    this.timerService.pause();
  }

  resetTimer() {
    this.timerService.reset();
  }
}
