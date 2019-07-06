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
    { data: [], label: 'Angle Values', yAxisID: 'A' },
    { data: [], label: 'Torque Values', yAxisID: 'B'}
  ];
  public lineChartLabels: Label[] = [];
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

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;


  constructor(private nexoService: NexoService) { }

  public graph;

  ngOnInit() {
    this.getData();
  }

  private getData() {
    this.nexoService.getData()
      .subscribe(data => {
        this.graph = new Graph(data['angle values'], data['torque values'], data['time values']);
        this.lineChartData[0].data = this.graph.angleValues;
        this.lineChartData[1].data = this.graph.torqueValues;
        this.lineChartLabels = this.graph.timeValues;
      });
  }


}

export class Graph {
  angleValues: number[];
  torqueValues: number[];
  timeValues: number[];


  constructor(angleValues: number[], torqueValues: number[], timeValues: number[]) {
    this.angleValues = angleValues;
    this.torqueValues = torqueValues;
    this.timeValues = timeValues;
  }
}


