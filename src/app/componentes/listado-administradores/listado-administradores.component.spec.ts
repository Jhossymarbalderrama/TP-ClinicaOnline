import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoAdministradoresComponent } from './listado-administradores.component';

describe('ListadoAdministradoresComponent', () => {
  let component: ListadoAdministradoresComponent;
  let fixture: ComponentFixture<ListadoAdministradoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoAdministradoresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoAdministradoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
