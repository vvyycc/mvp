import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdjustmentComponent} from './adjustment.component';
import {AdjustmentHomeComponent} from './components/adjustment-home/adjustment-home.component';
import {AdjustmentFilemgmtComponent} from './components/adjustment-filemgmt/adjustment-filemgmt.component';
import {AdjustmentAdjmgmtComponent} from './components/adjustment-adjmgmt/adjustment-adjmgmt.component';

const routes: Routes = [
  {
    path: '',
    component: AdjustmentComponent,
    children: [
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {path: 'home', component: AdjustmentHomeComponent},
      {path: 'file-mgmt', component: AdjustmentFilemgmtComponent},
      {path: 'adj-mgmt', component: AdjustmentAdjmgmtComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdjustmentRoutingModule { }
