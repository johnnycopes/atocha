import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-oxioracle-data-access',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './oxioracle-data-access.component.html',
  styleUrl: './oxioracle-data-access.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OxioracleDataAccessComponent {}
