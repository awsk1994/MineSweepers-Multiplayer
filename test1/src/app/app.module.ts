import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Input} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent, JokeComponent, JokeListComponent} from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    JokeComponent,
    JokeListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
