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
  public totalTime: number;
  public toolSerial: string;
  public reworkCode: number;
  public reworkText: string;
  public cellId: string;
  public jobNr: number;
  public MCEFactor: number;
  public batchNr: string;
  public batchCanceled: number;
  public batchDirectionOK: number;
  public batchDirectionNOK: number;
  public batchMaxOK: number;
  public batchMaxNOK: number;
  public batchOK: number;
  public batchNOK: number;
  public tighteningSteps: TighteningStep[];

  constructor(data) {
    Object.assign(this, {...data});
    this.prgNr = data['prg nr'];
    this.prgName = data['prg name'];
    this.prgDate = data['prg date'];
    this.nominalTorque = data['nominal torque'];
    this.idCode = data['id code'];
    this.torqueUnit = data['torque unit'];
    this.lastCmd = data['last cmd'];
    this.qualityCode = data['quality code'];
    this.totalTime = data['total time'];
    this.toolSerial = data['tool serial'];
    this.reworkCode = data['rework code'];
    this.reworkText = data['rework text'];
    this.cellId = data['cell id'];
    this.jobNr = data['job nr'];
    this.mcefactor = data['mce factor'];
    this.batchNr = data['batch nr'];
    this.batchCanceled = data['batch cancelled'];
    this.batchDirectionOK = data['batch direction ok'];
    this.batchDirectionNOK = data['batch direction nok'];
    this.batchMaxOK = data['batch max ok'];
    this.batchMaxNOK = data['batch max nok'];
    this.batchOK = data['batch ok'];
    this.batchNOK = data['batch nok'];
    this.tighteningSteps = [];
    for (let i = 0; i < data['tightening steps'].length; i++) {
      this.tighteningSteps[i] = new TighteningStep(data['tightening steps'][i]);
    }
  }
}
