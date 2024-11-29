import { FirestoreService } from './../common/services/firestore.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserI } from '../common/models/services/user.models';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  registerForm: FormGroup;

  newUser: UserI;
  cargando: boolean = false;

  constructor(private formBuilder: FormBuilder,
    private firestoreService : FirestoreService
  ) {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      age: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
    }, { validator: this.passwordMatchValidator });
    this.loadusers();
    this.initUser();
  }

  // Validador para asegurar que las contraseñas coinciden
  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value 
      ? null : { passwordMismatch: true };
  }

  onSubmit() {
    if (this.registerForm.valid) {
      console.log('Formulario de registro válido', this.registerForm.value);
      // Lógica para el registro (por ejemplo, enviar datos al servidor)
    } else {
      console.log('Formulario de registro inválido');
    }
  }

  ngOnInit() {
  }
    //Firebase, CRUD
    users: UserI[] = [];

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
