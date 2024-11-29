import { Component, OnInit } from '@angular/core';
import { UserI } from '../common/models/services/user.models';
import { FirestoreService } from '../common/services/firestore.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-editar',
  templateUrl: './editar.page.html',
  styleUrls: ['./editar.page.scss'],
}) 
export class EditarPage implements OnInit {
  newUser: UserI;
  cargando: boolean = false;
  users: UserI[] = [];
  editForm: FormGroup;
  
  
  constructor(private firestoreService : FirestoreService
  ) {     
    this.loadusers();
    this.initUser();
  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.editForm.valid) {
      console.log('Formulario de edicion válido', this.editForm.value);
      // Lógica para el registro (por ejemplo, enviar datos al servidor)
    } else {
      console.log('Formulario de edicion inválido');
    }
  }

  loadusers() {
    this.firestoreService.getCollectionChanges <UserI>('Usuarios').subscribe( data =>{
      if(data) {
        this.users = data
      }
    }) 
  }

  initUser(){
    this.newUser = {
      nombre: null,
      edad: null,
      id: this.firestoreService.createIdDoc(),
    }
  }


  
  edit(user: UserI){
    console.log('edit -> ', user)
    this.newUser = user;
  }

}
