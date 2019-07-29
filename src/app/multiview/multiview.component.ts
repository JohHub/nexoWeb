import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {NexoService} from '../nexo.service';
import {TighteningProcess} from '../Entities/tightening-process';
import {MatSnackBar, MatTable} from '@angular/material';
import {animate, state, style, transition, trigger} from '@angular/animations';


export interface DataInterface {
  result: string;
  prgName: string;
  date: string;
  description: string;
}

@Component({
  selector: 'app-multiview',
  templateUrl: './multiview.component.html',
  styleUrls: ['./multiview.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class MultiviewComponent implements OnInit, AfterViewInit {

  @ViewChild(MatTable, {static: false}) table: MatTable<any>;

  displayedColumns: string[] = ['result', 'prgName', 'date'];
  dataSource: DataInterface[] = [];
  public processes: TighteningProcess[] = [];
  expandedProcesss: DataInterface | null;
  dataIndex = 0;

  constructor(private nexoService: NexoService, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.data();
  }

  data() {
    this.nexoService.getData(this.dataIndex)
      .subscribe((data: []) => {
        if (data.length === 0) {
          const snackBarRef = this.snackBar.open('No more Data available');
        }
        // @ts-ignore
        for (const d of data) {
          const tempProcess = new TighteningProcess(d);
          this.dataSource.push({
            result: tempProcess.result,
            prgName: tempProcess.result,
            date: tempProcess.date,
            description: 'nothing to show yet'
          });
          this.processes.push(tempProcess);
        }
        this.table.renderRows();
      });
  }

  ngAfterViewInit() {
  }

  loadMore() {
    this.dataIndex++;
    this.data();
  }
}
