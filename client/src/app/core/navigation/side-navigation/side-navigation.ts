import { Component, DestroyRef, inject, signal } from '@angular/core'
import { RouterLink, RouterOutlet, ResolveFn, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from "@angular/router"
import {MatIconModule} from '@angular/material/icon'
import {MatTooltipModule} from '@angular/material/tooltip'
import {MatExpansionModule} from '@angular/material/expansion'
import {MatListModule} from '@angular/material/list'
import { AuthService } from '../../authentication/auth-service'
import {toSignal} from '@angular/core/rxjs-interop';

export const authResolver: ResolveFn<Object> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const authService = inject(AuthService);
  return authService.viewProfile()
  
};

@Component({
  selector: 'app-side-navigation',
  imports: [RouterOutlet, RouterLink, MatIconModule, MatTooltipModule, MatExpansionModule, MatListModule],
  templateUrl: './side-navigation.html',
  styleUrl: './side-navigation.css',
})
export class SideNavigation {

  private route = inject(ActivatedRoute)
  private userData = toSignal(this.route.data)
  
}
