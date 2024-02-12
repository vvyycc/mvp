import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {environment} from '../../../environments/environment';
import {retryWithBackoff} from '../../core/operators/http-operators';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BankEntityService {
  private readonly SEGMENTER_SERVICE_BASE_URL: string;

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {
    this.SEGMENTER_SERVICE_BASE_URL = `${environment.SEGMENTER_BACK_SERVICES_API}`;
  }

  getBankEntities(): Observable<any> {
    return this.http.get(`${this.SEGMENTER_SERVICE_BASE_URL}/segments/bank-entities`)
      .pipe(
        retryWithBackoff(100),
        catchError(this.handleError<any>('bankEntities'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T): any {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      console.log(`${operation} failed: ${error}`);

      // Let the app keep running by returning an empty result.
      return of(result);
    };
  }
}
