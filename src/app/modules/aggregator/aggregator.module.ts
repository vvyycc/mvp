import {NgModule} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {AggregatorHomeComponent} from './components/aggregator-home/aggregator-home.component';
import {SharedModule} from 'src/app/shared/shared.module';
import {AggregatorRoutingModule} from './aggregator-routing.module';
import {TranslateConfigService} from 'src/app/core/service/translate-config.service';
import {AggregatorMgmtComponent} from './components/aggregator-mgmt/aggregator-mgmt.component';
import {AggregatorComponent} from './aggregator.component';
import {AggregatorHomeExecuteComponent} from './components/aggregator-home/aggregator-home-execute/aggregator-home-execute.component';
import {
  AggregatorMgmtNewCriterionComponent
} from './components/aggregator-mgmt/aggregator-mgmt-new-criterion/aggregator-mgmt-new-criterion.component';
import { AggregatorMgmtUploadCriterionComponent } from './components/aggregator-mgmt/aggregator-mgmt-upload-criterion/aggregator-mgmt-upload-criterion.component';

export function createTranslateLoader(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/aggregator/', '.json');
}

@NgModule({
  declarations: [
    AggregatorComponent,
    AggregatorHomeComponent,
    AggregatorMgmtComponent,
    AggregatorHomeExecuteComponent,
    AggregatorMgmtNewCriterionComponent,
    AggregatorMgmtUploadCriterionComponent
  ],
  imports: [
    SharedModule,
    AggregatorRoutingModule,
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
export class AggregatorModule {
}
