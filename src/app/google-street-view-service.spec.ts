import { TestBed } from '@angular/core/testing';

import { GoogleStreetViewService } from './google-street-view-service';

describe('GoogleStreetViewServiceService', () => {
  let service: GoogleStreetViewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoogleStreetViewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
