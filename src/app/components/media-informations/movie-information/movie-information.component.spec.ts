import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieInformationComponent } from './movie-information.component';

describe('MovieInformationComponent', () => {
  let component: MovieInformationComponent;
  let fixture: ComponentFixture<MovieInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieInformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
