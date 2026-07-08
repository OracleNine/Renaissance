import { Component, DestroyRef, inject, signal } from '@angular/core'
import { RouterLink, RouterOutlet, ResolveFn, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router"
import {MatIconModule} from '@angular/material/icon'
import {MatTooltipModule} from '@angular/material/tooltip'
import {MatExpansionModule} from '@angular/material/expansion'
import {MatListModule} from '@angular/material/list'
import { HttpClient } from '@angular/common/http'

type Wiki = {
  subdomain: string;
  name: string;
  description: string;
}

@Component({
  selector: 'app-side-navigation',
  imports: [RouterOutlet, RouterLink, MatIconModule, MatTooltipModule, MatExpansionModule, MatListModule],
  templateUrl: './side-navigation.html',
  styleUrl: './side-navigation.css',
})
export class SideNavigation {
  
}
