import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroUsuariosAdministradorComponent } from './registro-usuarios-administrador.component';

describe('RegistroUsuariosAdministradorComponent', () => {
  let component: RegistroUsuariosAdministradorComponent;
  let fixture: ComponentFixture<RegistroUsuariosAdministradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroUsuariosAdministradorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroUsuariosAdministradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
