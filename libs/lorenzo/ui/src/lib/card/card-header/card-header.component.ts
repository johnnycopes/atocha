import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faStar as faStarFull } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'ui-card-header',
  imports: [CommonModule, FaIconComponent],
  templateUrl: './card-header.component.html',
  styleUrls: ['./card-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardHeaderComponent {
  @Input() favorite = false;
  @Output() favoriteChange = new EventEmitter<boolean>();
  favoriteIcon = faStarFull;
  notFavoriteIcon = faStarEmpty;
}
