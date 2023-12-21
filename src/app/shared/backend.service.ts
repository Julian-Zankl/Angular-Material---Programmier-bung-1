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

  public getChildren(page: number) {
    this.http.get<ChildResponse[]>(`http://localhost:5000/childs?_expand=kindergarden`, { observe: 'response' }).subscribe(data => {
      this.storeService.children = data.body!;
      this.storeService.childrenTotalCount = Number(data.headers.get('X-Total-Count'));
      this.storeService.childrenChanged();
      this.storeService.isLoading = false;
    });
  }

  public getKindergarden() {
    this.http.get<Kindergarden[]>('http://localhost:5000/kindergardens').subscribe((elements: Kindergarden[]) => {
      this.storeService.kindergardens = elements;
      this.storeService.isLoading = false;
    });
  }

  public addChild(child: Child, page: number) {
    this.http.post<Child>('http://localhost:5000/childs', child).subscribe(_ => {
      this.getChildren(page);
    });
  }

  public removeChild(childId: string, page: number) {
    this.http.delete<void>(`http://localhost:5000/childs/${childId}`).subscribe(_ => {
      this.getChildren(page);
      this.storeService.deleteId = '-1';
      this.storeService.showDeleteMsg = true;
    });
  }
}
