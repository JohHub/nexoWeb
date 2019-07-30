import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {ChartsModule} from 'ng2-charts';
import {AppComponent} from './app.component';
import {LinechartComponent} from './linechart/linechart.component';
import {HttpClientModule} from '@angular/common/http';
import {NexoService} from './nexo.service';
import {MultiviewComponent} from './multiview/multiview.component';
import {MatButtonModule, MatSnackBarModule, MatTableModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DetailviewComponent} from './detailview/detailview.component';

import {routing} from './app-routing.module';


@NgModule({
  declarations: [
    AppComponent,
    LinechartComponent,
    MultiviewComponent,
    DetailviewComponent,
  ],
  imports: [
    BrowserModule,
    routing,
    ChartsModule,
    HttpClientModule,
    MatTableModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
  providers: [NexoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
