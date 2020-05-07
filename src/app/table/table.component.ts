import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
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
  isEditable?: boolean,
  isSortable?: boolean,
  disabledColumns?: string[],
  pagination?: boolean,
}

export enum SortableColumnName {
  ID = 'id',
  FIRST_NAME = 'first_name',
  EMAIL = 'email',
  LAST_NAME = 'last_name',
  AVATAR = 'avatar',
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

  ngOnInit(): void {
    this.getColumnNames();
    this.normalSort('id');
    this.prevSortable = this.columnNames[0];
  }

  public sortByColumn(column: string): void {
    const { isSortable, disabledColumns } = this.config;

    if(!isSortable) return;

    if(disabledColumns && !this.checkIfColumnSortable(column)) return;

    if(column !== this.prevSortable) this.sortableUp[this.prevSortable] = false;

    if(!this.sortableUp[column]) {
      this.sortableUp[column] = true;
    } else {
      this.sortableUp[column] = false;
    }
    
    if(!this.sortableUp[column]) {
      this.reverseSort(column);
    } else {
      this.normalSort(column);
    }

    this.prevSortable = column;
  }

  public editData(rowData: TableData, columnData: string): void {
    if(!this.error) {
      this.editableNode = {
        row: rowData,
        column: columnData,
      }
    }
  }

  public clearEditableNode(columnData: string): void {
    columnData? this.error = false : this.error = true;

    if(!this.error) {
      this.editableNode = {
        row: null,
        column: '',
      };

      this.storageService.addItem('tableConfig', JSON.stringify(this.config));
    }
  }

  public canEdit(rowData, columnData): boolean {
    const { row, column } = this.editableNode;

    if(row === rowData 
        && column === columnData 
        && columnData !== 'id' 
        && this.config.isEditable
      ) return true;

    return false;
  }

  private checkIfColumnSortable(columnData: string) {
    const { disabledColumns } = this.config;
    let sortable = true;

    disabledColumns.forEach(column => {
      if(column === columnData) sortable = false;
    });

    return sortable;
  }
  
  private getColumnNames(): void {
    const { data } = this.config;
    const columns = Object.keys(data[0]);

    this.columnNames = columns.filter((value, index) => {
      if(index < this.config.numberOfColumns) return value;
    });
  }

  private normalSort(column: string) {
    this.config.data.sort((a,b) => {
      if(a[column] > b[column]) {
        return 1;
      } 

      if(a[column] < b[column]) {
        return -1;
      }

      return 0;
    });
  }

  private reverseSort(column: string) {
    this.config.data.sort((a,b) => {
      if(a[column] > b[column]) {
        return -1;
      } 

      if(a[column] < b[column]) {
        return 1;
      }
      
      return 0;
    });
  }
}
