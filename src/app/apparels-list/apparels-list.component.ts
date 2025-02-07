import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ApparelComponent } from '../apparel/apparel.component';
import { Apparel } from '../apparel';
import { ApparelsService } from '../services/apparels.service';
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
    this.route.paramMap.subscribe(params => {
      this.categoryName = params.get('name');
      this.searchQuery = params.get('searched');

      if (this.categoryName) {
        this.loadApparelsByCategory(this.categoryName);
      } else if (this.searchQuery) {
        this.loadApparelsByName(this.searchQuery);
      } else {
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
