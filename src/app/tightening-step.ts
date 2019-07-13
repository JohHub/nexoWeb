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
    this.tighteningFunctions = [];
    for (let _i = 0; _i <data['tightening functions'].length; _i++) {
      this.tighteningFunctions[_i] = data['tightening functions'][_i];
    }
    this.graph = new Graph(data['graph']);
  }
}
