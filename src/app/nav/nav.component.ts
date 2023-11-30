import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  @Output() sidenavClose = new EventEmitter();

  public onSidenavClose() {
    this.sidenavClose.emit();
  }
}
