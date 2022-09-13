import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { PluralPipe } from '@atocha/core/ui';

@Component({
  standalone: true,
  selector: 'app-favorites-counter',
  imports: [CommonModule, PluralPipe],
  templateUrl: './favorites-counter.component.html',
  styleUrls: ['./favorites-counter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoritesCounterComponent {
  @Input() count = 0;
  @Output() clear = new EventEmitter<void>();
}
