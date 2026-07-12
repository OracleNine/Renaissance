import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { WikiSideNav } from '../../navigation/wiki-side-nav/wiki-side-nav';
import { WikiTopNav } from '../../navigation/wiki-top-nav/wiki-top-nav';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-page',
  imports: [WikiSideNav, WikiTopNav, MatButtonModule, RouterLink],
  templateUrl: './page.html',
  styleUrl: './page.css',
})
export class Page {
  protected route = inject(ActivatedRoute)
  protected router = inject(Router)
  name = signal('')
  content = signal('')
  tags = signal([])
  url = this.router.url
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
