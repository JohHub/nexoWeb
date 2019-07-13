import {TighteningStep} from './tightening-step';

export class TighteningProcess {
  public nr: number;
  public result: string;
  public channel: string;
  public cycle: number;
  public date: string;
  public mcefactor: number;
  public prgNr: number;
  public prgName: string;
  public prgDate: string;
  public nominalTorque: number;
  public idCode: string;
  public torqueUnit: string;
  public lastCmd: string;
  public qualityCode: string;
  public totalTime?: any;
  public toolSerial: string;
  public reworkCode: number;
  public reworkText: string;
  public cellId: string;
  public jobNr: number;
  public MCEFactor: number;
  public batchNr: string;
  public batchDanceled: number;
  public batchDirectionOK: number;
  public batchDirectionNOK: number;
  public batchMaxOK: number;
  public batchMaxNOK: number;
  public batchOK: number;
  public batchNOK: number;
  public tighteningSteps: TighteningStep[];

  constructor(data) {
    Object.assign(this, data);
    this.tighteningSteps = [];
    for(let _i = 0; _i < data['tightening steps'].length; _i++) {
      this.tighteningSteps[_i] = new TighteningStep(data['tightening steps'][_i]);
    }
  }
}
