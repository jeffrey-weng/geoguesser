import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-guess-result',
  templateUrl: './guess-result.component.html',
  styleUrls: ['./guess-result.component.css']
})
export class GuessResultComponent implements OnInit {

  map: any;
  @Input() location: any;
  @Input() guessLocation: any;
  @Output() distanceAway = new EventEmitter<number>();

  midpoint: any;

  constructor() { }

  ngOnInit(): void {
    this.midpoint = this.getMidPoint(this.location.latitude, this.location.longitude, this.guessLocation.latitude, this.guessLocation.longitude);
    //console.log("midpoint: " + this.midpoint.lat + "  " + this.midpoint.lng);
    this.map = new google.maps.Map(document.getElementById("guessResult") as HTMLElement, {
    center: this.midpoint,
    zoom: 3,
    streetViewControl: false
  });

    let marker1 = new google.maps.Marker({
      position: {lat: this.location.latitude, lng: this.location.longitude},
      title: "Image Location",
      icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
      });
    marker1.setMap(this.map);

    let marker2 = new google.maps.Marker({
      position: {lat: this.guessLocation.latitude, lng: this.guessLocation.longitude},
      title: "Your Guess",
      icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
      });
    marker2.setMap(this.map);

    const lineSymbol = {
      path: "M 0,-1 0,1",
      strokeOpacity: 1,
      scale: 2
    };

    const path = new google.maps.Polyline({
      path: [{lat: this.location.latitude, lng: this.location.longitude},{lat: this.guessLocation.latitude, lng: this.guessLocation.longitude}],
      geodesic: false,
      strokeColor: "#000000",
      strokeOpacity: 0,
      icons:[
        {
          icon: lineSymbol,
          offset: "0",
          repeat: "20px"
        }
      ]
    });
  
    path.setMap(this.map);
   
    
    this.getLocationAddress(new google.maps.Geocoder());

    //console.log(this.guessLocation.latitude, this.guessLocation.longitude, this.location.latitude, this.location.longitude)
  }

  getMidPoint = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    function toRadians(degress: number): number {
      return degress * (Math.PI / 180);
    }
  
    function toDegrees(radians: number): number {
      return (radians * (180 / Math.PI));
    }
  
    const lngDiff = toRadians(lon2 - lon1);
    const latA = toRadians(lat1);
    const latB = toRadians(lat2);
    const lngA = toRadians(lon1);
  
    const bx = Math.cos(latB) * Math.cos(lngDiff);
    const by = Math.cos(latB) * Math.sin(lngDiff);
  
    const latMidway = toDegrees(
      Math.atan2(
        Math.sin(latA) + Math.sin(latB),
        Math.sqrt((Math.cos(latA) + bx) * (Math.cos(latA) + bx) + by * by)
      )
    );
    const lngMidway = toDegrees(lngA + Math.atan2(by, Math.cos(latA) + bx));
  
    return {lat: latMidway, lng: lngMidway};
  }

  getDistanceFromLatLonInKm = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    var p = 0.017453292519943295;    // Math.PI / 180
    var c = Math.cos;
    var a = 0.5 - c((lat2 - lat1) * p)/2 + 
            c(lat1 * p) * c(lat2 * p) * 
            (1 - c((lon2 - lon1) * p))/2;
  
    return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
  }
  
  deg2rad = (deg: number): number => deg * (Math.PI/180);

  getLocationAddress =(
    geocoder: google.maps.Geocoder
  ) => {
    geocoder.geocode(
      { location: {lat: this.location.latitude, lng: this.location.longitude} },
      (
        results: google.maps.GeocoderResult[],
        status: google.maps.GeocoderStatus
      ) => {
        if (status === "OK") {
          if (results[0]) {
            //console.log(this.location.location);

            for(let i = 0; i<results[0].address_components.length; i++){
              if(results[0].address_components[i].short_name === "US"){
                this.location.location += ", " + results[0].address_components[i-1].long_name + ", US";
                break;
              }
              if(results[0].address_components[i].types.includes("country")){
                this.location.location+=", " + results[0].address_components[i].long_name;
                break;
              }
            }
            //console.log(results[0].address_components);

            if(!this.location.location.includes(","))
              this.location.location = results[0].formatted_address;

            let distanceAway = Math.round(this.getDistanceFromLatLonInKm(this.guessLocation.latitude, this.guessLocation.longitude, this.location.latitude, this.location.longitude)*1000)/1000;
            this.distanceAway.emit(distanceAway);
            (document.getElementById("distance") as HTMLElement).innerHTML = "Your guess was " + distanceAway + " kilometers from the image location: " + this.location.location;
          } else {
            window.alert("No results found");
          }
        } else {
          window.alert("Geocoder failed due to: " + status);
        }
      }
    );
  }

}
