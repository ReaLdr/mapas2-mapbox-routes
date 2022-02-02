import { Component } from '@angular/core';
import { MapService, PlacesService } from '../../services';

@Component({
  selector: 'app-btn-my-location',
  templateUrl: './btn-my-location.component.html',
  styleUrls: ['./btn-my-location.component.css']
})
export class BtnMyLocationComponent {

  
  constructor( 
    private placesService: PlacesService,
    private mapServices: MapService ) { }
  
  goToMyLocation(){

    if(!this.placesService.isUserLocationReady) throw new Error("No hay ubicación de usuario");
    if(!this.mapServices.isMapReady) throw new Error("No hay mapa disponible");
    

    this.mapServices.flyTo( this.placesService.useLocation! )

  }

}
