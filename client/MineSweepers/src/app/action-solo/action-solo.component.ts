import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';

@Component({
  selector: 'action-solo',
  templateUrl: './action-solo.component.html',
  styleUrls: ['./action-solo.component.css']
})
export class ActionSoloComponent implements OnInit {

  constructor(private gameService:GameService) { }

  ngOnInit() {
  }
}
