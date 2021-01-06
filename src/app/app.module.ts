import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { GameComponent } from './game/game.component';
import { LocationImageComponent } from './location-image/location-image.component';
import { MapComponent } from './map/map.component';
import { GoogleStreetViewService } from './google-street-view-service';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    GameComponent,
    LocationImageComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [GoogleStreetViewService],
  bootstrap: [AppComponent]
})
export class AppModule { }
