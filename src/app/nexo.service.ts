import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

const BASE_URL = 'http://localhost:8080/nexo?index=';

@Injectable({
  providedIn: 'root'
})
export class NexoService {
  constructor(private http: HttpClient) { }

  getLastData() {
    return this.http.get('http://localhost:8080/nexoLast');
  }

  getData(index) {
    const url = BASE_URL.concat(index);
    return this.http.get(url);
  }
}
