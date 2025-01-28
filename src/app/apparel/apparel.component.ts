import { Component, Input } from '@angular/core';
import { Apparel } from '../apparel';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-apparel',
  imports: [CommonModule, RouterLink],
  templateUrl: './apparel.component.html',
  styleUrl: './apparel.component.scss'
})
export class ApparelComponent {
  @Input()
  public apparel!: Apparel;

  public onClick(apparel: Apparel){
    console.log(apparel.name + `clicked`);
  }
}
