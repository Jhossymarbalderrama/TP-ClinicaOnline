import { TestBed } from '@angular/core/testing';

import { FechasTurnosService } from './fechas-turnos.service';

describe('FechasTurnosService', () => {
  let service: FechasTurnosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FechasTurnosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
