import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SegmenterComponent} from './segmenter.component';
import {SegmenterHomeComponent} from './components/segmenter-home/segmenter-home.component';
import {SegmenterHomeDetailComponent} from './components/segmenter-home/segmenter-home-detail/segmenter-home-detail.component';
import {SegmenterMgmtComponent} from './components/segmenter-mgmt/segmenter-mgmt.component';
import {
  SegmenterMgmtEditCriterionComponent
} from './components/segmenter-mgmt/segmenter-mgmt-edit-criterion/segmenter-mgmt-edit-criterion.component';

const routes: Routes = [
  {
    path: '',
    component: SegmenterComponent,
    children: [
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {path: 'home', component: SegmenterHomeComponent},
      {path: 'home/:id', component: SegmenterHomeDetailComponent},
      {path: 'management', component: SegmenterMgmtComponent},
      {path: 'management/:name/edit', component: SegmenterMgmtEditCriterionComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SegmenterRoutingModule {
}
