import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @Output() gameStarted = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  startGame(){
    this.gameStarted.emit(true);
  }

}
