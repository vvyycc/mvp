import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {NotificationService} from '../../../../core/service/notification.service';
import {MatDialog} from '@angular/material/dialog';
import {AdjustmentService} from '../../service/adjustment.service';
import {takeUntil} from 'rxjs/operators';
import {MatTableDataSource} from '@angular/material/table';
import {AdjExecutionHistory} from '../../model/AdjExecutionHistory';
import {saveAs} from 'file-saver';

@Component({
  selector: 'app-adjustment-home',
  templateUrl: './adjustment-home.component.html',
  styleUrls: ['./adjustment-home.component.css']
})
export class AdjustmentHomeComponent implements OnInit, AfterViewInit, OnDestroy {
  private unsubscribe = new Subject();
  private page = 0;
  displayedColumns: Array<string>;
  viewColumns: Array<string>;
  excludeColumns: string[];
  columns: Map<string, string>;
  updatedColumns = false;
  dataSource: MatTableDataSource<AdjExecutionHistory>;
  isLoadingResults = true;

  constructor(private readonly service: AdjustmentService,
              private readonly notifier: NotificationService,
              private dialog: MatDialog) {
    this.displayedColumns = new Array<string>();
    this.viewColumns = new Array<string>();
    this.columns = new Map<string, string>();
    this.dataSource = new MatTableDataSource<AdjExecutionHistory>();
  }

  ngOnInit(): void {
    this.excludeColumns = ['id'];
    this.columns.set('selectedDate', 'adjustment.home.history.columns.data-date')
      .set('typology', 'adjustment.home.history.columns.typology')
      .set('selectedPurposes', 'adjustment.home.history.columns.purpose')
      .set('startedExecutionAt', 'adjustment.home.history.columns.start-date')
      .set('endedExecutionAt', 'adjustment.home.history.columns.end-date')
      .set('adjustmentNotExecuted', 'adjustment.home.history.columns.not-executed')
      .set('totalOkRecords', 'adjustment.home.history.columns.ok')
      .set('totalKoRecords', 'adjustment.home.history.columns.ko')
      .set('status', 'adjustment.home.history.columns.status')
      .set('errors', 'adjustment.home.history.columns.errors');
  }

  ngAfterViewInit(): void {
    this.lastExecutions();
  }

  onScroll(): void {
    this.page++;
    this.lastExecutions();
  }

  isDownloadable(element: AdjExecutionHistory): boolean {
    return element.adjustmentNotExecuted > 0 || element.totalKoRecords > 0;
  }

  download(element: AdjExecutionHistory): void {
    this.service.downloadLog(element.id)
      .subscribe(response => {
        const filename = 'log-error.csv';
        const blob = new Blob([response], {type: 'text/csv'});
        saveAs(blob, filename);
      });
  }

  private initializeViewColumns(response): void {
    for (const r in response) {
      if (!this.excludeColumns.includes(r)) {
        this.displayedColumns.push(r);
        this.viewColumns.push(this.columns.get(r));
      }
    }
    this.displayedColumns.push('errors');
    this.viewColumns.push(this.columns.get('errors'));
    this.updatedColumns = true;
  }

  private lastExecutions(): void {
    this.service.lastExecutions(this.page)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(response => {
        this.isLoadingResults = false;
        if (!response) {
          return [];
        }
        this.dataSource.data = [...this.dataSource.data, ...response];
        if (!this.updatedColumns) {
          this.initializeViewColumns(response[0]);
        }
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
