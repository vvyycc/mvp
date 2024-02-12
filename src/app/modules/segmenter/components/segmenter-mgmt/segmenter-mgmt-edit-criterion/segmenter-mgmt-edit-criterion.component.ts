import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SegmenterService} from '../../../service/segmenter.service';
import {NotificationService} from '../../../../../core/service/notification.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {Valor} from '../../../../../shared/model/valor';
import {MatDialog} from '@angular/material/dialog';
import {
  SegmenterMgmtEditCriterionNewValueComponent
} from './segmenter-mgmt-edit-criterion-new-value/segmenter-mgmt-edit-criterion-new-value.component';
import {Criteria} from '../../../../../shared/model/criteria';
import {ConfirmationModalComponent} from '../../../../../core/components/confirmation-modal/confirmation-modal.component';
import {
  SegmenterMgmtEditCriterionEditValueComponent
} from './segmenter-mgmt-edit-criterion-edit-value/segmenter-mgmt-edit-criterion-edit-value.component';

@Component({
  selector: 'app-segmenter-mgmt-edit-criterion',
  templateUrl: './segmenter-mgmt-edit-criterion.component.html',
  styleUrls: ['./segmenter-mgmt-edit-criterion.component.css']
})
export class SegmenterMgmtEditCriterionComponent implements OnInit, AfterViewInit, OnDestroy {
  private unsubscribe = new Subject();
  criterion: Criteria;
  nombre = '';
  displayedColumns: Array<string>;
  viewColumns: Array<string>;
  excludeColumns: string[];
  columns: Map<string, string>;
  resultsLength = 0;
  dataSource: MatTableDataSource<Valor>;
  updatedColumns = false;
  isLoadingResults = true;
  pageSize = 8;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatTable) table: MatTable<Valor>;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private readonly segService: SegmenterService,
              private readonly notifier: NotificationService,
              private dialog: MatDialog) {
    this.displayedColumns = new Array<string>();
    this.viewColumns = new Array<string>();
    this.columns = new Map<string, string>();
    this.dataSource = new MatTableDataSource<Valor>();
    this.nombre = this.route.snapshot.paramMap.get('name');
  }

  ngOnInit(): void {
    this.excludeColumns = ['id'];
    this.columns.set('nombre', 'segmenter.mgmt.management.columns.name')
      .set('definicion', 'segmenter.mgmt.management.columns.definition')
      .set('actions', 'segmenter.mgmt.management.columns.actions');

  }

  ngAfterViewInit(): void {
    this.criterionValuesByName(this.nombre);
  }

  createValue(): void {
    const modalRef = this.dialog.open(SegmenterMgmtEditCriterionNewValueComponent, {data: this.criterion});
    modalRef.componentInstance.emitter.subscribe(response => {
      this.dataSource = new MatTableDataSource<Valor>(response.valores);
    });
  }

  removeValue(valor: Valor, index: number): void {
    const modalRef = this.dialog.open(ConfirmationModalComponent);
    modalRef.componentInstance.confirm.subscribe(value => {
      if (value === true) {
        this.segService.removeCriterionValue(this.criterion.nombre, valor).subscribe(response => {
          if (response) {
            const item = this.dataSource.data.indexOf(valor, index);
            this.dataSource.data.splice(item, 1);
            this.dataSource._updateChangeSubscription();
            this.notifier.showNotification(`Criterion value: ${valor.nombre} have been delete successfully`, 'success');
          }
        }, error => {
          this.notifier.showNotification(JSON.stringify(error.error.message), 'error');
        });
      }
    });
  }

  editValue(valor: Valor): void {
    const modalRef = this.dialog.open(SegmenterMgmtEditCriterionEditValueComponent,
      {
        data: {value: valor, name: this.criterion.nombre}
      });
    modalRef.componentInstance.emitter.subscribe(response => {
      this.dataSource = new MatTableDataSource<Valor>(response.valores);
    });
  }

  private criterionValuesByName(name: string): void {
    this.segService.findCriterion(name)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(response => {
        this.isLoadingResults = false;
        if (!response) {
          return [];
        }
        this.criterion = response;
        this.dataSource.data = [...this.dataSource.data, ...response.valores];
        this.dataSource.paginator = this.paginator;
        this.resultsLength = response.valores.length;
        if (!this.updatedColumns) {
          this.initializeViewColumns(response.valores[0]);
        }
      });
  }

  private initializeViewColumns(response): void {
    if (!response) {
      this.columns.forEach((v, k) => {
        this.displayedColumns.push(k);
        this.viewColumns.push(v);
      });
    } else {
      for (const r in response) {
        if (!this.excludeColumns.includes(r)) {
          this.displayedColumns.push(r);
          this.viewColumns.push(this.columns.get(r));
        }
      }
      this.displayedColumns.push('actions');
      this.viewColumns.push(this.columns.get('actions'));
    }
    this.updatedColumns = true;
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
