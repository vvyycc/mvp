import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdjustmentRoutingModule } from './adjustment-routing.module';
import { AdjustmentComponent } from './adjustment.component';
import {HttpClient} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {SharedModule} from '../../shared/shared.module';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateConfigService} from '../../core/service/translate-config.service';
import { AdjustmentHomeComponent } from './components/adjustment-home/adjustment-home.component';
import { AdjustmentFilemgmtComponent } from './components/adjustment-filemgmt/adjustment-filemgmt.component';
import { AdjustmentAdjmgmtComponent } from './components/adjustment-adjmgmt/adjustment-adjmgmt.component';

export function createTranslateLoader(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/adjustment/', '.json');
}

@NgModule({
  declarations: [
    AdjustmentComponent,
    AdjustmentHomeComponent,
    AdjustmentFilemgmtComponent,
    AdjustmentAdjmgmtComponent
  ],
  imports: [
    SharedModule,
    AdjustmentRoutingModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      },
      isolate: true
    }),
  ],
  providers: [TranslateConfigService]
})
export class AdjustmentModule { }
