import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Observable} from 'rxjs';
import {TranslateConfigService} from '../../../service/translate-config.service';
import {LangModel} from '../../../models';
import {TranslateService} from '@ngx-translate/core';
import {StorageMap} from '@ngx-pwa/local-storage';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss']
})
export class TopMenuComponent implements OnInit {
  languages: Array<LangModel>;
  lang$: Observable<LangModel>;

  @Input() isHandset$: Observable<boolean>;
  @Output() drawer: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private translator: TranslateService,
              private translateService: TranslateConfigService,
              private storage: StorageMap) {
    this.languages = this.translateService.getLanguages();
    this.lang$ = this.storage.get<LangModel>('lang', this.translateService.getLangSchema());
  }

  ngOnInit(): void {
    this.lang$.subscribe(lang => {
      this.translator.use(lang.title);
    });
  }

  languageChangeHandler(langToSet: LangModel): void {
    this.translateService.use(langToSet);
    console.log(langToSet);
  }

  changeToggle(): void {
    this.drawer.emit();
  }
}
