import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {Observable, of} from 'rxjs';
import {AggExecutionHistory} from '../model/agg-execution-history';
import {AggExecution} from '../model/agg-execution';
import {retryWithBackoff} from '../../../core/operators/http-operators';
import {catchError, map} from 'rxjs/operators';
import {AggExecutionHistoryAdapter} from '../model/agg-execution-history-adapter';
import {AggregateCriteria} from '../model/aggregate-criteria';
import {AggregateCriterionAdapter} from '../model/aggregate-criterion-adapter';
import {NotificationService} from '../../../core/service/notification.service';

@Injectable({
  providedIn: 'root'
})
export class AggregatorService {
  private readonly AGGREGATE_SERVICE_BASE_URL: string;
  private readonly SEGMENTER_SERVICE_BASE_URL: string;

  constructor(private http: HttpClient,
              private readonly notifier: NotificationService,
              private adapter: AggExecutionHistoryAdapter,
              private criterionAdapter: AggregateCriterionAdapter) {
    this.AGGREGATE_SERVICE_BASE_URL = `${environment.AGGREGATE_BACK_SERVICES_API}`;
    this.SEGMENTER_SERVICE_BASE_URL = `${environment.SEGMENTER_BACK_SERVICES_API}`;
  }

  executionsHistory(): Observable<AggExecutionHistory[]> {
    return this.http.get(`${this.AGGREGATE_SERVICE_BASE_URL}/aggregations/execution-history`)
      .pipe(
        map((data: any[]) => data.map((item: any) => this.adapter.adapt(item)))
      );
  }

  execute(aggExecution: AggExecution): Observable<any> {
    return this.http.post(`${this.AGGREGATE_SERVICE_BASE_URL}/aggregations/execute`, aggExecution);
  }

  bankEntities(): Observable<any> {
    return this.http.get(`${this.SEGMENTER_SERVICE_BASE_URL}/segments/bank-entities`)
      .pipe(
        retryWithBackoff(100),
        catchError(this.handleError<any>('bankEntities'))
      );
  }

  aggregationsByTypology(typology: string): Observable<any> {
    return this.http.get(`${this.AGGREGATE_SERVICE_BASE_URL}/aggregations/criteria/${typology}/list`)
      .pipe(
        catchError(this.handleError<any>('aggregationsCriteriaByTypology'))
      );
  }

  criteria(): Observable<AggregateCriteria[]> {
    return this.http.get(`${this.AGGREGATE_SERVICE_BASE_URL}/aggregations/criteria`)
      .pipe(
        retryWithBackoff(100),
        map((data: any) => data.map((item: any) => this.criterionAdapter.adapt(item)))
      );
  }

  createCriterion(criterion: AggregateCriteria): Observable<AggregateCriteria> {
    return this.http.post(`${this.AGGREGATE_SERVICE_BASE_URL}/aggregations/criteria`, criterion, {observe: 'response'})
      .pipe(
        map((item: any) => this.criterionAdapter.adapt(item.body)),
        catchError(this.handleError<any>('createCriterion'))
      );
  }

  removeCriterion(id: string): Observable<boolean> {
    return this.http.delete(`${this.AGGREGATE_SERVICE_BASE_URL}/aggregations/criteria/${id}`, {observe: 'response'})
      .pipe(
        map(response => {
          return (response.status === 200);
        }),
        catchError(this.handleError<any>('removeCriterion'))
      );
  }

  uploadAggregations(id: string, file: File): Observable<AggregateCriteria> {
    const formData: FormData = new FormData();
    formData.append('file', file);

    return this.http.post(
      `${this.AGGREGATE_SERVICE_BASE_URL}/aggregations/criteria/${id}/conditions-upload`,
      formData)
      .pipe(
        map((item: any) => this.criterionAdapter.adapt(item.body)),
        catchError(this.handleError<any>('uploadAggregations'))
      );
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
