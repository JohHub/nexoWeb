export class Graph {
  angleValues: number[];
  torqueValues: number[];
  timeValues: number[];

  constructor(data) {
    this.angleValues = data['angle values'];
    this.torqueValues = data['torque values'];
    this.timeValues = data['time values'];
  }
}
