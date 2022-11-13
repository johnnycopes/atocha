import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'ui-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  @Input() name = '';
  @Input() error = false;
  @Input() errorMessage = '';

  @HostBinding('class')
  get hostClasses(): string[] {
    return ['ui-card', this.name];
  }

  @HostBinding('style.gridArea')
  get gridArea(): string {
    return this.name;
  }
}
