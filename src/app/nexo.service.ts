import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Graph} from './linechart/linechart.component';

@Injectable({
  providedIn: 'root'
})
export class NexoService {

  constructor(private http: HttpClient) { }

  getData() {
    return this.http.get('http://localhost:8080/nexoGraph');
  }
}


