import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../services/users.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(): boolean {
    if (this.userService.isAuthenticated()) {
      return true;
    } else {
      this.router.navigate(['/SignIn']);
      return false;
    }
  }
}