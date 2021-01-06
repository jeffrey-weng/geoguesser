import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Location } from '../location';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  map: any;
  marker: any;
  lat: number;
  long: number;
  @Output() mapClicked = new EventEmitter<boolean>();
  @Output() guessLocation = new EventEmitter<Location>();

  constructor() { }

  ngOnInit(): void {
    this.setMap();
  }

  setMap = () => {
    this.map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
      center: {lat: 40.866667, lng: 34.566667 },
      zoom: 2,
      streetViewControl: false
    });
    this.map.addListener("click", (event: any) => {
      this.lat = event.latLng.toJSON().lat;
      this.long = event.latLng.toJSON().lng;
      this.mapClicked.emit(true);
      this.guessLocation.emit({name:"playerGuessLocation", latitude: this.lat, longitude: this.long});
      
      if(this.marker!=null) this.marker.setMap(null); //clear any existing marker on the map
      this.marker = new google.maps.Marker({
        position: event.latLng,
        icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
      });
      this.marker.setMap(this.map);

    });
  }

  }

