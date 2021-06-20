import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicsViewComponent } from './musics-view.component';

describe('MusicsViewComponent', () => {
  let component: MusicsViewComponent;
  let fixture: ComponentFixture<MusicsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MusicsViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MusicsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
