import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RequestNameService } from './request-name.service';

@Component({
  selector: 'request-name',
  templateUrl: './request-name.component.html',
  styleUrls: ['./request-name.component.css']
})
export class RequestNameComponent implements OnInit {
  nickname:string;
  //currentNickname:string;
  //displayCreateNickname:boolean = false;
  /**
   * This will signal soloComponent to switch to the next tag, which is <rooms>
   */
  display = 'none';

  constructor(private requestNameService:RequestNameService) {
    // this.currentNickname = localStorage.getItem('nickname');
    // if(this.currentNickname == null){
    //   this.displayCreateNickname = true;
    // }
  }

  ngOnInit() {
    this.requestNameService.triggerRequestName.subscribe(
      ()=>{
        this.display = 'block';
      }
    )
  }

  /**
   * This will save nickname in localStorage, and emit nicknameSubmitted, which will trigger soloComponent to switch to the next tag, which is <rooms>
   */
  submitNickname(nickname){
    //localStorage.setItem('nickname', nickname);
    this.requestNameService.nickname = nickname;
    this.requestNameService.nicknameChanged.emit(nickname);
    this.nickname = null;
    this.display = 'none';
  }

  continueAsGuest(){
    //localStorage.setItem('nickname', 'Guest');
    this.requestNameService.nickname = 'Guest';
    this.requestNameService.nicknameChanged.emit('Guest');
    this.nickname = null;
    this.display = 'none';
  }

  // keepcurrentNickname(keep){
  //   if(!keep){
  //     localStorage.removeItem('nickname');
  //     this.currentNickname = null;
  //   } else {
  //     this.display = 'none';
  //   }
  // }
}
