import { Component, OnInit } from '@angular/core';
import { IonicModule, MenuController, ModalController } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { GoogleMap, LatLngBounds, Marker } from '@capacitor/google-maps';
import { environment } from 'src/environments/environment';
import { PlaceDetailComponent } from '../../place-detail/place-detail.component';

const apiKey = environment.firebaseConfig.apiKey;


@Component({
  selector: 'app-map-direccion',
  templateUrl: './map-direccion.component.html',
  styleUrls: ['./map-direccion.component.scss'],
  standalone : true,
  imports: [IonicModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MapDireccionComponent  implements OnInit {
  map: GoogleMap;
  myLocation: Place;

  constructor(private menuController: MenuController, 
    private modalController: ModalController
  ) { }

  ionViewDidEnter(){
   this.menuController.enable(false, 'main')
   this.initMap();
  }

  ionViewDidLeave(){
   this.menuController.enable(true, 'main')
  }

  async initMap(){
    this.map = await GoogleMap.create({
      id: 'my-map',
      element: document.getElementById('map') as HTMLElement,
      apiKey: apiKey,
      config:{
        center: {
          lat: 33.6,
          lng: -117.9,
        },
        zoom: 8,
      },
    });

    this.setMarkerDemo();
    this.setPlacesDemo();
    this.addListener();

    this.map.enableTrafficLayer(true);

    this.map.setOnMapClickListener( res => {
      console.log('setOnMapClickListener -> ', res);
    });

    this.map.enableCurrentLocation(true);
    };


  setMarkerDemo(){
    const marker: Marker = {
      coordinate: {
        lat: -33.41568662549316,
        lng: -70.7173231625681,
      }
    }
    this.map.addMarker(marker)
  }

  
  setPlacesDemo(){
    places.forEach(async (place) => {
      const id = await this.map.addMarker(place.marker);
      place.id = id;
      
    });
  }


  addListener(){
    this.map.setOnMapClickListener( res =>{
      console.log('MapClickListener -> ', res);
      const marker: Marker = {
        title: 'hola mundo',
        snippet: 'un texto  más largo',
        draggable: true,
        coordinate: {
          lat: res.latitude,
          lng: res.longitude,
        }
      }
      this.map.addMarker(marker);
    })

    this.map.setOnInfoWindowClickListener(info => {
      console.log('InfoWindowClickListener -> ', info);
    });
  
    this.map.setOnMarkerClickListener (marker => {
      console.log('MarkerClickListener -> ', marker);
      const exist = places.find(place => place.id == marker.markerId); 
      if(exist){
        this.showDetailMarker(exist)
      }
    });
  }

  setMyLocation(){
      
    this.map.setOnMapClickListener(async (res) => {
      console.log('MapClickListener -> ', res);
      this.setMarkerMyPosition(res.latitude, res.longitude)
    })

    this.map.setOnMarkerDragEndListener(marker => {
      console.log('MarkerDragEndListener -> ', marker);
      this.myLocation.marker.coordinate = {
        lat: marker.latitude,
        lng: marker.longitude
      }
      //this.showDetailMarker(this.myLocation);
      this.centerMarkerWithBounds(this.myLocation.marker);
    })
  }

  async showDetailMarker(place: Place){
    const modal = await this.modalController.create({
      component: PlaceDetailComponent,
      componentProps: {place},
      initialBreakpoint: 0.25,
      breakpoints: [0, 0.25]
    })
    await modal.present();
  }

  async setMarkerMyPosition(latitude: number, longitude: number){
    if(this.myLocation){
      this.map.removeMarker(this.myLocation.id)
    }
    this.myLocation = {
      name: 'Destino',
      description: 'Viajar aqui',
      marker: {
        title: 'Destino',
        snippet: 'Viajar aqui',
        draggable: true,
        coordinate: {
          lat: latitude,
          lng: longitude,
        }
      }
    }
    const id = await this.map.addMarker(this.myLocation.marker);
    this.myLocation.id = id;
    //this.centerMarker(this.myLocation.marker);
    this.centerMarkerWithBounds(this.myLocation.marker);
  }

  centerMarkerWithBounds(marker: Marker){
    console.log('centerMarkerWithBounds');
    const des: number = 0.001;
    const northeast = {
      lat: marker.coordinate.lat + des,
      lng: marker.coordinate.lng + des
    }
    const southwest ={
      lat: marker.coordinate.lat - des,
      lng: marker.coordinate.lng - des
    }
    let bounds = new LatLngBounds({
      southwest: southwest,
      center: marker.coordinate,
      northeast: northeast,
    })
    this.map.fitBounds(bounds, 100)
  }

  centerMarker(marker: Marker){
    console.log('centerMarker');
    this.map.setCamera({
      coordinate: marker.coordinate,
      zoom: 16,
    })
  }


  ngOnInit() {}

}

const places: Place[] = [
  {
    name: 'Lugar A',
    description: 'Lorem, ipsum dolor sit amet consecteur',
    marker: {
      title: 'Lugar A',
      snippet: 'Lorem, ipsum dolor sit amet consecteur',
      iconUrl: 'assets/icon/pin-auto.png',
      iconSize: {
        width: 50,
        height: 50
      },
      coordinate: {
        lat: -33.411826793128085,
        lng: -70.71844969032637
      }
    },
  },
];

interface Place{
  id?: string;
  name: string;
  description: string;
  marker: Marker;
}
