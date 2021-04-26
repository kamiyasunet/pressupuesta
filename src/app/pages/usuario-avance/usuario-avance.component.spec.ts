import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioAvanceComponent } from './usuario-avance.component';

describe('UsuarioAvanceComponent', () => {
  let component: UsuarioAvanceComponent;
  let fixture: ComponentFixture<UsuarioAvanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuarioAvanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioAvanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
