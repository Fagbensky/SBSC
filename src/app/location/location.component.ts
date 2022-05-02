import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {

  latitude: number = 6;
  longitude: number = 3;
  address?: string;
  snackBarDurationInSeconds = 3.5;
  markers: any;
  loc = false;
  position = {
    lat: this.latitude,
    lng: this.longitude,
  };
  title = 'Your Location';
  option = { animation: google.maps.Animation.BOUNCE };

  map?: google.maps.Map
  infoWindow?: google.maps.InfoWindow;

  constructor(
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.getLocation()
  }


  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        if (position.coords.latitude && position.coords.longitude) {
          this.longitude = position.coords.longitude;
          this.latitude = position.coords.latitude;
          this.loc = true;
        }
      }, this.error, this.options
      );
    } else {
      this.showSnackbarAction("Geolocation is not supported by this browser.", "Ok");
    }
  }

  options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };

  error(error: any) {
    this.showSnackbarAction(error.message, "Ok");
  }


  showSnackbarAction(content: string, action: string) {
    let snack = this.snackBar.open(content, action, {
      duration: this.snackBarDurationInSeconds * 1000,
    });
    snack.onAction().subscribe(() => {
      snack.dismiss();
    });
  }


  center: google.maps.LatLngLiteral = { lat: this.latitude, lng: this.longitude };
  zoom = 7;
  display: any;

  moveMap(event: google.maps.MapMouseEvent) {
    this.center = (event.latLng!.toJSON());
  }

  move(event: google.maps.MapMouseEvent) {
    this.display = event.latLng!.toJSON();
  }
}