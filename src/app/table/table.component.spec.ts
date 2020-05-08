import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableComponent, TableConfig } from './table.component';
import { FormsModule } from '@angular/forms';

const mockConfig: TableConfig = {
  isEditable: true,
  isSortable: true,
  numberOfColumns: 4,
  disabledColumns: [],
  data: [{
    id:1,
    first_name: 'kaka',
    last_name: 'asasa',
    email: 'asasa@gmail.com',
    avatar: '',
  }]
}

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableComponent ],
      imports: [FormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
  });

  it('should be null on start', () => {
    expect(component.config).toBeNull();
  });

  it('should have component config', () => {
    component.config = mockConfig;
    fixture.detectChanges();
    expect(component.config).not.toBeNull();
  });

  it('should have column names', () => {
    component.config = mockConfig;
    fixture.detectChanges();
    expect(component.columnNames.length).toEqual(4);
  });
  
});
