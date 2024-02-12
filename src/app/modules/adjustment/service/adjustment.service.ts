import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {NotificationService} from '../../../core/service/notification.service';
import {environment} from '../../../../environments/environment';
import {Observable, of, throwError} from 'rxjs';
import {AdjExecutionHistory} from '../model/AdjExecutionHistory';
import {catchError, map} from 'rxjs/operators';
import {AdjExecutionHistoryAdapter} from '../model/AdjExecutionHistoryAdapter';

@Injectable({
  providedIn: 'root'
})
export class AdjustmentService {
  private readonly ADJUSTMENT_SERVICE_BASE_URL: string;

  constructor(private http: HttpClient,
              private historyAdapter: AdjExecutionHistoryAdapter,
              private readonly notifier: NotificationService) {
    this.ADJUSTMENT_SERVICE_BASE_URL = `${environment.ADJUSTMENT_BACK_SERVICES_API}`;
  }

  lastExecutions(page: number): Observable<AdjExecutionHistory[]> {
    const href = `${this.ADJUSTMENT_SERVICE_BASE_URL}/logs/${page}`;
    return this.http.get(href, {observe: 'body'})
      .pipe(
        map((data: any) => data.map((item: any) => this.historyAdapter.adapt(item))),
        catchError(error => this.handleError('lastExecutions', error))
      );
  }

  downloadLog(id: string): Observable<any> {
    return this.http.get(`${this.ADJUSTMENT_SERVICE_BASE_URL}/logs/detail-record-logs/${id}`,
      {responseType: 'blob'})
      .pipe(
        catchError(error => this.handleError('downloadLog', error))
      );
  }

  private handleError<T>(operation = 'operation', error: HttpErrorResponse): any {
    let message = '';
    if (error.error instanceof ErrorEvent) {
      message = error.error.message;
    } else {
      message = `Code: ${error.status} Message: ${error.message}`;
    }
    console.log(`${operation} failed: ${message}`);
    this.notifier.showNotification(message, 'error');
    return throwError(message);
  }
}
