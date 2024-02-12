import {Component, ElementRef, EventEmitter, Inject, OnInit, Output, ViewChild} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AggregateCriteria} from '../../../model/aggregate-criteria';
import {NotificationService} from '../../../../../core/service/notification.service';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {AggregatorService} from '../../../service/aggregator.service';
import {FileValidator} from '../../../../../core/validators/file-validator';

@Component({
  selector: 'app-aggregator-mgmt-upload-criterion',
  templateUrl: './aggregator-mgmt-upload-criterion.component.html',
  styleUrls: ['./aggregator-mgmt-upload-criterion.component.css']
})
export class AggregatorMgmtUploadCriterionComponent implements OnInit {
  criterion: AggregateCriteria;

  @Output() emitter = new EventEmitter();
  @ViewChild('fileInput') fileInput: ElementRef;
  form: FormGroup;
  file: File;

  constructor(private fb: FormBuilder,
              private readonly aggService: AggregatorService,
              private readonly notifier: NotificationService,
              @Inject(MAT_DIALOG_DATA) public data: AggregateCriteria) {
    this.criterion = data;
  }

  get f(): { [p: string]: AbstractControl } {
    return this.form.controls;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      filename: [''],
      file: ['', Validators.required]
    });
  }

  onFileInput(files: FileList | null): void {
    if (files) {
      this.file = files.item(0);
      if (!FileValidator.isValidExcelMimetype(this.file)) {
        this.form.reset();
        this.form.get('filename').setValidators([Validators.required]);
        this.form.get('filename').updateValueAndValidity();
        this.form.get('filename').markAsTouched();
      } else {
        this.form.patchValue({filename: this.file.name});
        this.form.get('file').updateValueAndValidity();
      }
    }
  }

  clearSelectedFile(): void {
    this.form.patchValue({filename: ''});
    this.form.patchValue({file: ''});
    this.form.markAsUntouched();
  }

  uploadFile(): void {
    this.aggService.uploadAggregations(this.criterion.id, this.file)
      .subscribe(response => {
        if (response) {
          this.emitter.emit(response);
          this.notifier.showNotification('Aggregations file have been upload successfully', 'success');
        }
      });
    this.clearSelectedFile();
  }
}
