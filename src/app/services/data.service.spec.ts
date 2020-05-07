import { TestBed } from '@angular/core/testing';

import { DataService, ResponseData } from './data.service';
import { AppModule } from '../app.module';

describe('DataService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [AppModule]
  }));

  it('should be created', () => {
    const service: DataService = TestBed.get(DataService);
    
    expect(service).toBeTruthy();
  });

  it('should return not null response', (done: DoneFn) => {
    const service: DataService = TestBed.get(DataService);

    service.getSinglePage().subscribe((response: ResponseData)=>{
      expect(response.data).not.toBeNull();
      done();
    })
  });

  it('should return empty array', (done: DoneFn) => {
    const service: DataService = TestBed.get(DataService);

    service.getSinglePage(553).subscribe((response: ResponseData)=>{
      expect(response.data).toEqual([]);
      done();
    })
  });

  it('should return not null response', (done: DoneFn) => {
    const service: DataService = TestBed.get(DataService);

    service.getAllData().subscribe((response: ResponseData)=>{
      expect(response.data).not.toBeNull();
      done();
    })
  });
});
