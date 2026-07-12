import { Component, inject, signal } from '@angular/core';
import { Wysiwyg } from './wysiwyg/wysiwyg';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit',
  imports: [Wysiwyg],
  templateUrl: './edit.html',
  styleUrl: './edit.css',
})
export class Edit {
  protected route = inject(ActivatedRoute)
  name = signal('')
  content = signal('')
  tags = signal([])
  ngOnInit() {
    this.route.data.subscribe((response: any) => {
      if (response.page) {
        this.name.set(response.page.name)
        this.content.set(response.page.content)
        this.tags.set(response.page.tags)
      }
    })
  }
}
