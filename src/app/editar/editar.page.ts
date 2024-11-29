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
  registerForm: FormGroup;
  
  constructor(private firestoreService : FirestoreService,
    private formBuilder: FormBuilder
  ) {     this.registerForm = this.formBuilder.group({
    username: ['', [Validators.required]],
    age: ['', [Validators.required]], });
    this.loadusers();
    this.initUser();
  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.registerForm.valid) {
      console.log('Formulario de registro válido', this.registerForm.value);
      // Lógica para el registro (por ejemplo, enviar datos al servidor)
    } else {
      console.log('Formulario de registro inválido');
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

  async save(){
    this.cargando = true;
    await this.firestoreService.createDocumentID(this.newUser, "Usuarios", this.newUser.id)
    this.cargando = false;
  }

}
