import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/users.service';
import { TokenService } from '../services/token.service';
import { addUserRequest } from '../user';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-profile',
  imports: [FormsModule, CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  actualUser: addUserRequest = { username: '', email: '', password: '' };
  user: any = null;
  username: string = '';
  email: string = '';
  password: string = '';
  id: number = 0;
  isEditable: boolean = false;

  constructor(
    private router: Router,
    private userService: UserService,
    private tokenService: TokenService,
    private appComponent: AppComponent
  ) {}

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
    const token = this.tokenService.getToken();
    if (token) {
      const decodedPayload = this.tokenService.decodeToken(token);
      this.user = decodedPayload;

      this.username = this.user.Username;
      this.email = this.user.Email;
      this.id = this.user.Id;

      console.log('User profile loaded:', this.user);
    }
  }

  onSubmit(): void {
    this.actualUser.username = this.username;
    this.actualUser.email = this.email;
    this.actualUser.password = this.password;

    this.userService.PutUpdateUser(this.id, this.actualUser).subscribe(
      response => {
        console.log('Profile updated successfully:', response);
        alert('Profile updated successfully');
        this.resetProfile();
        this.appComponent.logout();
        this.router.navigateByUrl('/SignIn');
      },
      error => {
        console.error('Error updating profile:', error);
        alert('Error updating profile: ' + (error.error?.message || 'Unknown error'));
      }
    );
  }

  resetProfile(): void {
    this.user = null;
    this.username = '';
    this.email = '';
    this.password = '';
    this.id = 0;
  }

  close(): void {
    this.router.navigateByUrl('');
  }

  toggleEdit(): void {
    this.isEditable = !this.isEditable;
    if (!this.isEditable) {
      this.onSubmit();
    }
  }
}