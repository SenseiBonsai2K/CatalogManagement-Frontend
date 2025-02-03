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
  password: string = '';  // Nuova variabile per la password
  isEditable: boolean = false;  // Variabile per gestire la modalità di modifica

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
      console.log('User profile loaded:', this.user);
    } else {
      console.error('No token found');
    }
  }

  onSubmit() {
    debugger;
    // Implementa la logica per salvare le modifiche al profilo dell'utente
    console.log('Saving changes:', this.username, this.email, this.password);
    // Chiama il metodo del servizio UsersService per aggiornare il profilo dell'utente
    this.userService.PutUpdateUser(this.username, this.email, this.password).subscribe(
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
    this.router.navigateByUrl('');  // Torna alla home page
  }

  // Funzione per abilitare/disabilitare la modifica dei campi
  toggleEdit() {
    this.isEditable = !this.isEditable;
    if (!this.isEditable) {
      this.onSubmit();
    }
  }
}
