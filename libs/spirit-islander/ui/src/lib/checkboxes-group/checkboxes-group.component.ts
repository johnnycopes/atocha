import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-checkboxes-group',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './checkboxes-group.component.html',
  styleUrls: ['./checkboxes-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxesGroupComponent {}
