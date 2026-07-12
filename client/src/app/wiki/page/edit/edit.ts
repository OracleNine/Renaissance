import { Component } from '@angular/core';
import { Wysiwyg } from './wysiwyg/wysiwyg';

@Component({
  selector: 'app-edit',
  imports: [Wysiwyg],
  templateUrl: './edit.html',
  styleUrl: './edit.css',
})
export class Edit {}
