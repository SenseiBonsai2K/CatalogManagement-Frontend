import { CommonModule } from '@angular/common';
import { Component, AfterViewInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Category } from './category';
import { CategoriesService } from './categories.service';

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

  constructor(private CategoriesService: CategoriesService, private router: Router) {}

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

  ngOnInit(): void {
      this.CategoriesService.getCategories().subscribe(
        (data: Category[]) => {
          console.log(data);
          this.categories = data;
        },
        error => console.error('There was an error!', error)
      );
    }

  // Metodo per la ricerca tramite il tasto Invio
  onSearchKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      const query = (<HTMLInputElement>event.target).value;
      if (query.trim()) {
        this.search(query);
      } else {
        console.log('La query di ricerca è vuota!');
      }
    }
  }

  // Metodo per la ricerca tramite il bottone
  search(query: string): void {
    if (query.trim()) { // Controlla se la query non è vuota o solo spazi
      this.router.navigate(['/Apparels/Search', query]);
    } else {
      console.log('La query di ricerca è vuota!');
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
}
