import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FgrDeptoComponent } from './fgr-depto.component';

describe('FgrDeptoComponent', () => {
  let component: FgrDeptoComponent;
  let fixture: ComponentFixture<FgrDeptoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FgrDeptoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FgrDeptoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
