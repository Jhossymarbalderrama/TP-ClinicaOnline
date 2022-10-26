import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRegistroAdministradorComponent } from './form-registro-administrador.component';

describe('FormRegistroAdministradorComponent', () => {
  let component: FormRegistroAdministradorComponent;
  let fixture: ComponentFixture<FormRegistroAdministradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormRegistroAdministradorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormRegistroAdministradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
