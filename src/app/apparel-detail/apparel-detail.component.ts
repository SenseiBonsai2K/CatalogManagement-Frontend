import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApparelsService } from '../apparels.service';
import { Apparel } from '../apparel';

@Component({
  selector: 'app-apparel-detail',
  templateUrl: './apparel-detail.component.html',
  styleUrls: ['./apparel-detail.component.scss']
})
export class ApparelDetailComponent implements OnInit {
  apparel!: Apparel;

  constructor(private route: ActivatedRoute, private apparelsService: ApparelsService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.apparelsService.getApparelById(+id).subscribe(
        (data: Apparel) => this.apparel = data,
        error => console.error('There was an error!', error)
      );
    }
  }
}