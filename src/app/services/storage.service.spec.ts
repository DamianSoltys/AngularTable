import { TestBed } from '@angular/core/testing';

import { StorageService } from './storage.service';
import { AppModule } from '../app.module';

describe('StorageService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [AppModule]
  }));

  it('should be created', () => {
    const service: StorageService = TestBed.get(StorageService);
    expect(service).toBeTruthy();
  });
});
