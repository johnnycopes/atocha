import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CheckboxComponent } from '@atocha/core/ui';
import {
  DifficultyEmblemComponent,
  ExpansionEmblemComponent,
} from '@atocha/spirit-islander/shared/ui';
import { SelectionTreeComponent } from '@atocha/tree/ui';
import { Node } from '../config-form/root';

@Component({
  selector: 'app-checkbox-tree',
  standalone: true,
  imports: [
    CheckboxComponent,
    CommonModule,
    DifficultyEmblemComponent,
    ExpansionEmblemComponent,
    FormsModule,
    ReactiveFormsModule,
    SelectionTreeComponent,
  ],
  templateUrl: './checkbox-tree.component.html',
  styleUrls: ['./checkbox-tree.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxTreeComponent<T> {
  @Input({ required: true }) root!: Node<T>;
  @Input({ required: true }) form!: FormGroup;
  @Input() controlName = '';
  @Output() nodeClick = new EventEmitter<string>();

  getId = <T>({ id }: Node<T>) => id;
  getChildren = <T>({ children }: Node<T>) => children ?? [];
}
