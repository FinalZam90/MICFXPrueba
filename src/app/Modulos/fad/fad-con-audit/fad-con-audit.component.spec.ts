import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FadConAuditComponent } from './fad-con-audit.component';

describe('FadConAuditComponent', () => {
  let component: FadConAuditComponent;
  let fixture: ComponentFixture<FadConAuditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FadConAuditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FadConAuditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
