import { TestBed } from '@angular/core/testing';

import { KodiApiService } from './kodi-api.service';

describe('KodiApiService', () => {
  let service: KodiApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KodiApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
