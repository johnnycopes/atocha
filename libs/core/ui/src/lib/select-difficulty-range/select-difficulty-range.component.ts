import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'core-select-difficulty-range',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './select-difficulty-range.component.html',
  styleUrls: ['./select-difficulty-range.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectDifficultyRangeComponent {}
