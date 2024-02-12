import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AggregatorService} from '../../service/aggregator.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {NotificationService} from '../../../../core/service/notification.service';
import {MatTableDataSource} from '@angular/material/table';
import {AggExecutionHistory} from '../../model/agg-execution-history';
import {MatPaginator} from '@angular/material/paginator';
import {MatDialog} from '@angular/material/dialog';
import {AggregatorHomeExecuteComponent} from './aggregator-home-execute/aggregator-home-execute.component';

@Component({
  selector: 'app-agregator-home',
  templateUrl: './aggregator-home.component.html',
  styleUrls: ['./aggregator-home.component.scss']
})
export class AggregatorHomeComponent implements OnInit, AfterViewInit, OnDestroy {
  private unsubscribe = new Subject();
  displayedColumns: Array<string> = new Array<string>();
  viewColumns: Array<string> = new Array<string>();
  excludeColumns: string[];
  columns: Map<string, string>;
  resultsLength = 0;
  dataSource: MatTableDataSource<AggExecutionHistory>;
  isLoadingResults = true;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private readonly aggService: AggregatorService,
              private readonly notificationService: NotificationService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.excludeColumns = ['id', 'jobId', 'registrosAgregados', 'poolsResultantes'];
    this.columns = new Map<string, string>();
    this.columns.set('selectedDate', 'aggregator.home.history.columns.data-date')
      .set('startedExecutionAt', 'aggregator.home.history.columns.start-date')
      .set('endedExecutionAt', 'aggregator.home.history.columns.end-date')
      .set('typology', 'aggregator.home.history.columns.typology')
      .set('entities', 'aggregator.home.history.columns.entity')
      .set('purpose', 'aggregator.home.history.columns.purpose')
      .set('periodicity', 'aggregator.home.history.columns.period')
      .set('status', 'aggregator.home.history.columns.status')
      .set('criterios', 'aggregator.home.history.columns.criterion')
      .set('executionDate', 'aggregator.home.history.columns.execution-date');
  }

  ngAfterViewInit(): void {
    this.getExecutionHistories();
  }

  getExecutionHistories(): void {
    this.aggService.executionsHistory()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(response => {
          this.isLoadingResults = false;
          if (!response) {
            return [];
          }
          this.dataSource = new MatTableDataSource<AggExecutionHistory>(response);
          this.dataSource.paginator = this.paginator;
          this.resultsLength = response.length;
          for (const r in response[0]) {
            if (!this.excludeColumns.includes(r)) {
              this.displayedColumns.push(r);
              this.viewColumns.push(this.columns.get(r));
            }
          }
        },
        error => {
          this.isLoadingResults = false;
          this.notificationService.showNotification(error.message, 'error');
        });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.filteredData.length === 0) {
      this.notificationService.showNotification(`No data matching the filter: "${filterValue}"`, 'info');
    }
  }

  openExecuteDialog(): void {
    this.dialog.open(AggregatorHomeExecuteComponent);
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
