import { Injectable } from '@angular/core';

@Injectable()
export class SharedDataService {
  time:number;

  constructor() {}

  setTime(time){
    this.time = time;
  }

  getTime(){
    return this.time;
  }

}
