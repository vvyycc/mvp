import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { TranslateConfigService } from '../core/service/translate-config.service';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    TranslateModule,
    HttpClientModule,
    FormsModule
  ],
  exports: [
    CommonModule,
    MaterialModule,
    TranslateModule,
    HttpClientModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    FormsModule,
    InfiniteScrollModule
  ],
  providers: [
    TranslateService,
    TranslateConfigService
  ]
})
export class SharedModule { }
