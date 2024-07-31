import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-oxioracle-feature-shell',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './oxioracle-feature-shell.component.html',
  styleUrl: './oxioracle-feature-shell.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OxioracleFeatureShellComponent {}
