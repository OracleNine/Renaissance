import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

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
}
