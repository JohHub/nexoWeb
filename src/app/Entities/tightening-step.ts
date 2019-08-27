/* tslint:disable:no-string-literal */
import {Graph} from './graph';
import {TighteningFunction} from './tightening-function';

export class TighteningStep {
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


  constructor(data) {
    Object.assign(this, data);
    this.stepType = data['step type'];
    this.lastCmd = data['last cmd'];
    this.qualityCode = data['quality code'];
    this.angleThresholdNom = data['angle treshold nom'];
    this.angleThresholdAct = data['angle treshold act'];
    this.tighteningFunctions = [];
    for (let i = 0; i < data['tightening functions'].length; i++) {
      this.tighteningFunctions[i] = data['tightening functions'][i];
    }
    this.graph = new Graph(data['graph']);
  }
}
