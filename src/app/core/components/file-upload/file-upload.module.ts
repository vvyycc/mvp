import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressFileUploadComponent } from './progress-file-upload/progress-file-upload.component';
import {MaterialModule} from '../../../shared/material.module';
import { BytesPipe } from './pipes/bytes.pipe';
import { FileUploadInputDirective } from './pipes/file-upload-input.directive';



@NgModule({
  declarations: [
    ProgressFileUploadComponent,
    BytesPipe,
    FileUploadInputDirective
  ],
  exports: [
    ProgressFileUploadComponent,
    FileUploadInputDirective
  ],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class FileUploadModule { }
