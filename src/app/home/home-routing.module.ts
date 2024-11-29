import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { MapDireccionComponent } from './Components/map-direccion/map-direccion.component';
import { DireccionComponent } from './Components/direccion/direccion.component';
const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'map-direccion',
    loadComponent: () => import('./Components/map-direccion/map-direccion.component').then((m) => m.MapDireccionComponent)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
