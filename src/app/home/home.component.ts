import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { TableData, TableConfig } from '../table/table.component';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public tableConfig: TableConfig = null;

  constructor( private dataService: DataService, private storageService: StorageService ) { }

  ngOnInit() {
    this.getTableData();
  }

  private getTableData(): void {
    this.tableConfig = this.storageService.getItem('tableConfig');

    if(!this.tableConfig) {
      this.dataService.getAllData().subscribe((tableData: TableData[]) => {
      
        this.tableConfig = {
          data: tableData,
          numberOfColumns: 5,
          pagination: false, //POSSIBLE IMPROVEMENT
        }

        this.storageService.addItem('tableConfig',JSON.stringify(this.tableConfig));
      });
    }
  }

}
