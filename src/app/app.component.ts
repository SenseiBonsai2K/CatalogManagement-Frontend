import { CommonModule } from '@angular/common';
import { Component, AfterViewInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Category } from './category';
import { CategoriesService } from './services/categories.service';
import { UserService } from './services/users.service';
import { Token } from '@angular/compiler';
import { TokenService } from './services/token.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit {
  title = 'Catalog';
  categories: Category[] = [];
  isPopupVisible = false;
  user : any = null;
  isAuthenticated = false;

  constructor(private CategoriesService: CategoriesService, private router: Router, private usersService : UserService, private tokenService: TokenService) {}

  ngOnInit(): void {
      this.loadCategories();
      this.checkAuthentication();
    }

  ngAfterViewInit(): void {
    const bar = Array.from(document.querySelectorAll("li"));

    bar.forEach(function(it) {
      it.onclick = function() {
        bar.forEach(function(el) {
          el.classList.remove("active");
        });
        (this as HTMLElement).classList.toggle("active");
      };
    });
  }

  // Metodo per la ricerca tramite il tasto Invio
  onSearchKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      const query = (<HTMLInputElement>event.target).value;
      this.search(query);
    }
  }

  // Metodo per la ricerca tramite il bottone
  search(query: string): void {
    if (query.trim()) { // Controlla se la query non è vuota o solo spazi
      this.router.navigate(['/Apparels/Search', query]);
    } else {
      this.router.navigate(['/Apparels']);
    }
  }

  // Funzione per aprire il popup
  openPopup() {
    this.isPopupVisible = true;
  }

  // Funzione per chiudere il popup
  closePopup() {
    this.isPopupVisible = false;
  }

  checkAuthentication(): void {
    this.isAuthenticated = this.usersService.isLoggedIn();
    if (this.isAuthenticated) {
      const token = this.tokenService.getToken();
      if (token) {
        this.user = this.tokenService.decodeToken(token);
        console.log('User:', this.user);
      }
    }
  }

  logout(): void {
    this.usersService.logout();
    this.user = null;
    this.isAuthenticated = false;
    this.router.navigateByUrl('').then(() => {
      window.location.reload();
    });
  }

  loadCategories(): void {
    this.CategoriesService.getCategories().subscribe(
      (data: Category[]) => {
        this.categories = data;
      },
      error => console.error('There was an error!', error)
    );
  }
}
