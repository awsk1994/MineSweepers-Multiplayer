import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'request-name',
  templateUrl: './request-name.component.html',
  styleUrls: ['./request-name.component.css']
})
export class RequestNameComponent implements OnInit {

  constructor() { }
  nickname:string;
  @Output() nicknameSubmitted = new EventEmitter<string>();

  ngOnInit() {
  }

  submitNickname(){
    this.nicknameSubmitted.emit(this.nickname);
  }
}
