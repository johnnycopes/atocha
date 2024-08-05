import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-oxioracle-ui',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './oxioracle-ui.component.html',
  styleUrl: './oxioracle-ui.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OxioracleUiComponent {}
