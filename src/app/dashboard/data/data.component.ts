import { AfterViewInit, Component, DestroyRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { BackendService } from 'src/app/shared/backend.service';
import { CHILDREN_PER_PAGE } from 'src/app/shared/constants';
import { StoreService } from 'src/app/shared/store.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ChildResponse } from '../../shared/interfaces/Child';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit, AfterViewInit {

  constructor(public storeService: StoreService, public backendService: BackendService, private destroyRef: DestroyRef) {}

  @Output() public pageChanged = new EventEmitter<number>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  public currentPage = 0;
  public displayedColumns: string[] = ['name', 'kindergarten', 'adresse', 'alter', 'geburtsdatum', 'abmelden'];
  public dataSource = new MatTableDataSource<ChildResponse>();
  public showDeleteMsg = false;

  ngOnInit() {
    this.backendService.getChildren(this.currentPage);
    this.storeService.children$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((children) => {
      this.dataSource.data = children;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
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

  protected readonly CHILDREN_PER_PAGE = CHILDREN_PER_PAGE;
}


