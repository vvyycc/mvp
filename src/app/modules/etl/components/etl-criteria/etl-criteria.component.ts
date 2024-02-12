import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subject} from 'rxjs';
import {EtlService} from '../../service/etl.service';
import {takeUntil} from 'rxjs/operators';
import {NotificationService} from '../../../../core/service/notification.service';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {AggregateCriteria} from '../../../aggregator/model/aggregate-criteria';
import {MatDialog} from '@angular/material/dialog';
import {EtlNewCriterionComponent} from './etl-new-criterion/etl-new-criterion.component';
import {ConfirmationModalComponent} from '../../../../core/components/confirmation-modal/confirmation-modal.component';
import {Criteria} from '../../../../shared/model/criteria';
import {EtlUploadCriterionComponent} from './etl-upload-criterion/etl-upload-criterion.component';
import {EtlCriterion} from '../../model/etl-criterion';

@Component({
  selector: 'app-etl-criteria',
  templateUrl: './etl-criteria.component.html',
  styleUrls: ['./etl-criteria.component.css'],
})
export class EtlCriteriaComponent implements OnInit, AfterViewInit, OnDestroy {
  private unsubscribe = new Subject();
  displayedColumns: Array<string>;
  viewColumns: Array<string>;
  excludeColumns: string[];
  columns: Map<string, string>;
  resultsLength = 0;
  dataSource: MatTableDataSource<EtlCriterion>;
  updatedColumns = false;
  isLoadingResults = true;
  pageSize = 8;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatTable) table: MatTable<AggregateCriteria>;

  constructor(private etlService: EtlService,
              private notifier: NotificationService,
              private dialog: MatDialog) {
    this.displayedColumns = new Array<string>();
    this.viewColumns = new Array<string>();
    this.columns = new Map<string, string>();
    this.dataSource = new MatTableDataSource<EtlCriterion>();
  }

  ngOnInit(): void {
    this.excludeColumns = ['id', 'definicion'];
    this.columns.set('nombre', 'etl.criteria.columns.name')
      .set('tipologia', 'etl.criteria.columns.typology')
      .set('inputVersion', 'etl.criteria.columns.input-version')
      .set('outputVersion', 'etl.criteria.columns.output-version')
      .set('disponible', 'etl.criteria.columns.available')
      .set('actions', 'etl.criteria.columns.actions');
  }

  ngAfterViewInit(): void {
    this.getCriteria();
  }

  createCriterion(): void {
    const modalRef = this.dialog.open(EtlNewCriterionComponent);
    modalRef.componentInstance.emitter.subscribe(response => {
      this.dataSource.data.push(response);
      this.dataSource._updateChangeSubscription();
    });
  }

  disableCriterion(element: EtlCriterion, index: number): void {
    const modalRef = this.dialog.open(ConfirmationModalComponent);
    modalRef.componentInstance.confirm.subscribe(value => {
      if (value === true) {
        this.etlService.removeCriterion(element.id).subscribe(response => {
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
    const modalRef = this.dialog.open(EtlUploadCriterionComponent, {data: element});
    modalRef.componentInstance.emitter.subscribe(() => {
      this.dataSource = new MatTableDataSource<EtlCriterion>();
      this.getCriteria();
    });
  }

  private getCriteria(): void {
    this.etlService.criteria()
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

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.filteredData.length === 0) {
      this.notifier.showNotification(`No data matching the filter: "${filterValue}"`, 'info');
    }
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

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
