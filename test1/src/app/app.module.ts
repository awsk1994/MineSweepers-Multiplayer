import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Input} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent} from './app.component';
import { GameComponent } from './game/game.component';
import { GameInfoComponent } from './game-info/game-info.component';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    GameInfoComponent
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
