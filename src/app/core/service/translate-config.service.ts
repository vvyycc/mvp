import {Injectable, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {LangModel} from '../models';
import {Observable} from 'rxjs';
import {StorageMap, JSONSchema} from '@ngx-pwa/local-storage';
import languages from '../../../assets/i18n/lang-options.json';
import {map} from 'rxjs/operators';

const schema: JSONSchema = {
  type: 'object',
  properties: {
    title: {type: 'string'},
    alias: {type: 'string'}
  }
};

@Injectable({
  providedIn: 'root'
})
export class TranslateConfigService implements OnInit {
  lang$: Observable<LangModel>;
  private defaultLanguage: LangModel;

  constructor(private translate: TranslateService,
              private storage: StorageMap) {
    this.translate.addLangs(languages.map((lang: LangModel) => lang.title));
    this.defaultLanguage = languages.find(lang => lang.title === 'es') || {title: 'ES', alias: 'es'};
    this.translate.setDefaultLang(this.defaultLanguage.title);
    this.storage.set('lang', this.defaultLanguage, schema).subscribe();
    this.lang$ = this.storage.watch<LangModel>('lang', schema);
  }

  ngOnInit(): void {
    this.storage.watch<LangModel>('lang', schema)
      .subscribe(lang => {
        this.defaultLanguage = lang;
        this.translate.use(lang.title);
      });
  }

  setDefault(lang: string): void {
    this.translate.setDefaultLang(languages.find(l => l.title === lang).title || 'es');
  }

  getLang(): LangModel {
    return this.defaultLanguage;
  }

  use(langToset: LangModel): Promise<LangModel> {
    return new Promise<LangModel>((resolve, reject) => {
      this.storage.set('lang', langToset, schema).subscribe();
      this.storage.get<LangModel>('lang', schema)
        .pipe(
          map((lang: LangModel) => {
            this.translate.use(lang.title);
            this.defaultLanguage = lang;
          })
        )
        .subscribe();
    });
  }

  getLangSchema(): JSONSchema {
    return schema;
  }

  getLanguages(): Array<LangModel> {
    return languages;
  }
}
