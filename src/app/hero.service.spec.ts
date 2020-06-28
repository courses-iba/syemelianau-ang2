import { TestBed } from '@angular/core/testing';

import { HeroService } from './hero.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HEROES } from './mock-heroes';

describe('HeroService', () => {
  let service: HeroService;
  let httpTestingController: HttpTestingController;

  const heroesUrl = 'api/heroes';
  const mockId = 11;
  const mockHero = { id: mockId, name: 'Mr Meeseeks' };
  const bodyMsg = 'Invalid request parameters';
  const errObj = { status: 404, statusText: 'Bad Request' };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HeroService]
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(HeroService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getHeroes', () => {
    it('should load heroes', () => {
      service.getHeroes().subscribe(
        heroes => expect(heroes).toEqual(HEROES)
      );
      const req = httpTestingController.expectOne(heroesUrl);
      expect(req.request.method).toBe('GET');
      req.flush(HEROES);
    });

    it('should turn 404 into a user-friendly error', () => {
      service.getHeroes().subscribe(
        heroes => expect(heroes).toEqual([])
      );
      const req = httpTestingController.expectOne(heroesUrl);
      expect(req.request.method).toBe('GET');
      req.flush(bodyMsg, errObj);
    });
  });

  describe('getHeroNo404', () => {
    it('should load a hero', () => {
      service.getHeroNo404(mockId).subscribe(
        hero => expect(hero).toBe(HEROES[0])
      );
      const req = httpTestingController.expectOne(`${heroesUrl}/?id=${mockId}`);
      expect(req.request.method).toBe('GET');
      req.flush(HEROES);
    });

    it('should fail gracefully on error', () => {
      service.getHeroNo404(mockId).subscribe(
        heroes => expect(heroes).toBeUndefined()
      );
      const req = httpTestingController.expectOne(`${heroesUrl}/?id=${mockId}`);
      expect(req.request.method).toBe('GET');
      req.flush(bodyMsg, errObj);
    });
  });

  describe('getHero', () => {
    it('should load a hero', () => {
      service.getHero(mockId).subscribe(
        hero => expect(hero).toBe(HEROES.find(h => h.id === mockId))
      );
      const req = httpTestingController.expectOne(`${heroesUrl}/${mockId}`);
      expect(req.request.method).toBe('GET');
      req.flush(HEROES.find(hero => hero.id === mockId));
    });

    it('should fail gracefully on error', () => {
      service.getHero(mockId).subscribe(
        response => expect(response).toBeUndefined()
      );
      const req = httpTestingController.expectOne(`${heroesUrl}/${mockId}`);
      expect(req.request.method).toEqual('GET');
      req.flush(bodyMsg, errObj);
    });
  });

  describe('searchHeroes', () => {
    const searchTerm = 'B';

    it('should find heroes', () => {
      service.searchHeroes(searchTerm).subscribe(heroes =>
        expect(heroes).toContain(HEROES.find(hero => hero.name.includes(searchTerm)))
      );
      const req = httpTestingController.expectOne(`${heroesUrl}/?name=${searchTerm}`);
      expect(req.request.method).toBe('GET');
      req.flush(HEROES.filter(hero => hero.name.includes(searchTerm)));
    });

    it('should not find heroes matching the search criteria', () => {
      service.searchHeroes(searchTerm).subscribe(
        response => expect(response).toEqual([])
      );
      const req = httpTestingController.expectOne(`${heroesUrl}/?name=${searchTerm}`);
      expect(req.request.method).toEqual('GET');
      req.flush([]);
    });

    it('should return an empty array when passing an empty search string', () => {
      const emptySearchString = '';
      service.searchHeroes(emptySearchString).subscribe(
        response => expect(response).toEqual([])
      );
      httpTestingController.expectNone(`${heroesUrl}/?name=${emptySearchString}`);
    });

    it('should fail gracefully on error', () => {
      service.searchHeroes(searchTerm).subscribe(
        response => expect(response).toEqual([])
      );
      const req = httpTestingController.expectOne(`${heroesUrl}/?name=${searchTerm}`);
      expect(req.request.method).toEqual('GET');
      req.flush(bodyMsg, errObj);
    });
  });

  describe('addHero', () => {
    it('should add the hero', () => {
      service.addHero(mockHero).subscribe(
        hero => expect(hero).toEqual(mockHero)
      );
      const req = httpTestingController.expectOne(heroesUrl);
      expect(req.request.method).toBe('POST');
      req.flush(mockHero);
    });

    it('should fail gracefully on error', () => {
      service.addHero(mockHero).subscribe(
        response => expect(response).toBeUndefined()
      );
      const req = httpTestingController.expectOne(`${heroesUrl}`);
      expect(req.request.method).toEqual('POST');
      req.flush(bodyMsg, errObj);
    });
  });

  describe('deleteHero', () => {
    it('should delete the hero', () => {
      service.deleteHero(HEROES.find(hero => hero.id === mockId)).subscribe(
        hero => expect(hero).toBeNull()
      );
      const req = httpTestingController.expectOne(`${heroesUrl}/${mockId}`);
      expect(req.request.method).toBe('DELETE');
      req.flush(null);
    });

    it('should delete the hero by number', () => {
      service.deleteHero(mockId).subscribe(
        hero => expect(hero).toBeNull()
      );
      const req = httpTestingController.expectOne(`${heroesUrl}/${mockId}`);
      expect(req.request.method).toBe('DELETE');
      req.flush(null);
    });
  });

  describe('updateHero', () => {
    it('should update the hero', () => {
      service.updateHero(mockHero).subscribe(
        hero => expect(hero).toEqual(mockHero)
      );
      const req = httpTestingController.expectOne(heroesUrl);
      expect(req.request.method).toBe('PUT');
      req.flush(mockHero);
    });

    it('should fail gracefully on error', () => {
      service.updateHero(mockHero).subscribe(
        response => expect(response).toEqual(mockHero),
      );
      const req = httpTestingController.expectOne(heroesUrl);
      expect(req.request.method).toEqual('PUT');
      req.flush(mockHero);
    });
  });
});
