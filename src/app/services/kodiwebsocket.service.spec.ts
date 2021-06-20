import { TestBed } from '@angular/core/testing';

import { KodiwebsocketService } from './kodiwebsocket.service';

describe('KodiwebsocketService', () => {
  let service: KodiwebsocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KodiwebsocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
