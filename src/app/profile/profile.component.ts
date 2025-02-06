import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/users.service';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-profile',
  imports: [FormsModule, CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  user: any = null;
  username: string = '';
  email: string = '';
  password: string = '';
  id: number = 0;
  isEditable: boolean = false;

  constructor(private router: Router, private userService: UserService, private tokenService: TokenService) { }

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
    const token = this.tokenService.getToken();
    if (token && !this.tokenService.isTokenExpired()) {
      const payload = token.split('.')[1];
      const decodedPayload = JSON.parse(atob(payload));
      this.user = decodedPayload;
      this.username = this.user.Username;
      this.email = this.user.Email;
      this.id = this.user.Id;
      console.log('User profile loaded:', this.user);
    } else {
      console.error('No token found');
    }
  }

  onSubmit() {
    this.userService.PutUpdateUser(this.id, this.username, this.email, this.password).subscribe(
      response => {
        console.log('Profile updated successfully:', response);
        alert('Profile updated successfully');
      },
      error => {
        console.error('Error updating profile:', error);
        alert('Error updating profile: ' + (error.error?.message || 'Unknown error'));
      }
    );
  }

  close() {
    this.router.navigateByUrl('');
  }

  toggleEdit() {
    this.isEditable = !this.isEditable;
    if (!this.isEditable) {
      this.onSubmit();
    }
  }
}
