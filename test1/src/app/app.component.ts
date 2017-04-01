import { Component, Input, Output, EventEmitter} from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  footer: string = "Created by Alex Wong 2017 (Powered by Angular2)";
}

/*
class Joke {
  setup: string;
  punchline: string;
  hide: boolean;

  constructor(setup: string, punchline: string, hide: boolean = true) {
    this.setup = setup;
    this.punchline = punchline;
    this.hide = hide;
  }

  toggle() {
    this.hide = !this.hide;
  }
}


@Component({
  selector: 'joke-form',
  template: `
  <div class="card card-block">
    <h1> Create form </h1>
    <input type="text" class="form-control" placeholder="Enter the Heading" #heading>
    <input type="text" class="form-control" placeholder="Enter the Content" #content>
    <button type="button" class="btn btn-primary" (click)="createJoke(heading.value, content.value)">Create</button>
  </div>
  `
})
export class JokeFormComponent {
  @Output() jokeCreated = new EventEmitter<Joke>();

  createJoke(heading:string, content:string){
    this.jokeCreated.emit(new Joke(heading, content));
  }
}

@Component({
  selector: 'joke-list',
  template: `
  <joke-form (jokeCreated)=addJoke($event)></joke-form>
  <joke *ngFor="let j of jokes" [joke]="j">
      <h2 class="card-title">{{j.setup}}</h2>
      <p class="card-text" [hidden]=j.hide>{{j.punchline}}</p>
  </joke>
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

  addJoke(joke:Joke){
    console.log("new Joke: " + joke.setup + ", " + joke.punchline);
    this.jokes.unshift(joke);
  }
}

@Component({
  selector: 'joke',
  template: `
  <div class="card card-block">
    <ng-content select="h2"></ng-content>
    <ng-content select="p"></ng-content>
    <a class="btn btn-primary" (click)="data.toggle()">Tell me</a>
  </div>
  `,
  styleUrls: ['./app.component.css']
})
export class JokeComponent {
  @Input('joke') data: Joke;
}
*/