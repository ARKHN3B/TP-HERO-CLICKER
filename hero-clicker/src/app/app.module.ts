import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { HttpClientModule } from '@angular/common/http'
import { HttpModule } from '@angular/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatSnackBarModule } from '@angular/material'

import { AppComponent } from './components/app.component'
import { PlayerheadComponent } from './components/playerhead.component'
import { GameviewComponent } from './components/gameview.component'
import { WeaponstoreComponent } from './components/weaponstore.component';
import { Store } from './store';

@NgModule({
  declarations: [
    AppComponent,
    PlayerheadComponent,
    GameviewComponent,
    WeaponstoreComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    BrowserAnimationsModule,
    MatSnackBarModule
  ],
  providers: [Store],
  bootstrap: [AppComponent]
})
export class AppModule { }
