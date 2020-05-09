import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../service/user.service';
import { UserSessionService } from '../service/user-session.service';
import { User } from '../model/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  users: Array<User> = [];
  selectedUser: User;

  constructor(private userService: UserService, private userSessionService: UserSessionService,
              private router: Router) { }

  ngOnInit(): void {
    this.fetchUsers();
  }

  onSubmit(): void {
    this.userSessionService.set(this.selectedUser);
    this.router.navigate(['/']);
  }

  private fetchUsers(): void {
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
    });
  }

  ngOnDestroy() {}
}
