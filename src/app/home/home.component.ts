import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { TableData } from '../table/table.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public tableData: TableData[] = null;

  constructor( private dataService: DataService ) { }

  ngOnInit() {
    this.dataService.getAllData().subscribe(data => {
      this.tableData = data;
    });
  }

}
