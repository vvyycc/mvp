import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {EtlExecutionHistory} from '../../model/etl-execution-history';
import {EtlService} from '../../service/etl.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {EtlHomeExecuteComponent} from './etl-home-execute/etl-home-execute.component';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-atl-home',
  templateUrl: './etl-home.component.html',
  styleUrls: ['./etl-home.component.scss'],
})
export class EtlHomeComponent implements OnInit, AfterViewInit, OnDestroy {
  private unsubscribe = new Subject();
  displayedColumns: Array<string> = new Array<string>();
  viewColumns: Array<string> = new Array<string>();
  excludeColumns: string[];
  columns: Map<string, string>;
  resultsLength = 0;
  dataSource: MatTableDataSource<EtlExecutionHistory>;
  isLoadingResults = true;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private etlService: EtlService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.excludeColumns = ['id', 'jobId', 'executionDate', 'nombreFichero'];
    this.columns = new Map<string, string>();
    this.columns.set('fechaDato', 'etl.home.history.columns.data-date')
      .set('fechaIni', 'etl.home.history.columns.start-date')
      .set('fechaFin', 'etl.home.history.columns.end-date')
      .set('tipologia', 'etl.home.history.columns.typology')
      .set('entidades', 'etl.home.history.columns.entity')
      .set('purpose', 'etl.home.history.columns.purpose')
      .set('periodicidades', 'etl.home.history.columns.period')
      .set('estado', 'etl.home.history.columns.status')
      .set('criterio', 'etl.home.history.columns.criterion')
      .set('agregado', 'etl.home.history.columns.aggregate')
      .set('nombreFichero', 'etl.home.history.columns.filename');
  }

  ngAfterViewInit(): void {
    this.getHistories();
  }

  getHistories(): void {
    this.etlService.executionsHistory()
      .pipe(
        takeUntil(this.unsubscribe))
      .subscribe(histories => {
        this.isLoadingResults = false;
        if (!histories) {
          return [];
        } else {
          this.dataSource = new MatTableDataSource<any>(histories);
          this.dataSource.paginator = this.paginator;
          this.resultsLength = histories.length;
          for (const h in histories[0]) {
            if (!this.excludeColumns.includes(h)) {
              this.displayedColumns.push(h);
              this.viewColumns.push(this.columns.get(h));
            }
          }
        }
      });
  }

  openExecuteDialog(): void {
    this.dialog.open(EtlHomeExecuteComponent);
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
