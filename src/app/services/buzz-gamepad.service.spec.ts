import { TestBed } from '@angular/core/testing';

import { BuzzGamepadService } from './buzz-gamepad.service';

describe('BuzzGamepadService', () => {
  let service: BuzzGamepadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuzzGamepadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
