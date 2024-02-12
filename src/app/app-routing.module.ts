import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuard} from './guards/auth.guard';

const routes: Routes = [
  {path: '', redirectTo: '/', pathMatch: 'full'},
  {
    path: 'adjustment',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/adjustment/adjustment.module').then(m => m.AdjustmentModule)
  },
  {
    path: 'aggregator',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/aggregator/aggregator.module').then(m => m.AggregatorModule)
  },
  {
    path: 'etl',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/etl/etl.module').then(m => m.EtlModule)
  },
  {
    path: 'segmenter',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/segmenter/segmenter.module').then(m => m.SegmenterModule)
  },
  {
    path: 'management',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
