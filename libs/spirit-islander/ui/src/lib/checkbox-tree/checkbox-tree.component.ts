import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-checkbox-tree',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './checkbox-tree.component.html',
  styleUrls: ['./checkbox-tree.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxTreeComponent {}
