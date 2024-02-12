import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {StorageMap} from '@ngx-pwa/local-storage';
import {TranslateService} from '@ngx-translate/core';
import {Observable, Subscription} from 'rxjs';
import {LangModel} from 'src/app/core/models';
import {TranslateConfigService} from 'src/app/core/service/translate-config.service';

@Component({
  selector: 'app-etl',
  templateUrl: './etl.component.html',
  styleUrls: ['./etl.component.scss']
})
export class EtlComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  lang$: Observable<LangModel>;
  links = [
    {
      link: 'home',
      label: 'etl.home.label'
    },
    {
      link: 'mappings',
      label: 'etl.mappings.label'
    },
    {
      link: 'criteria',
      label: 'etl.criteria.label'
    }
  ];
  activeLinkIndex = -1;

  constructor(private translate: TranslateService,
              private translateService: TranslateConfigService,
              private storage: StorageMap,
              private router: Router) {
    this.lang$ = this.storage.watch<LangModel>('lang', this.translateService.getLangSchema());
  }

  ngOnInit(): void {
    this.subscription = this.lang$.subscribe(lang => {
      this.translate.setDefaultLang(lang.title);
    });
    this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.links.indexOf(this.links.find(tab => tab.link === '.' + this.router.url));
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
