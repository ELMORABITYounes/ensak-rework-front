import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot, RouterStateSnapshot
} from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({
    providedIn: 'root'
  }
)
export class UserRouteAccessService implements CanActivate {
  constructor(public auth: AuthenticationService,
              public router: Router,
              ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Promise<boolean> {
    const authorities = route.data['authorities'];
    // We need to call the checkLogin / and so the accountService.identity() function, to ensure,
    // that the client has a principal too, if they already logged in by the server.
    // This could happen on a page refresh.
    return this.checkLogin(authorities, state.url);
  }

  checkLogin(authorities: string[], url: string): boolean {
      if (!authorities || authorities.length === 0) {
        return true;
      }
      if (!this.auth.isAuthenticated()){
        this.router.navigate(['login']);
        return false;
      }
    if (!this.auth.hasAnyAuthority(authorities))
      {
        this.router.navigate(['accessdenied']);
        return false;
      }
      return true;
  }
}
