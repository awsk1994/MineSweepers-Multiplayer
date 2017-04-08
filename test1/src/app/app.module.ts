import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Input} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent} from './app.component';
import { GameComponent } from './game/game.component';
import { GameInfoComponent } from './game-info/game-info.component';
import { GameSettingsComponent } from './game-settings/game-settings.component';
import { TimerComponent } from './timer/timer.component';
import {SharedDataService} from './shared-data.service'

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    GameInfoComponent,
    GameSettingsComponent,
    TimerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [SharedDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
