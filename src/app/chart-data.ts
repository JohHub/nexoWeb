export class MyChartData {

  lineChartData: MyChartDataSet[];

  constructor() {
    this.lineChartData = [];
    this.lineChartData[0] = new MyChartDataSet('angleValues', 'A');
    this.lineChartData[1] = new MyChartDataSet('torqueValues', 'B');
  }
}

export class MyChartDataSet {
  data: number[];
  label: string;
  yAxisId: string;


  constructor(label: string, yAxisId: string) {
    this.data = [];
    this.label = label;
    this.yAxisId = yAxisId;
  }
}
