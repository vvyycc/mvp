import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {SegmenterService} from '../../service/segmenter.service';
import {NotificationService} from '../../../../core/service/notification.service';
import {MatTableDataSource} from '@angular/material/table';
import {SegExecutionHistory} from '../../model/seg-execution-history';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {SegmenterHomeExecuteComponent} from './segmenter-home-execute/segmenter-home-execute.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-segmenter-home',
  templateUrl: './segmenter-home.component.html',
  styleUrls: ['./segmenter-home.component.css']
})
export class SegmenterHomeComponent implements OnInit, AfterViewInit, OnDestroy {
  private unsubscribe = new Subject();
  private page = 0;
  displayedColumns: Array<string>;
  viewColumns: Array<string>;
  excludeColumns: string[];
  columns: Map<string, string>;
  dataSource: MatTableDataSource<SegExecutionHistory>;
  updatedColumns = false;
  isLoadingResults = true;
  pageSize = 10;

  constructor(private readonly segService: SegmenterService,
              private readonly notifier: NotificationService,
              private dialog: MatDialog) {
    this.displayedColumns = new Array<string>();
    this.viewColumns = new Array<string>();
    this.columns = new Map<string, string>();
    this.dataSource = new MatTableDataSource<SegExecutionHistory>();
  }

  ngOnInit(): void {
    this.excludeColumns = ['id', 'filename'];
    this.columns.set('fechaDato', 'segmenter.home.history.columns.data-date')
      .set('fechaIni', 'segmenter.home.history.columns.start-date')
      .set('fechaFin', 'segmenter.home.history.columns.end-date')
      .set('contratos', 'segmenter.home.history.columns.typology')
      .set('entidades', 'segmenter.home.history.columns.entity')
      .set('executionType', 'segmenter.home.history.columns.purpose')
      .set('periodicidades', 'segmenter.home.history.columns.period')
      .set('workflowStatus', 'segmenter.home.history.columns.status')
      .set('hasDetails', 'segmenter.home.history.columns.detail');
  }

  ngAfterViewInit(): void {
    this.getExecutionHistories();
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.filteredData.length === 0) {
      this.notifier.showNotification(`No data matching the filter: "${filterValue}"`, 'info');
    }
  }

  openExecuteDialog(): void {
    this.dialog.open(SegmenterHomeExecuteComponent);
  }

  onScroll(): void {
    this.page++;
    this.getExecutionHistories();
  }

  private initializeViewColumns(response): void {
    for (const r in response) {
      if (!this.excludeColumns.includes(r)) {
        this.displayedColumns.push(r);
        this.viewColumns.push(this.columns.get(r));
      }
    }
    this.updatedColumns = true;
  }

  private getExecutionHistories(): void {
    this.segService.executionsHistory(this.page, this.pageSize)
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
        },
        error => {
          this.isLoadingResults = false;
          this.notifier.showNotification(error.message, 'error');
        });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
