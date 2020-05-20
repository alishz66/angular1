import { TestBed } from '@angular/core/testing';

import { UkNewsApiService } from './uk-news-api.service';

describe('UkNewsApiService', () => {
  let service: UkNewsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UkNewsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
