/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HttpServerService } from './http-server.service';

describe('Service: HttpServer', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpServerService]
    });
  });

  it('should ...', inject([HttpServerService], (service: HttpServerService) => {
    expect(service).toBeTruthy();
  }));
});
