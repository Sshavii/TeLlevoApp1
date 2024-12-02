import { Component, Input, OnInit } from '@angular/core';
import { Marker } from '@capacitor/google-maps';
import { IonicModule, ModalController } from '@ionic/angular';
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonIcon, IonButton, } from "@ionic/angular/standalone";

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.component.html',
  styleUrls: ['./place-detail.component.scss'],
  standalone: true,
  imports: [IonicModule]
})
export class PlaceDetailComponent  implements OnInit {
  @Input() place : Place;

  constructor(private modalController: ModalController) { }

  ngOnInit() {}

  dismiss(){
    this.modalController.dismiss();
  }

}

interface Place{
  id?: string;
  name: string;
  description: string;
  marker: Marker;
}
