import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ui-emblem',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './emblem.component.html',
  styleUrls: ['./emblem.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmblemComponent {}
