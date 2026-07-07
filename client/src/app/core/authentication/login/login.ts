import { Component, inject, signal } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { AuthStatus } from '../auth-status';

type LoginForm = {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  auth = inject(AuthStatus)

  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl(''),
  })

  onSubmit() {
    const formValues = this.loginForm.value
    if (formValues["email"] && formValues["password"]) {
      this.auth.login(formValues["email"], formValues["password"])
    }
  }
  

}
