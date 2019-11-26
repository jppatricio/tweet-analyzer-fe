import { TestBed } from '@angular/core/testing';

import { HerokuService } from './heroku.service';

describe('HerokuService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HerokuService = TestBed.get(HerokuService);
    expect(service).toBeTruthy();
  });
});
