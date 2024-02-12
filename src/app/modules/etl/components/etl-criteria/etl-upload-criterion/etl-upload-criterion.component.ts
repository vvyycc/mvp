import {Component, ElementRef, EventEmitter, Inject, OnInit, Output, ViewChild} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NotificationService} from '../../../../../core/service/notification.service';
import {EtlCriterion} from '../../../model/etl-criterion';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {EtlService} from '../../../service/etl.service';
import {FileValidator} from '../../../../../core/validators/file-validator';

@Component({
  selector: 'app-etl-upload-criterion',
  templateUrl: './etl-upload-criterion.component.html',
  styleUrls: ['./etl-upload-criterion.component.css']
})
export class EtlUploadCriterionComponent implements OnInit {
  criterion: EtlCriterion;
  public types: string[] = ['INPUT', 'OUTPUT'];
  form: FormGroup;
  fileI: File;
  fileO: File;

  @Output() emitter = new EventEmitter();
  @ViewChild('fileInput') fileInput: ElementRef;
  @ViewChild('fileOutput') fileOutput: ElementRef;

  constructor(private fb: FormBuilder,
              private readonly notifier: NotificationService,
              private readonly etlService: EtlService,
              @Inject(MAT_DIALOG_DATA) public data: EtlCriterion) {
    this.criterion = data;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      filenameI: [''],
      fileInput: ['', Validators.required],
      filenameO: [''],
      fileOutput: ['', Validators.required]
    });
  }

  get f(): { [p: string]: AbstractControl } {
    return this.form.controls;
  }

  onFileInput(files: FileList | null): void {
    if (files) {
      this.fileI = files.item(0);
      if (!FileValidator.isValidExcelMimetype(this.fileI)) {
        this.form.reset();
        this.form.get('filenameI').setValidators([Validators.required]);
        this.form.get('filenameI').updateValueAndValidity();
        this.form.get('filenameI').markAsTouched();
      } else {
        this.form.patchValue({filenameI: this.fileI.name});
        this.form.get('fileInput').updateValueAndValidity();
      }
    }
  }

  onFileOutput(files: FileList | null): void {
    if (files) {
      this.fileO = files.item(0);
      if (!FileValidator.isValidExcelMimetype(this.fileO)) {
        this.form.reset();
        this.form.get('filenameO').setValidators([Validators.required]);
        this.form.get('filenameO').updateValueAndValidity();
        this.form.get('filenameO').markAsTouched();
      } else {
        this.form.patchValue({filenameO: this.fileO.name});
        this.form.get('fileOutput').updateValueAndValidity();
      }
    }
  }

  uploadFile(): void {}
}
