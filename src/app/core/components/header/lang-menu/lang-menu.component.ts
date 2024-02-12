import { Component, Input } from '@angular/core';
import { LangModel } from 'src/app/core/models/lang.model';
import { TranslateConfigService } from 'src/app/core/service/translate-config.service';

@Component({
  selector: 'app-lang-menu',
  templateUrl: './lang-menu.component.html',
  styleUrls: ['./lang-menu.component.scss']
})
export class LangMenuComponent {
  language: LangModel;
  @Input() languages: Array<LangModel>;

  constructor(private translateService: TranslateConfigService) {
    this.language = this.translateService.getLang();
  }

  changeLanguage(langToSet: LangModel) {
    this.translateService.use(langToSet);
    this.language = langToSet;
  }

}
