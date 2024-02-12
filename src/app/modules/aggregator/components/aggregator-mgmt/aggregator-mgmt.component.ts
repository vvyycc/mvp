import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NotificationService} from '../../../../core/service/notification.service';
import {MatDialog} from '@angular/material/dialog';
import {AggregatorMgmtNewCriterionComponent} from './aggregator-mgmt-new-criterion/aggregator-mgmt-new-criterion.component';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {Subject} from 'rxjs';
import {MatPaginator} from '@angular/material/paginator';
import {AggregatorService} from '../../service/aggregator.service';
import {takeUntil} from 'rxjs/operators';
import {AggregateCriteria} from '../../model/aggregate-criteria';
import {Criteria} from '../../../../shared/model/criteria';
import {ConfirmationModalComponent} from '../../../../core/components/confirmation-modal/confirmation-modal.component';
import {AggregatorMgmtUploadCriterionComponent} from './aggregator-mgmt-upload-criterion/aggregator-mgmt-upload-criterion.component';

@Component({
  selector: 'app-aggregator-mgmt',
  templateUrl: './aggregator-mgmt.component.html',
  styleUrls: ['./aggregator-mgmt.component.scss']
})
export class AggregatorMgmtComponent implements OnInit, AfterViewInit, OnDestroy {
  private unsubscribe = new Subject();
  displayedColumns: Array<string>;
  viewColumns: Array<string>;
  excludeColumns: string[];
  columns: Map<string, string>;
  resultsLength = 0;
  dataSource: MatTableDataSource<AggregateCriteria>;
  updatedColumns = false;
  isLoadingResults = true;
  pageSize = 8;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatTable) table: MatTable<AggregateCriteria>;

  constructor(private readonly aggService: AggregatorService,
              private readonly notifier: NotificationService,
              private dialog: MatDialog) {
    this.displayedColumns = new Array<string>();
    this.viewColumns = new Array<string>();
    this.columns = new Map<string, string>();
    this.dataSource = new MatTableDataSource<AggregateCriteria>();
  }

  ngOnInit(): void {
    this.excludeColumns = ['id', 'definicion'];
    this.columns.set('nombre', 'aggregator.mgmt.management.columns.name')
      .set('tipologia', 'aggregator.mgmt.management.columns.typology')
      .set('disponible', 'aggregator.mgmt.management.columns.available')
      .set('actions', 'aggregator.mgmt.management.columns.actions');
  }

  ngAfterViewInit(): void {
    this.getCriteria();
  }

  createCriterion(): void {
    const modalRef = this.dialog.open(AggregatorMgmtNewCriterionComponent);
    modalRef.componentInstance.emitter.subscribe(response => {
      this.dataSource.data.push(response);
      this.dataSource._updateChangeSubscription();
    });
  }

  removeCriterion(element: AggregateCriteria, index: number): void {
    const modalRef = this.dialog.open(ConfirmationModalComponent);
    modalRef.componentInstance.confirm.subscribe(value => {
      if (value === true) {
        this.aggService.removeCriterion(element.id).subscribe(response => {
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
    const modalRef = this.dialog.open(AggregatorMgmtUploadCriterionComponent, {data: element});
    modalRef.componentInstance.emitter.subscribe(() => {
      this.dataSource = new MatTableDataSource<AggregateCriteria>();
      this.getCriteria();
    });
  }

  private getCriteria(): void {
    this.aggService.criteria()
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
