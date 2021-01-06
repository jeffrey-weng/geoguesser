import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Geo Guesser';
  gameStarted = false;

  constructor(public auth: AuthService) {}

  startGame(gameStarted: boolean){
    this.gameStarted = gameStarted;
  }
  endGame(gameEnded: boolean){
    this.gameStarted = false;
  }
}
