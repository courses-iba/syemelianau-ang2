import { TestBed } from '@angular/core/testing';

import { InMemoryDataService } from './in-memory-data.service';

describe('InMemoryDataService', () => {
  let service: InMemoryDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InMemoryDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('createDb', () => {
    it('should return heroes', () => {
      expect(service.createDb().heroes).toBeTruthy();
    });
  });

  describe('genId', () => {
    it('should generate unique Id', () => {
      expect(service.genId(service.createDb().heroes))
        .toBeGreaterThan(service.createDb().heroes.length + 10);
    });
  });
});
