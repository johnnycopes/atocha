import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sandbox-ui.component.html',
  styleUrls: ['./sandbox-ui.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SandboxUiComponent {}
