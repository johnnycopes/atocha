import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-oxioracle-feature-data',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './oxioracle-feature-data.component.html',
  styleUrl: './oxioracle-feature-data.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OxioracleFeatureDataComponent {}
