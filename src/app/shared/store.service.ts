import { Injectable } from '@angular/core';
import { Kindergarden } from './interfaces/Kindergarden';
import { ChildResponse } from './interfaces/Child';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor() {}

  private _children$ = new ReplaySubject<ChildResponse[]>(1);

  public children: ChildResponse[] = [];
  public kindergardens: Kindergarden[] = [];
  public childrenTotalCount = 0;

  childrenChanged() {
    return this._children$.next(this.children);
  }

  get children$() {
    return this._children$.asObservable();
  }
}
