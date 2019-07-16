import {Component, ElementRef, OnInit, QueryList, Renderer2, ViewChild, ViewChildren} from '@angular/core';
import {NexoService} from '../nexo.service';
import {BaseChartDirective, Color, Label} from 'ng2-charts';
import {ChartData, ChartDataSets, ChartOptions} from 'chart.js';
import {TighteningProcess} from '../tightening-process';
import {Graph} from '../graph';
import {TighteningFunction} from '../tightening-function';
import {TighteningStep} from '../tightening-step';
import {error} from 'selenium-webdriver';
import {MyChartData} from '../chart-data';

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
  public lineChartData0 = [
    {data: [0,2], label: 'Angle Values', yAxisID: 'A'},
    {data: [0,3], label: 'Torque Values', yAxisID: 'B'}
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


  @ViewChild(BaseChartDirective, {static: false}) chart: BaseChartDirective;
  @ViewChild('chart', {static:false}) chart1: ElementRef;
  @ViewChildren(BaseChartDirective) c: QueryList<any>;


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

  ngAfterViewInit() {
    //this.chart.chart.data.datasets[0].data = this.tiProcess.tighteningSteps[1].graph.angleValues;
    //this.chart.chart.update();

    let d: BaseChartDirective[] = this.c.toArray();

    //TODO check for other working ways to copy reference, arraycopy etc
    //TODO Delete not working/unecessary attempts/lines of code

    console.log(d[0].chart.data.datasets);
    console.log(this.lineChartData);
    var temp = [];
    temp[0] = {...this.lineChartData[0]};
    temp[1] = {...this.lineChartData[1]};
    console.log(temp);
    d[0].chart.data.datasets = temp;
    console.log(d[0].chart.data.datasets);
    d[0].chart.update();


    for(let i = 0; i<this.tiProcess.tighteningSteps.length; i++) {
      d[i].chart.data.datasets[0].data = this.tiProcess.tighteningSteps[i].graph.angleValues;
      d[i].chart.data.datasets[1].data = this.tiProcess.tighteningSteps[i].graph.torqueValues;
      d[i].chart.data.labels = this.tiProcess.tighteningSteps[i].graph.timeValues;
      d[i].chart.update();
    }
  }

}

/*
    d.chart.data.datasets = this.lineChartData0;
    d.chart.update();
    console.log(d);
 */

/* Falls Chartupdate nicht funktioniert:
    //d.datasets = this.lineChartData0;
    //d.data[0] = this.lineChartData0[0].data;
    //d.data[1] = this.lineChartData0[1].data;
 */







