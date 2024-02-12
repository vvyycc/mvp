import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {SegmenterService} from '../../../service/segmenter.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable, of, Subject} from 'rxjs';
import {SegExecutionHistoryDetail} from '../../../model/seg-execution-history-detail';
import {NotificationService} from '../../../../../core/service/notification.service';
import {SegExecutionHistory} from '../../../model/seg-execution-history';
import {saveAs} from 'file-saver';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-segmenter-home-detail',
  templateUrl: './segmenter-home-detail.component.html',
  styleUrls: ['./segmenter-home-detail.component.css']
})
export class SegmenterHomeDetailComponent implements OnInit, AfterViewInit, OnDestroy {
  private unsubscribe = new Subject();
  history: SegExecutionHistory;
  canDownload = new Subject<boolean>();
  executions$: Observable<SegExecutionHistoryDetail[]>;
  displayedColumns: Array<string> = new Array<string>();
  viewColumns: Array<string> = new Array<string>();
  excludeColumns: string[];
  columns = new Map<string, string>();

  constructor(private route: ActivatedRoute,
              private router: Router,
              private readonly segService: SegmenterService,
              private readonly notifier: NotificationService) {
    this.columns.set('fechaDato', 'segmenter.home.history.detail.columns.data-date')
      .set('entidad', 'segmenter.home.history.detail.columns.entity')
      .set('criterio', 'segmenter.home.history.detail.columns.criterion')
      .set('version', 'segmenter.home.history.detail.columns.version')
      .set('registrosSegmentados', 'segmenter.home.history.detail.columns.segmented')
      .set('registrosNoSegmentados', 'segmenter.home.history.detail.columns.no-segmented')
      .set('registrosFallidos', 'segmenter.home.history.detail.columns.errors')
      .set('status', 'aggregator.home.history.columns.status');
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.segService.executionHistory(id)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(response => {
        this.history = response;
        localStorage.setItem('history', JSON.stringify(this.history));
        this.showDownload(this.history);
      });
  }

  ngAfterViewInit(): void {
    this.excludeColumns = ['id'];
    const id = this.route.snapshot.paramMap.get('id');
    this.segService.executionsHistoryDetail(id)
      .subscribe(response => {
          if (!response) {
            return [];
          }
          this.executions$ = of(response);
          for (const r in response[0]) {
            if (!this.excludeColumns.includes(r)) {
              this.displayedColumns.push(r);
              this.viewColumns.push(this.columns.get(r));
            }
          }
        },
        error => {
          this.notifier.showNotification(error.message, 'error');
        });
  }

  download(): void {
    this.segService.executionHistoryErrors(this.history.filename)
      .subscribe(response => {
        const blob = new Blob([response], {type: 'application/octet-stream'});
        saveAs(blob, this.history.filename);
      });
  }

  private showDownload(history: SegExecutionHistory): void {
    const bad: string[] = ['FILE_COULD_NOT_MOVE', 'FILE_NOT_FOUND'];
    this.canDownload.next(!bad.includes(history.filename));
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
