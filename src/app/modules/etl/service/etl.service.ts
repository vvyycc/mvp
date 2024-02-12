import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {EtlExecutionHistory} from '../model/etl-execution-history';
import {environment} from '../../../../environments/environment';
import {retryWithBackoff} from '../../../core/operators/http-operators';
import {EtlExecution} from '../model/etl-execution';
import {NotificationService} from '../../../core/service/notification.service';
import {EtlCriterionAdapter} from '../model/etl-criterion-adapter';
import {EtlCriterion} from '../model/etl-criterion';

@Injectable({
  providedIn: 'root'
})
export class EtlService {
  private readonly ETL_SERVICE_BASE_URL: string;
  private readonly AGGREGATE_SERVICE_BASE_URL: string;
  private historySubject = new BehaviorSubject([]);

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient,
              private readonly notifier: NotificationService,
              private criterionAdapter: EtlCriterionAdapter) {
    this.ETL_SERVICE_BASE_URL = `${environment.ETL_BACK_SERVICES_API}`;
    this.AGGREGATE_SERVICE_BASE_URL = `${environment.AGGREGATE_BACK_SERVICES_API}`;
  }

  executeEtl(etlExecution: EtlExecution): Observable<any> {
    return this.http.post(`${this.ETL_SERVICE_BASE_URL}/etl/executions`, etlExecution);
  }

  executionsHistory(): Observable<any> {
    return this.http.get<EtlExecutionHistory[]>(`${this.ETL_SERVICE_BASE_URL}/etl/executions-history`)
      .pipe(
        retryWithBackoff(100),
        tap(response => {
          this.historySubject.next(response);
        }),
        catchError(this.handleError<any>('executionsHistory'))
      );
  }

  executionHistory(jobId: string): Observable<any> {
    return this.http.get(`${this.ETL_SERVICE_BASE_URL}/etl/executions-history/${jobId}`);
  }

  criteria(): Observable<EtlCriterion[]> {
    return this.http.get(`${this.ETL_SERVICE_BASE_URL}/etl/criteria`)
      .pipe(
        retryWithBackoff(100),
        map((data: any) => data.map((item: any) => this.criterionAdapter.adapt(item)))
      );
  }

  createCriterion(criterion: EtlCriterion): Observable<EtlCriterion> {
    return this.http.post(`${this.ETL_SERVICE_BASE_URL}/etl/criteria`, criterion, {observe: 'response'})
      .pipe(
        map((item: any) => this.criterionAdapter.adapt(item.body)),
        catchError(this.handleError<any>('createCriterion'))
      );
  }

  removeCriterion(id: string): Observable<boolean> {
    return this.http.delete(`${this.ETL_SERVICE_BASE_URL}/etl/criteria/${id}`, {observe: 'response'})
      .pipe(
        map(response => {
          return (response.status === 200);
        }),
        catchError(this.handleError<any>('removeCriterion'))
      );
  }

  uploadMappingFile(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);

    return this.http.post(`${this.ETL_SERVICE_BASE_URL}/etl/mappings`, formData);
  }

  uploadCriteriaFile(type: string, file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);

    return this.http.post(`${this.ETL_SERVICE_BASE_URL}/etl/criteria/${type}/upload`, formData);
  }

  aggregationsByTypology(typology: string): Observable<any> {
    return this.http.get(`${this.AGGREGATE_SERVICE_BASE_URL}/aggregations/criteria/${typology}/list`)
      .pipe(
        catchError(this.handleError<any>('aggregationsCriteriaByTypology'))
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
