import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EtlCriteriaComponent} from './components/etl-criteria/etl-criteria.component';
import {EtlHomeComponent} from './components/etl-home/etl-home.component';
import {EtlMappingsComponent} from './components/etl-mappings/etl-mappings.component';
import {EtlComponent} from './etl.component';

const routes: Routes = [
  {
    path: '',
    component: EtlComponent,
    children: [
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {path: 'home', component: EtlHomeComponent},
      {path: 'mappings', component: EtlMappingsComponent},
      {path: 'criteria', component: EtlCriteriaComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EtlRoutingModule {
}
