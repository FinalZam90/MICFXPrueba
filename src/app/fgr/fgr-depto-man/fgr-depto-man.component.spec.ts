import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FgrDeptoManComponent } from './fgr-depto-man.component';

describe('FgrDeptoManComponent', () => {
  let component: FgrDeptoManComponent;
  let fixture: ComponentFixture<FgrDeptoManComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FgrDeptoManComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FgrDeptoManComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
