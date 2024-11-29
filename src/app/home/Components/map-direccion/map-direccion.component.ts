import { Component, OnInit } from '@angular/core';
import { IonicModule, MenuController } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';
import { environment } from 'src/environments/environment';

const apiKey = environment.firebaseConfig.apiKey;
@Component({
  selector: 'app-map-direccion',
  templateUrl: './map-direccion.component.html',
  styleUrls: ['./map-direccion.component.scss'],
  standalone : true,
  imports: [IonicModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MapDireccionComponent  implements OnInit {
  map: GoogleMap;

  constructor(private menuController: MenuController) { }

  ionViewDidEnter(){
   this.menuController.enable(false, 'main')
   this.initMap
  }

  ionViewDidLeave(){
   this.menuController.enable(true, 'main')
  }

  async initMap(){
    this.map = await GoogleMap.create({
      id: 'my-map',
      element: document.getElementById('map'),
      apiKey: apiKey,
      config:{
        center: {
          lat: 33.6,
          lng: -117.9,
        },
        zoom: 8,
      },
    });
  };

  ngOnInit() {}

}
