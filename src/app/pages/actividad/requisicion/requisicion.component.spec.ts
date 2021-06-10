import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequisicionComponent } from './requisicion.component';

describe('RequisicionComponent', () => {
  let component: RequisicionComponent;
  let fixture: ComponentFixture<RequisicionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequisicionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequisicionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
