import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-globetrotter-learn-ui',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './globetrotter-learn-ui.component.html',
  styleUrl: './globetrotter-learn-ui.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GlobetrotterLearnUiComponent {}
