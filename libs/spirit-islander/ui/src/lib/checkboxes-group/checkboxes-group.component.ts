import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Item {
  id: string;
  children?: Item[];
}

import {
  CheckboxComponent,
  CheckboxState,
  CheckboxTreeComponent,
} from '@atocha/core/ui';

@Component({
  selector: 'ui-checkboxes-group',
  standalone: true,
  imports: [
    CheckboxComponent,
    CheckboxTreeComponent,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './checkboxes-group.component.html',
  styleUrls: ['./checkboxes-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxesGroupComponent {
  @Input() name = '';
  @Input()
  set items(items: string[]) {
    this._items = items;
    this.item = {
      id: this.name,
      children: this._items.map((id) => ({ id })),
    };
  }
  @Input()
  set model(model: string[]) {
    const state: Record<string, CheckboxState> = {};

    if (model.length === this._items.length) {
      state[this.name] = 'checked';
    } else if (model.length > 0) {
      state[this.name] = 'indeterminate';
    }

    this.state = model.reduce((accum, curr) => {
      accum[curr] = 'checked';
      return accum;
    }, state);
  }
  @Output() modelChange = new EventEmitter<string[]>();

  item: Item | undefined;
  state: Record<string, CheckboxState> = {};
  private _items: string[] = [];

  getId = ({ id }: Item) => id;
  getChildren = ({ children }: Item) => children ?? [];

  onChange(updatedState: Record<string, CheckboxState>): void {
    this.state = updatedState;

    const updatedModel = Object.entries(this.state)
      .filter(([name, state]) => name !== this.name && state === 'checked')
      .map(([name]) => name);

    this.modelChange.emit(updatedModel);
  }
}
