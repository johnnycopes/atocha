import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-select-one',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './select-one.component.html',
  styleUrls: ['./select-one.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectOneComponent {}
