import { Component, OnInit, Input } from '@angular/core';

export interface TableData {
  id: number,
  email: string,
  first_name: string,
  last_name: string,
  avatar: string,
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() data: TableData[] = null;
  constructor() {}

  ngOnInit() {
    
  }

}
