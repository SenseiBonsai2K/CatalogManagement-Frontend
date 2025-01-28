import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  imports: [FormsModule]
})
export class SignInComponent {
  email: string = '';
  password: string = '';

  constructor(private router: Router, private usersService : UsersService) {}

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
      .subscribe(
        (response: any) => {
          console.log('Autenticazione avvenuta con successo:', response);
          this.router.navigateByUrl('');  // Torna alla home page
        },
        (error: any) => {
          console.error('Errore durante autenticazione:', error);
        }
      );
  }
}
