import {Component, OnInit, ViewChild} from '@angular/core';
import {NexoService} from '../nexo.service';
import {BaseChartDirective, Color, Label} from 'ng2-charts';
import {ChartOptions} from 'chart.js';

@Component({
  selector: 'app-linechart',
  templateUrl: './linechart.component.html',
  styleUrls: ['./linechart.component.css']
})
export class LinechartComponent implements OnInit {

  public lineChartData = [
    {data: [], label: 'Angle Values', yAxisID: 'A'},
    {data: [], label: 'Torque Values', yAxisID: 'B'}
  ];
  public lineChartLabels: number[] = [];
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [
        {
          id: 'A',
          position: 'left',
        },
        {
          id: 'B',
          position: 'right',
          gridLines: {
            color: 'rgba(255,0,0,.3)',
          },
          ticks: {
            fontColor: 'red',
          }
        }
      ]
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-number,',
          value: 'March',
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'LineAnno'
          }
        },
      ],
    },
  };

  public lineChartColors: Color[] = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0,.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0,.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0,.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // red
      backgroundColor: 'rgba(255,0,0,.3)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,number,.8)'
    }
  ];

  public lineChartLegend = true;
  public lineChartType = 'line';

  @ViewChild(BaseChartDirective, {static: true}) chart: BaseChartDirective;


  constructor(private nexoService: NexoService) {
  }

  public tiProcess: TighteningProcess;

  ngOnInit() {
    this.nexoService.getData()
      .subscribe(data => {
        this.tiProcess = new TighteningProcess(data);
        this.lineChartLabels = this.tiProcess.tighteningSteps[0].graph.timeValues;
        this.lineChartData[0].data = this.tiProcess.tighteningSteps[0].graph.angleValues;
        this.lineChartData[1].data = this.tiProcess.tighteningSteps[0].graph.torqueValues;
      });
  }
}

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

export class TighteningFunction {
  name: string;
  nom: number;
  act: number;

  constructor(data) {
    Object.assign(this, data);
  }
}

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
    for (var _i = 0; _i<data['tightening functions'].length; _i++) {
      this.tighteningFunctions[_i] = data['tightening functions'][_i];
    }
    this.graph = new Graph(data['graph']);
  }
}

export class TighteningProcess {
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

  constructor(data) {
    Object.assign(this, data);
    this.tighteningSteps = [];
    for(var _i = 0; _i<data['tightening steps'].length; _i++) {
      this.tighteningSteps[_i] = new TighteningStep(data['tightening steps'][_i]);
    }
  }

}



