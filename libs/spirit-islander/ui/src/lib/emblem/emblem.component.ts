import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-emblem',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './emblem.component.html',
  styleUrls: ['./emblem.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {
    class: 'ui-emblem',
  },
})
export class EmblemComponent {}
