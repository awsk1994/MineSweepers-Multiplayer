import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router"

import { AppComponent } from './app.component';
import { TimerComponent } from './timer/timer.component';
import { DifficultyComponent } from './difficulty/difficulty.component';
import { GameboardComponent } from './gameboard/gameboard.component';
import { ActionComponent } from './action/action.component';
import { SoloComponent } from './solo/solo.component';
import { HighscoreComponent } from './highscore/highscore.component';
import { FlagbombComponent } from './flagbomb/flagbomb.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ChatComponent } from './chat/chat.component';

const appRoutes:Routes = [
  { path: '', redirectTo: '/solo', pathMatch: 'full'},
  { path: 'solo', component: SoloComponent, data: {isSolo: true}},
  { path: 'multiplayer', component: SoloComponent, data: {isSolo: false}},
  { path: 'highscore', component: HighscoreComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    TimerComponent,
    DifficultyComponent,
    GameboardComponent,
    ActionComponent,
    SoloComponent,
    HighscoreComponent,
    FlagbombComponent,
    FooterComponent,
    HeaderComponent,
    PageNotFoundComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
