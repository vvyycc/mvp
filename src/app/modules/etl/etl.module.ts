import {NgModule} from '@angular/core';

import {EtlRoutingModule} from './etl-routing.module';
import {EtlComponent} from './etl.component';
import {SharedModule} from 'src/app/shared/shared.module';
import {HttpClient} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateConfigService} from 'src/app/core/service/translate-config.service';
import {EtlHomeComponent} from './components/etl-home/etl-home.component';
import {EtlMappingsComponent} from './components/etl-mappings/etl-mappings.component';
import {EtlCriteriaComponent} from './components/etl-criteria/etl-criteria.component';
import {EtlHomeExecuteComponent} from './components/etl-home/etl-home-execute/etl-home-execute.component';
import {EtlNewCriterionComponent} from './components/etl-criteria/etl-new-criterion/etl-new-criterion.component';
import {EtlUploadCriterionComponent} from './components/etl-criteria/etl-upload-criterion/etl-upload-criterion.component';
import {FileUploadModule} from '../../core/components/file-upload/file-upload.module';

export function createTranslateLoader(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/etl/', '.json');
}

@NgModule({
  declarations: [
    EtlComponent,
    EtlHomeComponent,
    EtlMappingsComponent,
    EtlCriteriaComponent,
    EtlHomeExecuteComponent,
    EtlNewCriterionComponent,
    EtlUploadCriterionComponent
  ],
    imports: [
        SharedModule,
        EtlRoutingModule,
        TranslateModule.forChild(
            {
                loader: {
                    provide: TranslateLoader,
                    useFactory: (createTranslateLoader),
                    deps: [HttpClient]
                },
                isolate: true
            }
        ),
        FileUploadModule
    ],
  providers: [TranslateConfigService]
})
export class EtlModule {
}
