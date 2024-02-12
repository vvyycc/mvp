import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AggregatorMgmtComponent} from './components/aggregator-mgmt/aggregator-mgmt.component';
import {AggregatorComponent} from './aggregator.component';
import {AggregatorHomeComponent} from './components/aggregator-home/aggregator-home.component';

const routes: Routes = [
  {
    path: '',
    component: AggregatorComponent,
    children: [
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {path: 'home', component: AggregatorHomeComponent},
      {path: 'management', component: AggregatorMgmtComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AggregatorRoutingModule {
}
