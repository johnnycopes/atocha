import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  CheckboxComponent,
  CheckboxTreeComponent as CoreCheckboxTreeComponent,
} from '@atocha/core/ui';
import { ConfigTree } from './create-tree';
import { DifficultyEmblemComponent } from '../difficulty-emblem/difficulty-emblem.component';
import { ExpansionEmblemComponent } from '../expansion-emblem/expansion-emblem.component';

@Component({
  selector: 'ui-checkbox-tree',
  standalone: true,
  imports: [
    CheckboxComponent,
    CoreCheckboxTreeComponent,
    CommonModule,
    DifficultyEmblemComponent,
    ExpansionEmblemComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './checkbox-tree.component.html',
  styleUrls: ['./checkbox-tree.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxTreeComponent<T> {
  @Input() tree: ConfigTree<T> | undefined;
  @Input() form: FormGroup | undefined;
  @Input() controlName = '';
  @Output() nodeClick = new EventEmitter<string>();

  getId = <T>({ id }: ConfigTree<T>) => id;
  getChildren = <T>({ children }: ConfigTree<T>) => children ?? [];
}