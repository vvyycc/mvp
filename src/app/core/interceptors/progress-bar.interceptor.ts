import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ProgressBarService} from '../service/progress-bar.service';
import {finalize} from 'rxjs/operators';

@Injectable()
export class ProgressBarInterceptor implements HttpInterceptor {

  constructor(private readonly progressBarService: ProgressBarService) {
  }

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.progressBarService.show();

    return next.handle(req)
      .pipe(finalize(() => this.progressBarService.hide()));
  }
}
