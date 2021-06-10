import { TestBed } from '@angular/core/testing';

import { MatrizExcelService } from './matriz-excel.service';

describe('MatrizExcelService', () => {
  let service: MatrizExcelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MatrizExcelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
