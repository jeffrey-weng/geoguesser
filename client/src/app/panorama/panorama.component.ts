import { Component, Input, Output, EventEmitter, OnChanges, OnInit } from '@angular/core';
import { Location } from '../location'

@Component({
  selector: 'app-panorama',
  templateUrl: './panorama.component.html',
  styleUrls: ['./panorama.component.css']
})
export class PanoramaComponent implements OnInit {

  @Input() location: Location;
  @Output() validPanoLocation = new EventEmitter<boolean>();
  sv: any;
  panorama: any;
  dataAvailable: boolean = false;

  constructor() {}

  ngOnInit(): void { 
    this.setPanorama();
    this.dataAvailable = true;
    //console.log(this.panorama);
  }

  setPanorama(): void{
      this.panorama = new google.maps.StreetViewPanorama(
        document.getElementById("pano") as HTMLElement, {addressControl: false, showRoadLabels: false}
      );
      //this.panorama.setVisible(true);
      this.sv = new google.maps.StreetViewService().getPanorama({location: {lat: this.location.latitude, lng: this.location.longitude}, 
        preference: google.maps.StreetViewPreference.NEAREST, radius: 15000, source: google.maps.StreetViewSource.OUTDOOR}, this.processSVData); 
  }

  processSVData = (
    data: google.maps.StreetViewPanoramaData | null ,
    status: google.maps.StreetViewStatus 
  ) => {
    if (status === "OK") {
  
      const location = (data as google.maps.StreetViewPanoramaData).location as google.maps.StreetViewLocation;

      this.panorama.setPano(location.pano as string);
      this.panorama.setVisible(true);
  
    } else {
      console.error(status);
      this.validPanoLocation.emit(false);
      this.setPanorama();
    }
  }

}
