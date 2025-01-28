import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApparelsListComponent } from './apparels-list.component';

describe('ApparelsListComponent', () => {
  let component: ApparelsListComponent;
  let fixture: ComponentFixture<ApparelsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApparelsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApparelsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
