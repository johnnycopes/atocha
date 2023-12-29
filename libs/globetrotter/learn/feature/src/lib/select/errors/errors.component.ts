import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ErrorComponent } from '@atocha/globetrotter/shared/ui';

@Component({
  standalone: true,
  selector: 'app-errors',
  imports: [CommonModule, ErrorComponent],
  templateUrl: './errors.component.html',
  styleUrls: ['./errors.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorsComponent {}
