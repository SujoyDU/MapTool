import {Component, ElementRef, OnInit, NgZone} from '@angular/core';
import {FormControl} from "@angular/forms";
import { MapsAPILoader } from 'angular2-google-maps/core';
import {ViewChild} from "@angular/core/src/metadata/di";
import {GoogleMapsAPIWrapper} from 'angular2-google-maps/core/services/google-maps-api-wrapper';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // title = 'app works!';
  // zoom = 14;
  // lat: number = 23.734718;
  // lng: number = 90.412398;


  public lat: number;
  public lng: number;
  public searchControl: FormControl;
  public zoom: number;
  titleOfMarker:string = "Dohatec";
  labelOfMarker:string = "Dohatec CA";


  origin = { longitude: 90.412398, latitude: 23.734718 };  // its a example aleatory position
  destination = { longitude: 90.412398, latitude: 23.704718 };  // its a example aleatory position

  @ViewChild("search")
  public searchElementRef: ElementRef;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    //private gmapsApi: GoogleMapsAPIWrapper
  ) {}

  // constructor (private gmapsApi: GoogleMapsAPIWrapper) {}
  // ngOnInit(){
  //   this.gmapsApi.getNativeMap().then(map => {
  //             var directionsService = new google.maps.DirectionsService;
  //             var directionsDisplay = new google.maps.DirectionsRenderer;
  //             directionsDisplay.setMap(map);
  //             directionsService.route({
  //                     origin: {lat: this.origin.latitude, lng: this.origin.longitude},
  //                     destination: {lat: this.destination.latitude, lng: this.destination.longitude},
  //                     waypoints: [],
  //                     optimizeWaypoints: true,
  //                     travelMode: 'DRIVING'
  //                   }, function(response, status) {
  //                               if (status === 'OK') {
  //                                 directionsDisplay.setDirections(response);
  //                               } else {
  //                                 window.alert('Directions request failed due to ' + status);
  //                               }
  //             });
  //
  //   });
  ngOnInit() {
    //set google maps defaults
    this.zoom = 14;
    this.lat = 23.734718;
    this.lng = 90.412398;

    //create search FormControl
    this.searchControl = new FormControl();

    //set current position
    //this.setCurrentPosition();

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.lat = place.geometry.location.lat();
          this.lng = place.geometry.location.lng();
          this.zoom = 14;
        });
      });
    });

    // this.gmapsApi.getNativeMap().then(map => {
    //   var directionsService = new google.maps.DirectionsService;
    //   var directionsDisplay = new google.maps.DirectionsRenderer;
    //   directionsDisplay.setMap(map);
    //   directionsService.route({
    //     origin: {lat: this.origin.latitude, lng: this.origin.longitude},
    //     destination: {lat: this.destination.latitude, lng: this.destination.longitude},
    //     waypoints: [],
    //     optimizeWaypoints: true,
    //     travelMode: 'DRIVING'
    //   }, function (response, status) {
    //     if (status === 'OK') {
    //       directionsDisplay.setDirections(response);
    //     } else {
    //       window.alert('Directions request failed due to ' + status);
    //     }
    //   })
    // });

  }
  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }
}
