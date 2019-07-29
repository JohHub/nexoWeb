import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {ChartsModule} from 'ng2-charts';
import {AppComponent} from './app.component';
import {LinechartComponent} from './linechart/linechart.component';
import {RouterModule, Routes} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {NexoService} from './nexo.service';
import {MultiviewComponent} from './multiview/multiview.component';
import {MatButtonModule, MatSnackBarModule, MatTableModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

const routes: Routes = [
  {path: 'multi', component: MultiviewComponent},
  {path: '**', component: LinechartComponent }
];
@NgModule({
  declarations: [
    AppComponent,
    LinechartComponent,
    MultiviewComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    ChartsModule,
    HttpClientModule,
    MatTableModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  providers: [NexoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
