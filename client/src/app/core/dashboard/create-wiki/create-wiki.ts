import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-wiki',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './create-wiki.html',
  styleUrl: './create-wiki.css',
})
export class CreateWiki {
  createWikiForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    subdomain: new FormControl('', [Validators.required]),
    description: new FormControl(''),
  })

  private http = inject(HttpClient)
  private router = inject(Router)
  errorMsg = signal('')

  onSubmit() {
    const formValues = this.createWikiForm.value
    if (formValues["name"] && formValues["subdomain"]) {
      const requestBody = {
            "name": formValues["name"],
            "subdomain": formValues["subdomain"],
            "description": formValues["description"]
        }
        this.http.post('/api/core/create-wiki', requestBody, {
            headers: {
                'Content-Type': 'application/json',
            },
        }).subscribe({
            next: (payload) => {
                console.log("Success?")
                this.router.navigate(['/dashboard/wikis'])
            },
            error: (err) => {
                
                let fullError = ""
                if (err.error.name) {
                  fullError += err.error.name + "\n"
                }
                if (err.error.subdomain) {
                  fullError += err.error.subdomain + "\n"
                }
                if (err.error.description) {
                  fullError += err.error.description + "\n"
                }
                if (err.error.detail) {
                  fullError += err.error.detail + "\n"
                }
                this.errorMsg.set(fullError)
            },
        })
    }
  }
}
