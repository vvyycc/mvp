import {Component, ElementRef, EventEmitter, Inject, OnInit, Output, ViewChild} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SegmenterService} from '../../../service/segmenter.service';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Criteria} from '../../../../../shared/model/criteria';
import {NotificationService} from '../../../../../core/service/notification.service';
import {saveAs} from 'file-saver';
import {FileValidator} from '../../../../../core/validators/file-validator';

@Component({
  selector: 'app-segmenter-mgmt-upload-criterion',
  templateUrl: './segmenter-mgmt-upload-criterion.component.html',
  styleUrls: ['./segmenter-mgmt-upload-criterion.component.css']
})
export class SegmenterMgmtUploadCriterionComponent implements OnInit {
  isChecked = false;
  criterion: Criteria;

  constructor(private fb: FormBuilder,
              private readonly segService: SegmenterService,
              private readonly notifier: NotificationService,
              @Inject(MAT_DIALOG_DATA) public data: Criteria) {
    this.criterion = data;
  }

  get f(): { [p: string]: AbstractControl } {
    return this.uploadForm.controls;
  }

  @Output() uploadEmitter = new EventEmitter();
  @ViewChild('fileInput') fileInput: ElementRef;
  uploadForm: FormGroup;
  file: File;

  ngOnInit(): void {
    this.uploadForm = this.fb.group({
      filename: [''],
      file: ['', Validators.required],
      automatic: ['']
    });
  }

  onFileInput(files: FileList | null): void {
    if (files) {
      this.file = files.item(0);
      if (!FileValidator.isValidExcelMimetype(this.file)) {
        this.uploadForm.reset();
        this.uploadForm.get('filename').setValidators([Validators.required]);
        this.uploadForm.get('filename').updateValueAndValidity();
        this.uploadForm.get('filename').markAsTouched();
      } else {
        this.uploadForm.patchValue({filename: this.file.name});
        this.uploadForm.get('file').updateValueAndValidity();
      }
    }
  }

  clearSelectedFile(): void {
    this.uploadForm.patchValue({filename: ''});
    this.uploadForm.patchValue({file: ''});
    this.uploadForm.markAsUntouched();
  }

  uploadFile(): void {
    this.segService.uploadCriterionConditions(this.criterion.nombre, this.isChecked, this.file)
      .subscribe(response => {
        if (response) {
          this.uploadEmitter.emit(response);
          this.notifier.showNotification('Criterion conditions file have been upload successfully', 'success');
        }
      }, (error) => {
        const content = error.headers.get('Content-Disposition');
        const filename: string = content.split(';')[1].trim().split('=')[1].replace(/"/g, '');
        const contentType: string = error.headers.get('Content-Type');
        const blobPart: BlobPart = error.error;
        const blob = new Blob([blobPart], {type: `${contentType}`});
        saveAs(blob, filename);
      });
    this.clearSelectedFile();
  }
}
