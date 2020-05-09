import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { UserSessionService } from './user-session.service';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userSessionService: UserSessionService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const currentUser: User = this.userSessionService.get();
    if (state.url === '/login' && currentUser != null) {
      this.userSessionService.logout();
    }
    if (currentUser === null) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
