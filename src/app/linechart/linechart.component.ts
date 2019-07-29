import {AfterViewInit, Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {NexoService} from '../nexo.service';
import {BaseChartDirective} from 'ng2-charts';
import {ChartOptions} from 'chart.js';
import {TighteningProcess} from '../Entities/tightening-process';

@Component({
  selector: 'app-linechart',
  templateUrl: './linechart.component.html',
  styleUrls: ['./linechart.component.css']
})
export class LinechartComponent implements OnInit, AfterViewInit {

  public lineChartData = [
    {data: [], label: 'Angle Values', yAxisID: 'A'},
    {data: [], label: 'Torque Values', yAxisID: 'B'}
  ];
  public lineChartLabels: number[] = [];
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    elements: {
      point: {
        radius: 0
      }
    },
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{
        ticks: {
          maxTicksLimit: 20,
        }
      }],
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

  @ViewChildren(BaseChartDirective) c: QueryList<any>;


  constructor(private nexoService: NexoService) {
  }

  public tiProcess: TighteningProcess;


  ngOnInit() {
    this.nexoService.getLastData()
      .subscribe(data => {
        this.tiProcess = new TighteningProcess(data);
      });
  }

  ngAfterViewInit() {
    const d: BaseChartDirective[] = this.c.toArray();

    // TODO Access to String Values better

    const lineChartDatas = [];

    for (let i = 0; i < this.tiProcess.tighteningSteps.length; i++) {

      lineChartDatas[i] = [];
      lineChartDatas[i][0] = {...this.lineChartData[0]};
      lineChartDatas[i][1] = {...this.lineChartData[1]};
      d[i].chart.data.datasets = lineChartDatas[i];
      d[i].chart.update();

      d[i].chart.data.datasets[0].data = this.tiProcess.tighteningSteps[i].graph.angleValues;
      d[i].chart.data.datasets[1].data = this.tiProcess.tighteningSteps[i].graph.torqueValues;
      // @ts-ignore
      d[i].chart.data.labels = this.tiProcess.tighteningSteps[i].graph.timeValues;
      d[i].chart.update();
    }
  }
}



