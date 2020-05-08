import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../services/data.service';
import { TableData, TableConfig, SortableColumnName } from '../table/table.component';
import { StorageService } from '../services/storage.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  public tableConfig: TableConfig = null;
  private cleanHelper$ = new Subject<any>();
  constructor( private dataService: DataService, private storageService: StorageService ) { }

  ngOnInit() {
    this.getTableData();
  }

  private getTableData(): void {
    this.tableConfig = this.storageService.getItem('tableConfig');

    if(!this.tableConfig) {
      this.dataService.getAllData().pipe(
        takeUntil(this.cleanHelper$),
      ).subscribe((tableData: TableData[]) => {
      
        this.tableConfig = {
          data: tableData,
          numberOfColumns: 5,
          isEditable: true,
          isSortable: true,
          disabledColumns: [SortableColumnName.EMAIL, SortableColumnName.AVATAR],
          pagination: false, //POSSIBLE IMPROVEMENT
        }

        this.storageService.addItem('tableConfig',JSON.stringify(this.tableConfig));
      });
    }
  }

  ngOnDestroy() {
    this.cleanHelper$.next();
    this.cleanHelper$.complete();
  }

}
