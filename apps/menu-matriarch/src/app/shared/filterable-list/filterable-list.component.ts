import {
  Component,
  ChangeDetectionStrategy,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { Tag } from '@atocha/menu-matriarch/types';

@Component({
  selector: 'app-filterable-list',
  templateUrl: './filterable-list.component.html',
  styleUrls: ['./filterable-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterableListComponent {
  @Input() total = 0;
  @Input() searchText = '';
  @Input() filters: string[] = []
  @Input() isPanelOpen = false;
  @Input() tags: Tag[] = [];
  @Input() entity = 'Item';
  @Input() pluralEntity: string | undefined;
  @Input() newRoute = '';
  @Output() searchTextChange = new EventEmitter<string>();
  @Output() filtersChange = new EventEmitter<string[]>();
  @Output() filtersButtonClick = new EventEmitter<void>();
  @Output() nameDblClick = new EventEmitter<void>();
}
