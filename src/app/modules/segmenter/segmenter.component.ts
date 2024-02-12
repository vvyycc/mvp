import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {LangModel} from '../../core/models';
import {TranslateService} from '@ngx-translate/core';
import {TranslateConfigService} from '../../core/service/translate-config.service';
import {StorageMap} from '@ngx-pwa/local-storage';
import {Router} from '@angular/router';

@Component({
  selector: 'app-segmentator',
  templateUrl: './segmenter.component.html',
  styleUrls: ['./segmenter.component.css']
})
export class SegmenterComponent implements OnInit, OnDestroy {
  subscriptor: Subscription;
  lang$: Observable<LangModel>;
  links = [
    {
      link: 'home',
      label: 'segmenter.home.label'
    },
    {
      link: 'management',
      label: 'segmenter.mgmt.label'
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
    this.subscriptor = this.lang$.subscribe(lang => {
      this.translate.setDefaultLang(lang.title);
    });
    this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.links.indexOf(this.links.find(tab => tab.link === '.' + this.router.url));
    });
  }

  ngOnDestroy(): void {
    this.subscriptor.unsubscribe();
  }
}
