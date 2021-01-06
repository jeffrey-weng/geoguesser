import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LocationService } from './location.service';
import { HomeComponent } from './home/home.component';
import { GameComponent } from './game/game.component';
import { PanoramaComponent } from './panorama/panorama.component';
import { HttpClientModule } from '@angular/common/http';
import { MapComponent } from './map/map.component';
import { GuessResultComponent } from './guess-result/guess-result.component';
import { AuthModule } from '@auth0/auth0-angular';
import { environment as env } from '../environments/environment';
import { LoginButtonComponent } from './login-button/login-button.component';
import { SignupButtonComponent } from './signup-button/signup-button.component';
import { LogoutButtonComponent } from './logout-button/logout-button.component';
import { AuthenticationButtonComponent } from './authentication-button/authentication-button.component';
import { LoadingComponent } from './loading/loading.component';
import { ProfileComponent } from './profile/profile.component';
import { UserService } from './user.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GameComponent,
    PanoramaComponent,
    MapComponent,
    GuessResultComponent,
    LoginButtonComponent,
    SignupButtonComponent,
    LogoutButtonComponent,
    AuthenticationButtonComponent,
    LoadingComponent,
    ProfileComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    CommonModule,
    AuthModule.forRoot({
      ...env.auth,
    }),
  ],
  providers: [LocationService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
