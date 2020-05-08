import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable, EMPTY } from 'rxjs';
import { expand, reduce } from 'rxjs/operators';
import { TableData } from '../table/table.component';

export interface ResponseData {
  page: number,
  per_page: number,
  total: number,
  total_pages: number,
  data: TableData[],
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private dataUrl: string = 'https://reqres.in/api/users';
  
  constructor( private http: HttpClient ) { }

  public getSinglePage(page: number = 0): Observable<any> {
    return this.http.get(`${this.dataUrl}?page=${page}`);
  }

  public getAllData(): Subject<any> {
    let subject$ = new Subject<any>();

    this.getSinglePage().pipe(
      expand((response: ResponseData) => response.page !== response.total_pages? this.getSinglePage(response.page + 1): EMPTY),
      reduce((acc: any, response: ResponseData) => acc.data.concat(response.data)),
    ).subscribe((response: TableData[]) => {
      subject$.next(response);
    }, error => {
      subject$.next(false);
    })

    return subject$;
  }
}
