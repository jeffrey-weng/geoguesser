import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-location-image',
  templateUrl: './location-image.component.html',
  styleUrls: ['./location-image.component.css']
})
export class LocationImageComponent implements OnInit {

  constructor(googleStreetViewService: GoogleStreetViewService) { }

  ngOnInit(): void {
  }


map;

panorama;

/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
getRandomArbitrary = (min: number, max: number) => Math.random() * (max - min) + min;


/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 */
getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, false); // true for asynchronous 
    xmlHttp.send(null);
}

/**
 * Returns json array string of location data
 */
//var fs = require('fs');

 let initMap = () => {

    let jsonString;

    httpGetAsync('http://' + location.host + '/api/data', (data)=>{

     jsonString=data;
    });
   
  
  let locations = JSON.parse(jsonString);
  
  let randomIndex = getRandomInt(0,locations.length - 1);

  const place = { lat: locations[randomIndex].latitude, lng: locations[randomIndex].longitude };

  // console.log("placeName: " + locations[randomIndex].location);
  // console.log("location: " + place);

  const sv = new google.maps.StreetViewService();

  map = new google.maps.Map(document.getElementById("map"), {
    center: {lat: 40.866667, lng: 34.566667 },
    zoom: 2,
    streetViewControl: false
  });
  panorama = new google.maps.StreetViewPanorama(
    document.getElementById("pano")
  );
  // Set the initial Street View camera to the center of the map
  sv.getPanorama({ location: place, preference: google.maps.StreetViewPreference.BEST, radius: 1000, source: google.maps.StreetViewSource.OUTDOOR }, processSVData);
  }

function processSVData(
  data, //google.maps.StreetViewPanoramaData | null,
  status //google.maps.StreetViewStatus
) {
  if (status === "OK") {

    const location = data.location;
   

    panorama.setPano(location.pano);
   
    panorama.setVisible(true);

    
  } else {
    console.error(status);
    initMap();
    
  }
}

initMap();




}
