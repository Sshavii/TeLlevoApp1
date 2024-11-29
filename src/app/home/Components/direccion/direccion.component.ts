import { Component, NgModule, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
@Component({
  selector: 'app-direccion',
  templateUrl: './direccion.component.html',
  styleUrls: ['./direccion.component.scss'],
  standalone: true,
  imports: [IonicModule, RouterModule]
})
export class DireccionComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}
  onNavigate() {
    console.log('Navegando a map-direccion');
  }
}
