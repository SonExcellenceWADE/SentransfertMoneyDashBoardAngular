import { TestBed } from '@angular/core/testing';

import { AffectationCompteService } from './affectation-compte.service';

describe('AffectationCompteService', () => {
  let service: AffectationCompteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AffectationCompteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
