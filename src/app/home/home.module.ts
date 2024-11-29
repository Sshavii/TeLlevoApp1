import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { DireccionComponent } from './Components/direccion/direccion.component';
import { MapDireccionComponent } from './Components/map-direccion/map-direccion.component';
import { RouterModule } from '@angular/router';
  


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    RouterModule,
    DireccionComponent,
    MapDireccionComponent
  ],
  declarations: [HomePage]
  
})
export class HomePageModule {}
