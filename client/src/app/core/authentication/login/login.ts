import { Component, signal } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {merge} from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  hide = signal(true)
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide())
    event.stopPropagation()
  }

  readonly email = new FormControl('', [Validators.required, Validators.email]);
  errorMessage = signal('');
  constructor() {
    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }

  updateErrorMessage() {
    if (this.email.hasError('required')) {
      this.errorMessage.set('You must enter a value');
    } else if (this.email.hasError('email')) {
      this.errorMessage.set('Not a valid email');
    } else {
      this.errorMessage.set('');
    }
  }
}
