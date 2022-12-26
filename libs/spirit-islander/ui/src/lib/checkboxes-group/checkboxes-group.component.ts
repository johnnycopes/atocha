/* eslint-disable @typescript-eslint/member-ordering */
import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Tree<T> {
  id: string;
  contents?: T;
  children?: Tree<T>[];
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
export class CheckboxesGroupComponent<T> {
  @Input() name = '';

  @Input() getId: (item: T) => string = () => '';

  @Input()
  set items(items: T[]) {
    this._items = items;
    this.tree = {
      id: this.name,
      children: this._items.map((item) => ({
        id: this.getId(item),
        contents: item,
      })),
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

  @ContentChild('grab')
  contentTemplate: TemplateRef<unknown> | null = null;

  tree: Tree<T> | undefined;
  state: Record<string, CheckboxState> = {};
  private _items: T[] = [];

  ngAfterContentInit() {
    console.log(this.contentTemplate);
  }

  getTreeId = ({ id }: Tree<T>) => id;
  getTreeChildren = ({ children }: Tree<T>) => children ?? [];

  onChange(updatedState: Record<string, CheckboxState>): void {
    this.state = updatedState;

    const updatedModel = Object.entries(this.state)
      .filter(([name, state]) => name !== this.name && state === 'checked')
      .map(([name]) => name);

    this.modelChange.emit(updatedModel);
  }
}
