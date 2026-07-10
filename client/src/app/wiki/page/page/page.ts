import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WikiSideNav } from '../../navigation/wiki-side-nav/wiki-side-nav';
import { WikiTopNav } from '../../navigation/wiki-top-nav/wiki-top-nav';

@Component({
  selector: 'app-page',
  imports: [WikiSideNav, WikiTopNav],
  templateUrl: './page.html',
  styleUrl: './page.css',
})
export class Page {
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
