import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/users.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  imports: [FormsModule]
})
export class SignInComponent {
  email: string = '';
  password: string = '';

  constructor(private router: Router, private usersService : UserService) {}

  // Chiudi il popup
  close() {
    this.router.navigateByUrl('');  // Torna alla home page
  }

  // Cambia la modalità da Sign In a Sign Up
  switchToSignUp() {
    this.router.navigate(['/SignUp']);  // Naviga alla pagina SignUp
  }

  onSubmit() {
    this.usersService.postLoginUser(this.email, this.password)
      .subscribe({
        next: response => {
          localStorage.setItem('token', response.token);
          console.log('Login successful:', localStorage.getItem('token'));
          this.router.navigateByUrl('');
        },
        error: error => {
          console.error('Error logging in:', error);
          alert('Error logging in: ' + (error.error?.message || 'Unknown error'));
      }
      });
  }
}