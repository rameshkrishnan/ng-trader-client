import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

import { UserSessionService } from './service/user-session.service';
import { User } from './model/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Trader Client';
  user: User;

  constructor(private userSessionService: UserSessionService, private router: Router) {}

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      if (event.url !== '/login') {
        this.user = this.userSessionService.get();
      } else {
        this.user = null;
      }
    });
  }

  logout() {
    this.userSessionService.set(null);
    this.router.navigate(['/login']);
  }

}
