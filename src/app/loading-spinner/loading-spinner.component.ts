import { Component } from '@angular/core';
import { StoreService} from '../shared/store.service';

@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.scss']
})
export class LoadingSpinnerComponent {
  constructor(public storeService: StoreService) {}
}
