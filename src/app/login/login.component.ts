import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { UserService } from '../service/user.service';
import { AuthService } from '../service/auth.service';
import { User } from '../model/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  users: Array<User> = [];
  selectedUser!: User;

  constructor(private userService: UserService, private authService: AuthService,
              private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.fetchUsers();
  }

  onSubmit(): void {
    this.authService.set(this.selectedUser);
    this.router.navigate(['/']);
    this.toastr.success('You have been successfully loggedin.');
  }

  private fetchUsers(): void {
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
    });
  }

  ngOnDestroy() {}
}
