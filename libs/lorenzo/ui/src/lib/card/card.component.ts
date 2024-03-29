import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';

import { CardHeaderComponent } from './card-header/card-header.component';

@Component({
  standalone: true,
  selector: 'ui-card',
  imports: [CardHeaderComponent, CommonModule],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class CardComponent {
  @Input() canFavorite = false;
  @Input() favorite = false;
  @Output() favoriteChange = new EventEmitter<boolean>();
}
