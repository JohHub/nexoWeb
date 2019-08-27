import {Component, OnInit, ViewChild} from '@angular/core';
import {NexoService} from '../nexo.service';
import {TighteningProcess} from '../Entities/tightening-process';
import {MatSnackBar, MatTable} from '@angular/material';
import {Router} from '@angular/router';


export interface DataInterface {
  result: string;
  prgName: string;
  date: string;
  idCode: string;
}

@Component({
  selector: 'app-multiview',
  templateUrl: './multiview.component.html',
  styleUrls: ['./multiview.component.css'],
})
export class MultiviewComponent implements OnInit {

  displayedColumns: string[] = ['result', 'idCode', 'prgName', 'date'];

  @ViewChild(MatTable, {static: false}) table: MatTable<any>;

  constructor(private nexoService: NexoService, private snackBar: MatSnackBar, private router: Router) {
  }
  dataSource: DataInterface[] = [];
  public processes: TighteningProcess[] = [];

  // dataIndex * 10 == Position of the first requested Document in the Database
  dataIndex = 0;

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
          this.nexoService.addData(tempProcess);
          this.dataSource.push({
            result: tempProcess.result,
            prgName: tempProcess.prgName,
            date: tempProcess.date,
            idCode: tempProcess.idCode
          });
          this.processes.push(tempProcess);
        }
        this.table.renderRows();
      });
  }

  loadMore() {
    this.dataIndex++;
    this.data();
  }

  navigateTo(row: DataInterface) {
    this.router.navigate(['process', row.idCode]);
  }

}
