import { Component, OnInit, Input } from '@angular/core';
import { StorageService } from '../services/storage.service';

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

interface EditableNode {
  row: TableData,
  column: string,
}

interface SortableColumns {
  id: boolean,
  email: boolean,
  first_name: boolean,
  last_name: boolean,
  avatar: boolean,
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
  public editableNode: EditableNode = {
    row: null,
    column: '',
  };
  public error = false;
  private sortableUp: SortableColumns = {
    id: true,
    email: false,
    first_name: false,
    last_name: false,
    avatar: false,
  };
  private prevSortable: string; 

  constructor( private storageService: StorageService ) {}

  ngOnInit() {
    this.getColumnNames();
    this.config.data.sort();
    this.prevSortable = this.columnNames[0];
  }

  public sortByColumn(column) {
    if(column !== this.prevSortable) this.sortableUp[this.prevSortable] = false;

    if(!this.sortableUp[column]) {
      this.sortableUp[column] = true;
    } else {
      this.sortableUp[column] = false;
    }
    
    this.config.data.sort((a,b) => {
      if(a[column] > b[column] && this.sortableUp[column]) {
        return 1;
      } else {
        return -1;
      }
    });

    this.prevSortable = column;
  }

  public editData(rowData: TableData, columnData: string) {
    if(!this.error) {
      this.editableNode = {
        row: rowData,
        column: columnData,
      }
    }
  }

  public clearEditableNode(columnData: string) {
    columnData? this.error = false : this.error = true;

    if(!this.error) {
      this.editableNode = {
        row: null,
        column: '',
      };

      this.storageService.addItem('tableConfig', JSON.stringify(this.config));
    }
  }

  public canEdit(rowData, columnData) {
    const { row, column } = this.editableNode;

    if(row === rowData && column === columnData && columnData !== 'id') return true;
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
