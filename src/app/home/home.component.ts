import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { TableData, TableConfig } from '../table/table.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public tableConfig: TableConfig = null;

  constructor( private dataService: DataService ) { }

  ngOnInit() {
    this.dataService.getAllData().subscribe((tableData: TableData[]) => {
      
      this.tableConfig = {
        data: tableData,
        numberOfColumns: 5,
        pagination: false,
      }
    });
  }

}
