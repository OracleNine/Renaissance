import { Component, inject } from '@angular/core'
import { RouterLink, RouterOutlet, ActivatedRoute } from "@angular/router"
import {MatIconModule} from '@angular/material/icon'
import {MatTooltipModule} from '@angular/material/tooltip'
import {MatExpansionModule} from '@angular/material/expansion'
import {MatListModule} from '@angular/material/list'

@Component({
  selector: 'app-side-navigation',
  imports: [RouterOutlet, RouterLink, MatIconModule, MatTooltipModule, MatExpansionModule, MatListModule],
  templateUrl: './side-navigation.html',
  styleUrl: './side-navigation.css',
})
export class SideNavigation {
  protected route = inject(ActivatedRoute)

  ngOnInit() {
    this.route.data.subscribe((response: any) => {
      console.log(response)
    })
  }
}
