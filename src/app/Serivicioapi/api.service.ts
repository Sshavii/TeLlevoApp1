import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiURL = 'http://localhost:3000'

  constructor(private http:HttpClient) { }

  getPosts(id: any) {
    return this.http.get('${this.apiURL}/posts/${id}');
  }

  obtenerUsuario(): Observable<any>{
    return this.http.get(this.apiURL+'/posts/+id').pipe(
      retry(3)
    );
  }

  crearUsuario(){

  }

  modificarUsuario(){

  }

  eliminarUsuario(){

  }
}
