import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckboxTreeComponent as CoreCheckboxTreeComponent } from '@atocha/core/ui';
import { ConfigTree } from './create-tree';

@Component({
  selector: 'ui-checkbox-tree',
  standalone: true,
  imports: [CoreCheckboxTreeComponent, CommonModule],
  templateUrl: './checkbox-tree.component.html',
  styleUrls: ['./checkbox-tree.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxTreeComponent {
  getId = <T>({ id }: ConfigTree<T>) => id;
  getChildren = <T>({ children }: ConfigTree<T>) => children ?? [];
}
