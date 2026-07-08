import { Component, inject, signal } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

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
  errorMsg = signal("")
  private http = inject(HttpClient)
  private router = inject(Router)

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
        this.http.post('http://localhost:8000/api/core/token/', requestBody, {
            headers: {
                'Content-Type': 'application/json',
            }
        }).subscribe({
            next: (payload) => {
                this.router.navigate(['/dashboard'])
            },
            error: (err) => {
                this.errorMsg.set(err.error.detail)
            },
            complete: () => {
              this.router.navigate(['/dashboard'])
            }
        })
    }
  }
  

}
