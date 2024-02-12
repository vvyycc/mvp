import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {SegExecutionHistory} from '../model/seg-execution-history';
import {HttpClient} from '@angular/common/http';
import {SegExecutionHistoryAdapter} from '../model/seg-execution-history-adapter';
import {retryWithBackoff} from '../../../core/operators/http-operators';
import {Criteria} from '../../../shared/model/criteria';
import {SegExecutionHistoryDetail} from '../model/seg-execution-history-detail';
import {SegExecutionHistoryDetailAdapter} from '../model/seg-execution-history-detail-adapter';
import {SegExecution} from '../model/seg-execution';
import {SegCriterionAdapter} from '../model/seg-criterion-adapter';
import {NotificationService} from '../../../core/service/notification.service';
import {Valor} from '../../../shared/model/valor';

@Injectable({
  providedIn: 'root'
})
export class SegmenterService {
  private readonly SEGMENTER_SERVICE_BASE_URL: string;

  constructor(private http: HttpClient,
              private readonly notifier: NotificationService,
              private adapter: SegExecutionHistoryAdapter,
              private detailAdapter: SegExecutionHistoryDetailAdapter,
              private criterionAdapter: SegCriterionAdapter) {
    this.SEGMENTER_SERVICE_BASE_URL = `${environment.SEGMENTER_BACK_SERVICES_API}`;
  }

  executionsHistory(page: number, size: number): Observable<SegExecutionHistory[]> {
    const href = `${this.SEGMENTER_SERVICE_BASE_URL}/segments/execution-histories`;
    return this.http.get(`${href}?page=${page}&size=${size}`, {observe: 'body'})
      .pipe(
        map((data: any) => data.map((item: any) => this.adapter.adapt(item)))
      );
  }

  executionHistory(id: any): Observable<SegExecutionHistory> {
    return this.http.get(`${this.SEGMENTER_SERVICE_BASE_URL}/segments/execution-history/${id}`)
      .pipe(
        map((item: any) => this.adapter.adapt(item))
      );
  }

  executionsHistoryDetail(id: any): Observable<SegExecutionHistoryDetail[]> {
    return this.http.get(`${this.SEGMENTER_SERVICE_BASE_URL}/segments/execution-history/${id}/details`, {observe: 'body'})
      .pipe(
        map((data: any) => data.map((item: any) => this.detailAdapter.adapt(item)))
      );
  }

  executionHistoryErrors(filename: string): Observable<any> {
    return this.http.get(`${this.SEGMENTER_SERVICE_BASE_URL}/segments/execution-history/${filename}/errors`,
      {responseType: 'blob'});
  }

  bankEntities(): Observable<any> {
    return this.http.get(`${this.SEGMENTER_SERVICE_BASE_URL}/segments/bank-entities`)
      .pipe(
        retryWithBackoff(100),
        catchError(this.handleError<any>('bankEntities'))
      );
  }

  criteria(): Observable<Criteria[]> {
    return this.http.get(`${this.SEGMENTER_SERVICE_BASE_URL}/segments/criteria`)
      .pipe(
        retryWithBackoff(100),
        map((data: any) => data.map((item: any) => this.criterionAdapter.adapt(item))),
      );
  }

  createCriterion(criterion: Criteria): Observable<Criteria> {
    return this.http.post(`${this.SEGMENTER_SERVICE_BASE_URL}/segments/criteria`, criterion, {observe: 'response'})
      .pipe(
        map((item: any) => this.criterionAdapter.adapt(item.body)),
        catchError(this.handleError<any>('createCriterion'))
      );
  }

  removeCriterion(nombre: string): Observable<boolean> {
    return this.http.delete(`${this.SEGMENTER_SERVICE_BASE_URL}/segments/criteria/${nombre}`, {observe: 'response'})
      .pipe(
        map(response => {
          return (response.status === 200);
        }),
        catchError(this.handleError<any>('removeCriterion'))
      );
  }

  uploadCriterionConditions(nombre: string, automatico: boolean, file: File): Observable<Criteria> {
    const formData: FormData = new FormData();
    formData.append('file', file);

    return this.http.post(
      `${this.SEGMENTER_SERVICE_BASE_URL}/segments/criteria/${nombre}/upload-conditions?automatico=${automatico}`,
      formData,
      {
        observe: 'response',
        responseType: 'blob' as 'json'
      })
      .pipe(
        map((item: any) => this.criterionAdapter.adapt(item.body))
      );
  }

  findCriterion(name: string): Observable<Criteria> {
    return this.http.get(`${this.SEGMENTER_SERVICE_BASE_URL}/segments/criteria/${name}/values`)
      .pipe(
        map((item: any) => this.criterionAdapter.adapt(item))
      );
  }

  createCriterionValue(name: string, value: Valor): Observable<Criteria> {
    return this.http.post(`${this.SEGMENTER_SERVICE_BASE_URL}/segments/criteria/${name}/values`, value)
      .pipe(
        map((item: any) => this.criterionAdapter.adapt(item))
      );
  }

  removeCriterionValue(name: string, value: Valor): Observable<boolean> {
    return this.http.request('delete', `${this.SEGMENTER_SERVICE_BASE_URL}/segments/criteria/${name}/values`,
      {
        body: value,
        observe: 'response'
      })
      .pipe(
        map(response => {
          return (response.status === 200);
        })
      );
  }

  updateCriterionValue(name: string, value: Valor): Observable<Criteria> {
    return this.http.put(`${this.SEGMENTER_SERVICE_BASE_URL}/segments/criteria/${name}/values`, value)
      .pipe(
        map((item: any) => this.criterionAdapter.adapt(item))
      );
  }

  execute(exec: SegExecution): Observable<any> {
    return this.http.post(`${this.SEGMENTER_SERVICE_BASE_URL}/segments/execute`, exec);
  }

  private handleError<T>(operation = 'operation', result?: T): any {
    return (error: any): Observable<T> => {
      console.log(`${operation} failed: ${error.error.message}`);
      this.notifier.showNotification(JSON.stringify(error.error.message), 'error');
      // Let the app keep running by returning an empty result.
      return of(result);
    };
  }
}
