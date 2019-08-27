/* tslint:disable:no-string-literal */
import {TighteningStep} from './tightening-step';

export class TighteningProcess {
  public nr: number;
  public result: string;
  public channel: string;
  public cycle: number;
  public date: string;
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
    this.nr = data['nr'];
    this.result = data['result'];
    this.channel = data['channel'];
    this.cycle = data['cycle'];
    this.date = data['date'];
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
    this.MCEFactor = data['MCE factor'];
    this.batchNr = data['batch nr'];
    this.batchCanceled = data['batch canceled'];
    this.batchDirectionOK = data['batch direction OK'];
    this.batchDirectionNOK = data['batch direction NOK'];
    this.batchMaxOK = data['batch max OK'];
    this.batchMaxNOK = data['batch max NOK'];
    this.batchOK = data['batch OK'];
    this.batchNOK = data['batch NOK'];
    this.tighteningSteps = [];
    for (let i = 0; i < data['tightening steps'].length; i++) {
      this.tighteningSteps[i] = new TighteningStep(data['tightening steps'][i]);
    }
  }
}
