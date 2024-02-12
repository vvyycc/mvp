import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {BehaviorSubject, Observable, ReplaySubject, Subscription} from 'rxjs';
import {UploadProgress} from '../model/upload-progress';
import {HttpClient, HttpEventType} from '@angular/common/http';
import {FileUploadQueueService} from '../service/file-upload-queue.service';

@Component({
  selector: 'app-progress-file-upload',
  templateUrl: './progress-file-upload.component.html',
  styleUrls: ['./progress-file-upload.component.scss'],
  providers: [FileUploadQueueService]
})
export class ProgressFileUploadComponent implements OnInit, OnDestroy {
  private progressSubject = new ReplaySubject<UploadProgress>();
  progress$: Observable<UploadProgress> = this.progressSubject.asObservable();

  private inProgressSubject = new BehaviorSubject<boolean>(false);
  inProgress$ = this.inProgressSubject.asObservable();

  public subscription = new Subscription();

  @Input() url: string;

  private file: any;
  private id: number;

  @Input()
  get getFile(): any {
    return this.file;
  }

  set setFile(file: any) {
    this.file = file;
  }

  @Input()
  set setId(id: number) {
    this.id = id;
  }

  get getId(): number {
    return this.id;
  }

  @Output() removeEvent = new EventEmitter<ProgressFileUploadComponent>();
  @Output() duringUpload = new EventEmitter();
  private uploadSubscription: any;

  constructor(private http: HttpClient,
              private service: FileUploadQueueService) {
    const queue = this.service.getInputData();
    if (queue) {
      this.url = this.url || queue.url;
    }
  }

  ngOnInit(): void {
    this.progressSubject.next({
      percentage: 0,
      loaded: 0,
      total: this.file.size
    });
  }

  public upload(): void {
    this.inProgressSubject.next(true);
    const formData: FormData = new FormData();
    formData.set('file', this.file, this.file.name);
    this.subscription.add(
      this.http.post(this.url, formData, {
        observe: 'events',
        reportProgress: true,
        responseType: 'json'
      }).subscribe((event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progressSubject.next({
              percentage: Math.floor((event.loaded * 100) / event.total),
              loaded: event.loaded,
              total: event.total
            });
          }
          this.duringUpload.emit({file: this.file, event});
        },
        (error: any) => {
          if (this.uploadSubscription) {
            this.uploadSubscription.unsubscribe();
          }
          this.inProgressSubject.next(false);
          this.duringUpload.emit({file: this.file, event: error});
        },
        () => this.inProgressSubject.next(false))
    );
  }

  public remove(): void {
    this.subscription.unsubscribe();
    this.removeEvent.emit(this);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
