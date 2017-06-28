import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'solo',
  templateUrl: './solo.component.html',
  styleUrls: ['./solo.component.css']
})
export class SoloComponent implements OnInit {
  isSolo:string;

  constructor(route: ActivatedRoute) {
    this.isSolo = route.snapshot.data['isSolo'];
  }

  ngOnInit() {
  }

}
