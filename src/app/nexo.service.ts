import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TighteningProcess} from './Entities/tightening-process';

const BASE_URL = 'http://localhost:8080/nexo?index=';

@Injectable({
  providedIn: 'root'
})
export class NexoService {

  public processes: TighteningProcess[] = [];

  constructor(private http: HttpClient) {
  }

  getLastData() {
    return this.http.get('http://localhost:8080/nexoLast');
  }

  getData(index) {
    const url = BASE_URL.concat(index);
    return this.http.get(url);
  }

  addData(t: TighteningProcess) {
    this.processes.push(t);
  }

  getByIdCode(idCode: string) {
    return this.http.get('http://localhost:8080/nexo/'.concat(idCode));
  }
}
