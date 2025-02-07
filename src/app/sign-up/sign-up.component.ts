import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/users.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  imports: [FormsModule]
})
export class SignUpComponent {
  username: string = '';
  password: string = '';
  email:string = '';

  constructor(private router: Router, private usersService : UserService) {}

  close() {
    this.router.navigateByUrl('');
  }

  switchToSignIn() {
    this.router.navigate(['/SignIn']);
  }

  onSubmit() {
    this.usersService.postRegisterUser(this.username, this.email, this.password)
      .subscribe(
        (response: any) => {
          console.log('Registrazione avvenuta con successo:', response);
          this.router.navigateByUrl('/SignIn');
        },
        (error: any) => {
          console.error('Errore durante la registrazione:', error);
          const errorMessage = error.error || 'Errore durante la registrazione';
          alert(errorMessage);
        }
      );
  }
}