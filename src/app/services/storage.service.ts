import { Injectable } from '@angular/core';
import { TableConfig } from '../table/table.component';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  public isSessionStorageSupported(): boolean {
    const storage = window.sessionStorage;

    try {
      storage.setItem('test', 'test');
      storage.removeItem('test');    
      return true;
    } catch (e) {
      return false;
    }
  }

  public addItem(key:string, item: any): boolean {
    if(this.isSessionStorageSupported()) {
      try {
        sessionStorage.setItem(key,item);
      } catch (e) {
        return false;
      }
      return true;
    }

    return false;
  }

  public removeItem(key: string): boolean {
    if(this.isSessionStorageSupported()) {
      try {
        sessionStorage.removeItem(key);
      } catch (e) {
        return false;
      }
      return true;
    }

    return false;
  }

  public getItem(key: string): TableConfig {
    if(this.isSessionStorageSupported()) {
      try {
        return JSON.parse(sessionStorage.getItem(key));
      } catch (e) {
        return null;
      }
    }

    return null;
  }

  public clearStorage(): boolean {
    if(this.isSessionStorageSupported()) {
      try {
        sessionStorage.clear();
      } catch (e) {
        return false;
      }
      return true;
    }

    return false;
  }
}
