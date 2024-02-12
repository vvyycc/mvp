import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SegmenterComponent} from './segmenter.component';
import {SegmenterHomeComponent} from './components/segmenter-home/segmenter-home.component';
import {SharedModule} from '../../shared/shared.module';
import {SegmenterRoutingModule} from './segmenter-routing.module';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpClient} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TranslateConfigService} from '../../core/service/translate-config.service';
import { SegmenterHomeDetailComponent } from './components/segmenter-home/segmenter-home-detail/segmenter-home-detail.component';
import { SegmenterHomeExecuteComponent } from './components/segmenter-home/segmenter-home-execute/segmenter-home-execute.component';
import { SegmenterMgmtComponent } from './components/segmenter-mgmt/segmenter-mgmt.component';
import { SegmenterMgmtNewCriterionComponent } from './components/segmenter-mgmt/segmenter-mgmt-new-criterion/segmenter-mgmt-new-criterion.component';
import { SegmenterMgmtUploadCriterionComponent } from './components/segmenter-mgmt/segmenter-mgmt-upload-criterion/segmenter-mgmt-upload-criterion.component';
import { SegmenterMgmtEditCriterionComponent } from './components/segmenter-mgmt/segmenter-mgmt-edit-criterion/segmenter-mgmt-edit-criterion.component';
import { SegmenterMgmtEditCriterionNewValueComponent } from './components/segmenter-mgmt/segmenter-mgmt-edit-criterion/segmenter-mgmt-edit-criterion-new-value/segmenter-mgmt-edit-criterion-new-value.component';
import { SegmenterMgmtEditCriterionEditValueComponent } from './components/segmenter-mgmt/segmenter-mgmt-edit-criterion/segmenter-mgmt-edit-criterion-edit-value/segmenter-mgmt-edit-criterion-edit-value.component';

export function createTranslateLoader(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/segmenter/', '.json');
}

@NgModule({
  declarations: [
    SegmenterComponent,
    SegmenterHomeComponent,
    SegmenterHomeDetailComponent,
    SegmenterHomeExecuteComponent,
    SegmenterMgmtComponent,
    SegmenterMgmtNewCriterionComponent,
    SegmenterMgmtUploadCriterionComponent,
    SegmenterMgmtEditCriterionComponent,
    SegmenterMgmtEditCriterionNewValueComponent,
    SegmenterMgmtEditCriterionEditValueComponent
  ],
  imports: [
    SharedModule,
    SegmenterRoutingModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      },
      isolate: true
    })
  ],
  providers:[TranslateConfigService]
})
export class SegmenterModule {
}
