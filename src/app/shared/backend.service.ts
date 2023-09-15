import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Kindergarden } from './interfaces/Kindergarden';
import { StoreService } from './store.service';
import { Child, ChildResponse } from './interfaces/Child';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http: HttpClient, private storeService: StoreService) { }

  public getChildren() {
    this.http.get<ChildResponse[]>('http://localhost:5000/childs?_expand=kindergarden').subscribe(data => {
      this.storeService.children = data;
    });
    }
  }
