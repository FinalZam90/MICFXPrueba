import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FgrManClienComponent } from './fgr-man-clien.component';

describe('FgrManClienComponent', () => {
  let component: FgrManClienComponent;
  let fixture: ComponentFixture<FgrManClienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FgrManClienComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FgrManClienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
