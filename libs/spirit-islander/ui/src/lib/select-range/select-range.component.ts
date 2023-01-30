import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-select-range',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './select-range.component.html',
  styleUrls: ['./select-range.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectRangeComponent {}
