import { Component, AfterViewInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Map, Popup, Marker } from 'mapbox-gl';
import { MapService } from '../../services';
import { PlacesService } from '../../services/places.service';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css']
})
export class MapViewComponent implements AfterViewInit {

  @ViewChild('mapDiv')
  mapDivElement!: ElementRef;

  constructor( private placesServices: PlacesService,
                private mapServices: MapService ) { }
  ngAfterViewInit(): void {
    if( !this.placesServices.useLocation ) throw new Error('No hay placesServices.userLocation');
    
    const map = new Map({
      container: this.mapDivElement.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/light-v10', // style URL
      center: this.placesServices.useLocation, // starting position [lng, lat]
      zoom: 14 // starting zoom
      });

      const popup = new Popup()
        .setHTML(`
        <h6>Aqui estoy</h6>
        <span>Estoy en este lugar del mundo</span>
        `);
    
    new Marker({color: 'red'}).setLngLat( this.placesServices.useLocation )
    .setPopup( popup )
    .addTo( map );

    this.mapServices.setMap( map );


  }


}
