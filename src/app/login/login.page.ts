import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  password: string = '';

  constructor() {}

  onSubmit() {
    // Maneja el envío del formulario
    console.log('Email:', this.email);
    console.log('Password:', this.password);
  }
}
