import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {SharedModule} from '../../shared/shared.module';
import {LangMenuComponent} from './header/lang-menu/lang-menu.component';
import {NavMenuComponent} from './header/nav-menu/nav-menu.component';
import {TopMenuComponent} from './header/top-menu/top-menu.component';
import {AppRoutingModule} from 'src/app/app-routing.module';
import {ProgressBarComponent} from './progress-bar/progress-bar.component';
import {NotificationComponent} from './notification/notification.component';
import {ConfirmationModalComponent} from './confirmation-modal/confirmation-modal.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    LangMenuComponent,
    NavMenuComponent,
    TopMenuComponent,
    ProgressBarComponent,
    NotificationComponent,
    ConfirmationModalComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent
  ]
})
export class CoreModule {
}
