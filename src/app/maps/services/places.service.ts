import { Injectable } from '@angular/core';
import { MapService } from '.';
import { PlacesApiClient } from '../api';
import { Feature, PlacesResponse } from '../interfaces/places';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  public useLocation: [number, number] | undefined;

  public isLoadingPlaces: boolean = false;
  public places: Feature[] = [];

  get isUserLocationReady(): boolean {
    return !!this.useLocation;
  }

  constructor( private PlacesApi: PlacesApiClient,
              private mapService: MapService ) {
    this.getUserLocation();
  }

  public async getUserLocation(): Promise<[number, number]>{
    return new Promise( (resolve, reject) =>{
      navigator.geolocation.getCurrentPosition( 
        ({coords}) => {
          this.useLocation = [coords.longitude, coords.latitude];
          resolve( this.useLocation )
        },
        (err) =>{
          alert('No se pudo obtener la gelocalización');
          console.log(err);
          reject();
        }
       )
    });
  }

  getPlacesByQuery(query: string = ''){
    //TODO: Evaluar cuando el query es un string nulo
    if(query.length === 0){
      this.isLoadingPlaces = false;
      this.places = [];
      return;
    }
    if(!this.useLocation) throw new Error("No hay userLocation");
    
    this.isLoadingPlaces = true;
    this.PlacesApi.get<PlacesResponse>(`/${query}.json`,{
        params: {
          proximity: this.useLocation.join(',')
        }
      })
        .subscribe( resp =>{
          this.isLoadingPlaces = false;
          this.places = resp.features;

          this.mapService.creatMarkersFromPlaces( this.places, this.useLocation! );
        })
  }

  deletePLaces(){
    this.places = [];
  }
}
