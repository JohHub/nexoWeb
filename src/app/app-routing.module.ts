import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MultiviewComponent} from './multiview/multiview.component';
import {LinechartComponent} from './linechart/linechart.component';
import {DetailviewComponent} from './detailview/detailview.component';

const routes: Routes = [
  {path: 'multi', component: MultiviewComponent},
  {path: 'process/:idCode', component: DetailviewComponent},
  {path: '**', component: LinechartComponent}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
