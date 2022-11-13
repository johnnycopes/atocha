import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
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
})
export class EmblemComponent {
  @Input() name = '';

  @HostBinding('class')
  get hostClasses(): string[] {
    return ['ui-emblem', `ui-emblem--${this.name}`];
  }
}
