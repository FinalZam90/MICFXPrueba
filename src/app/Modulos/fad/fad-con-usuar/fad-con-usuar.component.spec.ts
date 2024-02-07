import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FadConUsuarComponent } from './fad-con-usuar.component';

describe('FadConUsuarComponent', () => {
  let component: FadConUsuarComponent;
  let fixture: ComponentFixture<FadConUsuarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FadConUsuarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FadConUsuarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
