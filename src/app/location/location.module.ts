import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationRoutingModule } from './location-routing.module';
import { LocationComponent } from './location.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { MaterialModule } from '../shared/material.module';


@NgModule({
  declarations: [
    LocationComponent
  ],
  imports: [
    CommonModule,
    LocationRoutingModule,
    GoogleMapsModule,
    MaterialModule
  ]
})
export class LocationModule { }
