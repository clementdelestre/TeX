import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvshowInformationComponent } from './tvshow-information.component';

describe('TvshowInformationComponent', () => {
  let component: TvshowInformationComponent;
  let fixture: ComponentFixture<TvshowInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TvshowInformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TvshowInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
