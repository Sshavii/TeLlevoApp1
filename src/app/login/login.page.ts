import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticatorService } from '../Servicios/authenticator.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  loginForm: FormGroup;
  usuario: any={
    email: ""
  }

  constructor(private formBuilder: FormBuilder, private router: Router, private storage: Storage) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@duocuc\.cl$/)]], 
      password: ['', [Validators.required, Validators.minLength(8), this.passwordValidator]],
    });
  }
  async ngOnInit() {
    await this.storage.create();
    this.storage.set("emailUsuario", "ari.valverde@duocuc.cl")
  }

  passwordValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.value;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (!hasUpperCase || !hasSpecialChar) {
      return { invalidPassword: true };
    }
    return null; 
  }

   onSubmit() {
    if (this.loginForm.valid) {
      console.log('Formulario válido', this.loginForm.value);
      const email = this.loginForm.value.email;
      this.router.navigate(['/home'], { queryParams: { email: email } });
    } else {
      console.log('Formulario inválido');
    }
  }
}
