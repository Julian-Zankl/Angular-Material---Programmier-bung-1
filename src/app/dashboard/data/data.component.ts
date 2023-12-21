import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { BackendService } from 'src/app/shared/backend.service';
import { CHILDREN_PER_PAGE } from 'src/app/shared/constants';
import { StoreService } from 'src/app/shared/store.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ChildResponse } from '../../shared/interfaces/Child';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit, AfterViewInit {

  constructor(public storeService: StoreService, public backendService: BackendService, private destroyRef: DestroyRef, private cdRef: ChangeDetectorRef) {}

  @Output() public pageChanged = new EventEmitter<number>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public currentPage = 0;
  public displayedColumns: string[] = ['name', 'anmeldung', 'kindergarten', 'adresse', 'alter', 'geburtsdatum', 'abmelden'];
  public dataSource = new MatTableDataSource<ChildResponse>();

  ngOnInit() {
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'kindergarten':
          return item.kindergarden.name;
        default:
          // @ts-ignore
          return item[property];
      }
    }
    this.backendService.getChildren(this.currentPage);
    this.storeService.children$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((children) => {
      this.dataSource.data = children;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.sort.sort({ id: 'name', start: 'asc', disableClear: false });
    this.cdRef.detectChanges();
  }

  getAge(birthDate: string) {
    let today = new Date();
    let birthDateTimestamp = new Date(birthDate);
    let age = today.getFullYear() - birthDateTimestamp.getFullYear();
    let m = today.getMonth() - birthDateTimestamp.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDateTimestamp.getDate())) {
        age--;
    }
    return age;
  }

  removeChild(childId: string) {
    this.storeService.deleteId = childId;
    this.backendService.removeChild(childId, this.currentPage);
  }

  onInputChange(selectedValue: string) {
    this.dataSource.filter = selectedValue.trim();
  }

  onSelection(value: number | 'all') {
    this.dataSource.data = value === 'all'
      ? this.storeService.children
      : this.storeService.children.filter(child => child.kindergardenId === value);
  }

  protected readonly CHILDREN_PER_PAGE = CHILDREN_PER_PAGE;
}


