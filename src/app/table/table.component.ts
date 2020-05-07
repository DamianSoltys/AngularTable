import { Component, OnInit, Input, OnChanges } from '@angular/core';

export interface TableData {
  id: number,
  email: string,
  first_name: string,
  last_name: string,
  avatar: string,
}

export interface TableConfig {
  numberOfColumns?: number,
  data?: TableData[],
  pagination?: boolean,
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() config: TableConfig = null;
  public rowValues: string[] = [];
  public columnNames: string[] = [];

  constructor() {}

  ngOnInit() {
    this.getColumnNames();
  }

  public sortByColumn(column) {
    console.log(column);
  }

  public editData(row, column) {
    console.log(row);
    console.log(column);
  }

  public canEdit(row, column) {
    return false;
  }
  
  private getColumnNames() {
    const { data } = this.config;
    const columns = Object.keys(data[0]);

    this.columnNames = columns.filter((value, index) => {
      if(index < this.config.numberOfColumns) return value;
    });
  }
}
