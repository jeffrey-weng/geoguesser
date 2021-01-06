import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LocationService } from '../location.service';
import { Location } from '../location';
import { Router } from '@angular/router';
import { of } from 'rxjs';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  location: any;
  guessLocation: any;
  guessButtonEnabled: boolean = false;
  roundsPlayed: number = 0;
  distances: number[] = [];
  timesTaken: number[] = [];
  avgDistanceAway: number;
  closestDistance: number;
  farthestDistance: number;
  avgTimeTaken: number;
  shortestTimeTaken: number;
  longestTimeTaken: number;
  showGuessResults: boolean = false;
  gameEnded: boolean = false;

  @Output() backToHome = new EventEmitter<boolean>();

  constructor(private locationService: LocationService, private router: Router) { }

  ngOnInit(): void {
    this.getRandomLocation();
  }

  getRandomLocation = (): void =>{
    this.locationService.getLocation().subscribe(location => {
    this.location = location;
    })
  }
  enableGuessButton(): void{
    this.guessButtonEnabled = true;
  }
  
  storePlayerCurrGuess = (playerGuessLocation: Location) =>{
    this.guessLocation = playerGuessLocation;
    //console.log(this.guessLocation.name);
  }
  makeGuess = () => {
     this.showGuessResults = true;
  }
  addToDistances = (distance: number) =>{
    this.distances.push(distance);
  }

  getNextLocation = () => {
    this.location = null;
    this.getRandomLocation();
    this.showGuessResults = false;
    this.guessButtonEnabled = false;
  } 
  endGame = () =>{
    this.gameEnded = true;
    this.guessButtonEnabled = false;
    if(this.distances.length==0){
        this.router.navigate(['']);
        return;
    } 
    let distanceSum: number = 0;
    this.closestDistance = this.distances[0];
    this.farthestDistance = this.distances[0];
    
    for(let i = 0; i<this.distances.length; i++){
      distanceSum+=this.distances[i];
      this.closestDistance = Math.min(this.closestDistance,this.distances[i]);
      this.farthestDistance = Math.max(this.farthestDistance,this.distances[i]);
    }

    this.avgDistanceAway = Math.round((distanceSum/this.distances.length)*1000)/1000;
    this.roundsPlayed = this.distances.length;
  }

  goHome = () => this.backToHome.emit(true);

  restartGame = () =>{
    this.gameEnded = false;
    this.showGuessResults = false;
    this.location = null;
    this.getRandomLocation();
    this.roundsPlayed = 0;
    this.distances = [];
  }
  
  
}

