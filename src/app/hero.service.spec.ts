import { TestBed } from '@angular/core/testing';

import { HeroService } from './hero.service';
import { Hero } from './hero';

describe('HeroService', () => {
  let service: HeroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getHeroes', () => {
    it('should load heroes', () => {
      service.getHeroes().subscribe((heroes: Array<Hero>) => {
        expect(heroes.length).toBe(10);
      });
    });
  });
});
