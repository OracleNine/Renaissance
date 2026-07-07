import { Component, inject, signal } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { AuthStatus, refreshPayload } from '../auth-status';
import { HttpClient } from '@angular/common/http';

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
  errorMsg = signal("")
  private http = inject(HttpClient)

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
      const requestBody = {
            "email": formValues["email"],
            "password": formValues["password"],
        }
        this.http.post<refreshPayload>('http://localhost:8000/api/core/token/', requestBody, {
            headers: {
                'Content-Type': 'application/json',
            }
        }).subscribe({
            next: (payload) => {
                if (payload["access"] && payload["refresh"]) {
                    localStorage.setItem("access", payload["access"])
                    localStorage.setItem("refresh", payload["refresh"])
                    console.log("Logged in successfully")
                    this.auth.isAuthenticated.set(true)
                } else {
                    console.log("Authentication failed")
                }
            },
            error: (err) => {
                this.errorMsg.set(err.error.detail)
            }
        })
    }
  }
  

}
