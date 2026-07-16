import { Component, inject, signal } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

export function forbiddenUsernameValidator(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const forbidden = nameRe.test(control.value)
    const length = control.value.length > 25
    return forbidden || length ? {forbiddenUsername: {value: control.value}} : null
  };
}
@Component({
  selector: 'app-register',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, FormsModule, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  errorMsg = signal("")
  private http = inject(HttpClient)
  private router = inject(Router)

  registerForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required, forbiddenUsernameValidator(/[^a-zA-Z0-9]+/)]),
    name: new FormControl('', [Validators.required])
  })

  onSubmit() {
    const formValues = this.registerForm.value
    if (formValues["email"] && formValues["password"] && formValues["username"]) {
      const requestBody = {
            "email": formValues["email"],
            "password": formValues["password"],
            "username": formValues["username"],
            "name": formValues["name"],
        }
        this.http.post('/api/core/register', requestBody, {
            headers: {
                'Content-Type': 'application/json',
            },
        }).subscribe({
            next: (payload) => {
                this.router.navigate(['/login'])
            },
            error: (err) => {
                this.errorMsg.set(err.error.detail)
            },
        })
    }
  }
}
