import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subject} from 'rxjs';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {Criteria} from '../../../../shared/model/criteria';
import {SegmenterService} from '../../service/segmenter.service';
import {NotificationService} from '../../../../core/service/notification.service';
import {MatDialog} from '@angular/material/dialog';
import {takeUntil} from 'rxjs/operators';
import {MatPaginator} from '@angular/material/paginator';
import {SegmenterMgmtNewCriterionComponent} from './segmenter-mgmt-new-criterion/segmenter-mgmt-new-criterion.component';
import {ConfirmationModalComponent} from '../../../../core/components/confirmation-modal/confirmation-modal.component';
import {SegmenterMgmtUploadCriterionComponent} from './segmenter-mgmt-upload-criterion/segmenter-mgmt-upload-criterion.component';

@Component({
  selector: 'app-segmenter-mgmt',
  templateUrl: './segmenter-mgmt.component.html',
  styleUrls: ['./segmenter-mgmt.component.css']
})
export class SegmenterMgmtComponent implements OnInit, AfterViewInit, OnDestroy {
  private unsubscribe = new Subject();
  private page = 0;
  displayedColumns: Array<string>;
  viewColumns: Array<string>;
  excludeColumns: string[];
  columns: Map<string, string>;
  resultsLength = 0;
  dataSource: MatTableDataSource<Criteria>;
  updatedColumns = false;
  isLoadingResults = true;
  pageSize = 8;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatTable) table: MatTable<Criteria>;

  constructor(private readonly segService: SegmenterService,
              private readonly notifier: NotificationService,
              private dialog: MatDialog) {
    this.displayedColumns = new Array<string>();
    this.viewColumns = new Array<string>();
    this.columns = new Map<string, string>();
    this.dataSource = new MatTableDataSource<Criteria>();
  }

  ngOnInit(): void {
    this.excludeColumns = ['id', 'valores'];
    this.columns.set('tipologia', 'segmenter.mgmt.management.columns.typology')
      .set('nombre', 'segmenter.mgmt.management.columns.name')
      .set('definicion', 'segmenter.mgmt.management.columns.definition')
      .set('automatico', 'segmenter.mgmt.management.columns.automatic')
      .set('disponible', 'segmenter.mgmt.management.columns.available')
      .set('actions', 'segmenter.mgmt.management.columns.actions');
  }

  ngAfterViewInit(): void {
    this.getCriteria();
  }

  private getCriteria(): void {
    this.segService.criteria()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(response => {
        this.isLoadingResults = false;
        if (!response) {
          return [];
        }
        this.dataSource.data = [...this.dataSource.data, ...response];
        this.dataSource.paginator = this.paginator;
        this.resultsLength = response.length;
        if (!this.updatedColumns) {
          this.initializeViewColumns(response[0]);
        }
      }, error => {
        this.isLoadingResults = false;
        this.notifier.showNotification(error, 'error');
      });
  }

  private initializeViewColumns(response): void {
    for (const r in response) {
      if (!this.excludeColumns.includes(r)) {
        this.displayedColumns.push(r);
        this.viewColumns.push(this.columns.get(r));
      }
    }
    this.displayedColumns.push('actions');
    this.viewColumns.push(this.columns.get('actions'));
    this.updatedColumns = true;
  }

  createCriterion(): void {
    const modalRef = this.dialog.open(SegmenterMgmtNewCriterionComponent);
    modalRef.componentInstance.createEmitter.subscribe(response => {
      this.dataSource.data.push(response);
      this.dataSource._updateChangeSubscription();
    });
  }

  removeCriterion(element: Criteria, index: number): void {
    const modalRef = this.dialog.open(ConfirmationModalComponent);
    modalRef.componentInstance.confirm.subscribe(value => {
      if (value === true) {
        this.segService.removeCriterion(element.nombre).subscribe(response => {
          if (response) {
            const item = this.dataSource.data.indexOf(element, index);
            this.dataSource.data.splice(item, 1);
            this.dataSource._updateChangeSubscription();
            this.notifier.showNotification('Criterion have been delete successfully', 'success');
          }
        });
      }
    });
  }

  importCriterion(element: Criteria): void {
    const modalRef = this.dialog.open(SegmenterMgmtUploadCriterionComponent, {data: element});
    modalRef.componentInstance.uploadEmitter.subscribe(() => {
      this.dataSource = new MatTableDataSource<Criteria>();
      this.getCriteria();
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.filteredData.length === 0) {
      this.notifier.showNotification(`No data matching the filter: "${filterValue}"`, 'info');
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
