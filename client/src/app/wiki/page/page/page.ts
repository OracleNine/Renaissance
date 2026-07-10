import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-page',
  imports: [],
  templateUrl: './page.html',
  styleUrl: './page.css',
})
export class Page {
  protected route = inject(ActivatedRoute)
  name = signal('')
  content = signal('')
  ngOnInit() {
    this.route.data.subscribe((response: any) => {
      if (response.page) {
        this.name.set(response.page.name)
        this.content.set(response.page.content)
      }
    })
  }
}
