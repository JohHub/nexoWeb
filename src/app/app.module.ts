import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LinechartComponent } from './linechart/linechart.component';
import { Routes, RouterModule } from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {NexoService} from './nexo.service';


const routes: Routes = [
  {path: '**', component: LinechartComponent }
];
@NgModule({
  declarations: [
    AppComponent,
    LinechartComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    ChartsModule,
    HttpClientModule
  ],
  providers: [NexoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
