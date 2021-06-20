import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediacardComponent } from './mediacard.component';

describe('VideocardComponent', () => {
  let component: MediacardComponent;
  let fixture: ComponentFixture<MediacardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MediacardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MediacardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
