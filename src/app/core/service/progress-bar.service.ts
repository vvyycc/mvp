import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgressBarService {
  private readonly stream$ = new Subject<boolean>();

  constructor() {
  }

  public stream(): Subject<boolean> {
    return this.stream$;
  }

  public show(): void {
    Promise.resolve(null).then(() => {
      this.stream$.next(true);
    });
  }

  public hide(): void {
    this.stream$.next(false);
  }
}
