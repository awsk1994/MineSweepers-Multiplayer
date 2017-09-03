import { Component, OnInit, OnDestroy} from '@angular/core';
import { RequestNameService } from '../request-name/request-name.service';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public nickname:string;

  constructor(private requestNameService:RequestNameService) {
       this.nickname = this.requestNameService.getNickname();
  }
  
  ngOnInit() {
    console.log("header | ngOnInit");
    this.requestNameService.nicknameChanged.subscribe(
      ()=>{
       this.nickname = this.requestNameService.getNickname();
      }
    );
  }

  ngOnDestroy() {
    console.log("header | ngOnDestroy()");
  }

  removeNickname(){
    localStorage.removeItem('nickname');
    this.nickname = null;
    this.requestNameService.triggerRequestName.emit();
  }

}
