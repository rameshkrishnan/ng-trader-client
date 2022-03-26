import { Injectable, InjectionToken, Inject } from '@angular/core';

import { User } from '../model/user.model';

export const BROWSER_STORAGE = new InjectionToken<Storage>('Browser Storage', {
  providedIn: 'root',
  factory: () => sessionStorage
});

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(@Inject(BROWSER_STORAGE) public storage: Storage) { }

  set(user: User) {
    this.storage.setItem('trader', JSON.stringify(user));
  }

  get() {
    const userStr = this.storage.getItem('trader');
    if(userStr != null) {
      return JSON.parse(userStr) as User;
    }
    return null!;
  }

  isLoggedIn() {
    if (this.get() != null) { return true; }
    else { return false; }
  }

  logout() {
    this.storage.removeItem('trader');
  }
}
