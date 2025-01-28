import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApparelDetailComponent } from './apparel-detail.component';

describe('ApparelDetailComponent', () => {
  let component: ApparelDetailComponent;
  let fixture: ComponentFixture<ApparelDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApparelDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApparelDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
