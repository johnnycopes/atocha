import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { SelectService } from './select.service';

describe('SelectService', () => {
  let service: SelectService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useClass: {} },
      ],
    });
    service = TestBed.inject(SelectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
