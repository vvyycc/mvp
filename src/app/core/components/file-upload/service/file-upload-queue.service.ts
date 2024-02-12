import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {InputData} from '../model/input-data';

@Injectable()
export class FileUploadQueueService {
  private inputDataSubject = new BehaviorSubject<InputData>(null);

  initialize(input: InputData): void {
    this.inputDataSubject.next(input);
  }

  getInputData(): InputData {
    return this.inputDataSubject.getValue();
  }
}
