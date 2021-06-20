import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RowMediaComponent } from './row-media.component';

describe('RowMediaComponent', () => {
  let component: RowMediaComponent;
  let fixture: ComponentFixture<RowMediaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RowMediaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RowMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
