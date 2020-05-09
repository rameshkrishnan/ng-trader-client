import { Injectable, InjectionToken, Inject } from '@angular/core';

import { User } from '../model/user.model';

export const BROWSER_STORAGE = new InjectionToken<Storage>('Browser Storage', {
  providedIn: 'root',
  factory: () => sessionStorage
});

@Injectable({
  providedIn: 'root'
})
export class UserSessionService {

  constructor(@Inject(BROWSER_STORAGE) public storage: Storage) { }

  set(user: User) {
    this.storage.setItem('trader', JSON.stringify(user));
  }

  get() {
    return JSON.parse(this.storage.getItem('trader'));
  }

  logout() {
    this.set(null);
  }
}
