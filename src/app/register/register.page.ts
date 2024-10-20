import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
    }, { validator: this.passwordMatchValidator });
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
}
