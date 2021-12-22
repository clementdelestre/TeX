import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvshowEditComponent } from './tvshow-edit.component';

describe('TvshowEditComponent', () => {
  let component: TvshowEditComponent;
  let fixture: ComponentFixture<TvshowEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TvshowEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TvshowEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
