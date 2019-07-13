import {Component, OnInit, ViewChild} from '@angular/core';
import {NexoService} from '../nexo.service';
import {BaseChartDirective, Color, Label} from 'ng2-charts';
import {ChartOptions} from 'chart.js';
import {TighteningProcess} from '../tightening-process';
import {Graph} from '../graph';
import {TighteningFunction} from '../tightening-function';
import {TighteningStep} from '../tightening-step';

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
          },
        },
      ],
    },
  };
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







