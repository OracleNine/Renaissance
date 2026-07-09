import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-wikis',
  imports: [MatCardModule, MatButton],
  templateUrl: './wikis.html',
  styleUrl: './wikis.css',
})
export class Wikis {
  protected route = inject(ActivatedRoute)
  protected router = inject(Router)
  wikis = signal([])
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
