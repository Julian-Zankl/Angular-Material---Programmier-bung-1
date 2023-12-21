import { Component, OnInit } from '@angular/core';
import { StoreService } from '../shared/store.service';
import { BackendService } from '../shared/backend.service';
import { Kindergarden } from '../shared/interfaces/Kindergarden';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.scss']
})
export class DetailPageComponent implements OnInit {

  constructor(public storeService: StoreService, public backendService: BackendService) {}

  public selectedKindergarden?: Kindergarden;

  ngOnInit() {
    this.storeService.isLoading = true;
    this.backendService.getKindergarden();
  }

  onSelection(kindergardenId: number) {
    this.selectedKindergarden = this.storeService.kindergardens.find(kindergarden => kindergarden.id === kindergardenId);
  }
}
