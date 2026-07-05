import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from "@angular/router";
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';

@Component({
  selector: 'app-side-navigation',
  imports: [RouterOutlet, RouterLink, MatIconModule, MatTooltipModule],
  templateUrl: './side-navigation.html',
  styleUrl: './side-navigation.css',
})
export class SideNavigation {


}
