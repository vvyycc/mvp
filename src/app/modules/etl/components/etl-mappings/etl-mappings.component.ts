import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EtlService} from '../../service/etl.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {NotificationService} from '../../../../core/service/notification.service';
import {FileValidator} from '../../../../core/validators/file-validator';

@Component({
  selector: 'app-etl-mappings',
  templateUrl: './etl-mappings.component.html',
  styleUrls: ['../../etl.component.scss', './etl-mappings.component.css'],
})
export class EtlMappingsComponent implements OnInit, OnDestroy {
  private unsubscribe = new Subject();
  @ViewChild('fileInput') fileInput: ElementRef;
  etlForm: FormGroup;
  file: File;

  constructor(private fb: FormBuilder, private etlService: EtlService,
              private notificationService: NotificationService) {
  }

  ngOnInit(): void {
    this.etlForm = this.fb.group({
      filename: [''],
      file: ['', Validators.required]
    });
  }

  get f(): { [p: string]: AbstractControl } {
    return this.etlForm.controls;
  }

  onFileInput(files: FileList | null): void {
    if (files) {
      this.file = files.item(0);
      if (!FileValidator.isValidExcelMimetype(this.file)) {
        this.etlForm.reset();
        this.etlForm.get('filename').setValidators([Validators.required]);
        this.etlForm.get('filename').updateValueAndValidity();
        this.etlForm.get('filename').markAsTouched();
      } else {
        this.etlForm.patchValue({filename: this.file.name});
        this.etlForm.get('file').updateValueAndValidity();
      }
    }
  }

  clearSelectedFile(): void {
    this.etlForm.patchValue({filename: ''});
    this.etlForm.patchValue({file: ''});
    this.etlForm.markAsUntouched();
  }

  uploadFile(): void {
    this.etlService.uploadMappingFile(this.file)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(
        response => {
          this.notificationService.showNotification('Done! The process complete successfully!', 'success');
        }, error => {
          this.notificationService.showNotification('Oops! Something went wrong during processing the request!', 'error');
        });
    this.clearSelectedFile();
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
