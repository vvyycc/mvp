import {Component, OnInit} from '@angular/core';
import {LangModel} from './core/models';
import {Observable} from 'rxjs';
import {StorageMap} from '@ngx-pwa/local-storage';
import {TranslateService} from '@ngx-translate/core';
import {TranslateConfigService} from './core/service/translate-config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'mvp-front-app';
  lang$: Observable<LangModel>;

  constructor(private translate: TranslateService,
              private translateService: TranslateConfigService,
              private storage: StorageMap) {
    this.lang$ = this.storage.get<LangModel>('lang', this.translateService.getLangSchema());
  }

  ngOnInit(): void {
    this.lang$.subscribe(lang => this.translate.use(lang.title));
  }
}
