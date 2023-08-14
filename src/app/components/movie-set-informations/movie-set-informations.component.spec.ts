import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaInformationsComponent } from './media-informations.component';

describe('MediaInformationsComponent', () => {
  let component: MediaInformationsComponent;
  let fixture: ComponentFixture<MediaInformationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MediaInformationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaInformationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
