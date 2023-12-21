import { Component } from '@angular/core';
import { StoreService } from '../shared/store.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  constructor(public storeService: StoreService) {
    this.storeService.isLoading = true;
  }

  public currentPage = 0;
  public hidden = false;
}
