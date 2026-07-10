import { Component, inject, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { WikiHomeUrlPipe } from './wiki-home-url-pipe';

interface Wiki {
  name: string;
  subdomain: string;
  description: string;
}

@Component({
  selector: 'app-wikis',
  imports: [MatCardModule, MatButton, RouterLink, WikiHomeUrlPipe],
  templateUrl: './wikis.html',
  styleUrl: './wikis.css',
})
export class Wikis {
  protected route = inject(ActivatedRoute)
  protected router = inject(Router)
  wikis: WritableSignal<Wiki[]> = signal([])
  ngOnInit() {
    this.route.data.subscribe((response: any) => {
      if (response.wikis) {
        this.wikis.set(response.wikis)
      } else {
        this.router.navigate(['/'])
      }
    })
  }
  
}
