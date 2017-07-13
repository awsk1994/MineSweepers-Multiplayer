import { Component, OnInit } from '@angular/core';
import { RequestNameService } from '../request-name/request-name.service';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  nickname:string;

  constructor(private requestNameService:RequestNameService) {
       this.nickname = localStorage.getItem('nickname');
  }
  
  ngOnInit() {
    this.requestNameService.nicknameChanged.subscribe(
      ()=>{
       this.nickname = localStorage.getItem('nickname');
      }
    );
  }

  removeNickname(){
    localStorage.removeItem('nickname');
    this.nickname = null;
    this.requestNameService.triggerRequestName.emit();
  }

}
