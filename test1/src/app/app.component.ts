import { Component, Input} from '@angular/core';

class Joke {
  setup: string;
  punchline: string;
  hide: boolean;

  constructor(setup: string, punchline: string, hide: boolean) {
    this.setup = setup;
    this.punchline = punchline;
    this.hide = hide;
  }

  toggle() {
    this.hide = !this.hide;
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  startAt = 'User Interaction & Outputs';
}

@Component({
  selector: 'joke-list',
  template: `
  <joke *ngFor="let j of jokes" [joke]="j"></joke>
  `,
  styleUrls: ['./app.component.css']
})
export class JokeListComponent {
  jokes: Object[];
  constructor() {
    this.jokes = [
      new Joke("Joke1", "This is Joke 1", true),
      new Joke("Joke2", "This is Joke 2", true),
      new Joke("Joke3", "This is Joke 3", true)
    ];
  }
}

@Component({
  selector: 'joke',
  template: `
  <div class="card card-block">
    <h4 class="card-title">{{data.setup}}</h4>
    <p class="card-text" [hidden]=data.hide>{{data.punchline}}</p>
    <a class="btn btn-primary" (click)="data.toggle()">Tell me</a>
  </div>
  `,
  styleUrls: ['./app.component.css']
})
export class JokeComponent {
  @Input('joke') data: Joke;
}
