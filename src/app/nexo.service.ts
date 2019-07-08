import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {withIdentifier} from 'codelyzer/util/astQuery';

@Injectable({
  providedIn: 'root'
})
export class NexoService {

  constructor(private http: HttpClient) { }

  private tempGraph;
  private tempTiFunction;
  private tempTiStep;
  public tiProcess: TighteningProcess;

  getData() {
    return this.http.get<TighteningProcess>('http://localhost:8080/nexoLast');
  }
}

export interface Graph {
  angleValues: number[];
  torqueValues: number[];
  timeValues: number[];
}

export interface TighteningFunction {
  name: string;
  nom: number;
  act: number;
}

export interface TighteningStep {
  result: string;
  name: string;
  row: string;
  column: string;
  category: number;
  torque: number;
  angle: number;
  duration: number;
  speed: number;
  graph: Graph;
  stepType: string;
  lastCmd: string;
  qualityCode: string;
  angleThresholdNom: number;
  angleThresholdAct: number;
  tighteningFunctions: TighteningFunction[];
}

export interface TighteningProcess {
  nr: number;
  result: string;
  channel: string;
  cycle: number;
  date: string;
  mcefactor: number;
  prgNr: number;
  prgName: string;
  prgDate: string;
  nominalTorque: number;
  idCode: string;
  torqueUnit: string;
  lastCmd: string;
  qualityCode: string;
  totalTime?: any;
  toolSerial: string;
  reworkCode: number;
  reworkText: string;
  cellId: string;
  jobNr: number;
  MCEFactor: number;
  batchNr: string;
  batchDanceled: number;
  batchDirectionOK: number;
  batchDirectionNOK: number;
  batchMaxOK: number;
  batchMaxNOK: number;
  batchOK: number;
  batchNOK: number;
  tighteningSteps: TighteningStep[];
}



