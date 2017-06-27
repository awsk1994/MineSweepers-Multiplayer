import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Input} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent} from './app.component';
import { GameComponent } from './game/game.component';
import { GameInfoComponent } from './game-info/game-info.component';
import { GameSettingsComponent } from './game-settings/game-settings.component';
import { TimerComponent } from './timer/timer.component';
import {SharedDataService} from './shared-data.service';
import { OnlineComponent } from './online/online.component';
import { HighscoreComponent } from './highscore/highscore.component';
import { InfoComponent } from './info/info.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { GameInstructionComponent } from './game-instruction/game-instruction.component'

const appRoutes: Routes = [
  { path: '', component: GameComponent },
  { path: 'minesweeperonline', component: OnlineComponent },
  { path: 'highscore', component: HighscoreComponent },
  { path: 'info', component: InfoComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    GameInfoComponent,
    GameSettingsComponent,
    TimerComponent,
    OnlineComponent,
    HighscoreComponent,
    InfoComponent,
    PageNotFoundComponent,
    GameInstructionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [SharedDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
