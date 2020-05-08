import { TestBed } from '@angular/core/testing';

import { StorageService } from './storage.service';
import { AppModule } from '../app.module';

describe('StorageService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [AppModule]
  }));

  beforeEach(()=>{
    let store = {};

    spyOn(sessionStorage, 'getItem').and.callFake(function (key) {
      return store[key];
    });
    spyOn(sessionStorage, 'removeItem').and.callFake(function (key) {
      return true;
    });
    spyOn(sessionStorage, 'setItem').and.callFake(function (key, value) {
      store[key] = value + '';
      return store[key]? true: false;
    });
    spyOn(sessionStorage, 'clear').and.callFake(function () {
        store = {};
    });
  })

  it('should be created', () => {
    const service: StorageService = TestBed.get(StorageService);
    expect(service).toBeTruthy();
  });

  it('should return true if storage is avaliable', () => {
    const service: StorageService = TestBed.get(StorageService);
    expect(service.isSessionStorageSupported()).toBeTruthy();
  });

  it('should return true if item added successfully', () => {
    const service: StorageService = TestBed.get(StorageService);
    expect(service.addItem('item',5)).toBeTruthy();
  });

  it('should return true if item removed successfully', () => {
    const service: StorageService = TestBed.get(StorageService);
    expect(service.removeItem('token')).toBeTruthy();
  });

  it('should return null if item is not in storage', () => {
    const service: StorageService = TestBed.get(StorageService);
    expect(service.getItem('tokendad')).toBeNull();
  });

  it('should return item if item is in the storage', () => {
    const service: StorageService = TestBed.get(StorageService);
    service.addItem('token',5);
    expect(service.getItem('token')).not.toBeNull();
  });
});
