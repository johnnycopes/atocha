import { LiveAnnouncer } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { map } from 'rxjs';

import { TodoService } from '@atocha/oxioracle/data-access';
import { Todo } from '@atocha/oxioracle/util';

@Component({
  standalone: true,
  selector: 'app-table',
  imports: [CommonModule, MatTableModule, MatSortModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'userId', 'title', 'completed'];

  private _dataSource = new MatTableDataSource<Todo>();
  dataSource$ = this._todoService.todos$.pipe(
    map((todos) => {
      const dataSource = this._dataSource;
      dataSource.data = todos;
      return dataSource;
    })
  );

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private _todoService: TodoService
  ) {}

  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this._dataSource.sort = this.sort;
  }

  onSort(sortState: Sort) {
    console.log(sortState);
    this._announceSortChange(sortState);
  }

  private _announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
