import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartsAdministradorComponent } from './charts-administrador.component';

describe('ChartsAdministradorComponent', () => {
  let component: ChartsAdministradorComponent;
  let fixture: ComponentFixture<ChartsAdministradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartsAdministradorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartsAdministradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
