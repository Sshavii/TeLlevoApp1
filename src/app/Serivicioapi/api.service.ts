import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }
  listado: any = [];
  item : any;
  private urlAPi = 'http://localhost:3000'


  

  crearUsuario(){

  }

  modificarUsuario(){

  }

  eliminarUsuario(){

  }
}
