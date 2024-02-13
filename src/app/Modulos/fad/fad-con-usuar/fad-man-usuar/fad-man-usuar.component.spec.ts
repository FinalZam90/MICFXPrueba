import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FadManUsuarComponent } from './fad-man-usuar.component';

describe('FadManUsuarComponent', () => {
  let component: FadManUsuarComponent;
  let fixture: ComponentFixture<FadManUsuarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FadManUsuarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FadManUsuarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
