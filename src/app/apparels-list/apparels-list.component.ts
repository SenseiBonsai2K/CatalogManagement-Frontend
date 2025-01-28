import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ApparelComponent } from '../apparel/apparel.component';
import { Apparel } from '../apparel';
import { ApparelsService } from '../apparels.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-apparels-list',
  imports: [CommonModule, ApparelComponent],
  templateUrl: './apparels-list.component.html',
  styleUrl: './apparels-list.component.scss'
})
export class ApparelsListComponent {
  apparels: Apparel[] = [];
  categoryName: string | null = null;
  searchQuery: string | null = null;

  constructor(private ApparelsService: ApparelsService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Verifica quale parametro è stato passato
    this.route.paramMap.subscribe(params => {
      this.categoryName = params.get('name'); // per la rotta delle categorie
      this.searchQuery = params.get('searched'); // per la rotta di ricerca

      if (this.categoryName) {
        // Se abbiamo una categoria, carichiamo gli apparels per quella categoria
        this.loadApparelsByCategory(this.categoryName);
      } else if (this.searchQuery) {
        // Se abbiamo una query di ricerca, carichiamo gli apparels in base alla query
        this.loadApparelsByName(this.searchQuery);
      } else {
        // Se non c'è né categoria né ricerca, carichiamo tutti gli apparels
        this.loadApparels();
      }
    });
  }

  loadApparels(): void {
    this.ApparelsService.getApparels().subscribe(
      (data: Apparel[]) => {
        this.apparels = data;
      },
      error => console.error('There was an error!', error)
    );
  }

  loadApparelsByCategory(categoryName: string): void {
    this.ApparelsService.getApparelsByCategoryName(categoryName).subscribe(
      (data: Apparel[]) => {
        this.apparels = data;
      },
      error => console.error('There was an error!', error)
    );
  }

  loadApparelsByName(searchQuery: string): void {
    this.ApparelsService.getApparelsByName(searchQuery).subscribe(
      (data: Apparel[]) => {
        this.apparels = data;
      },
      error => console.error('There was an error!', error)
    );
  }
}
