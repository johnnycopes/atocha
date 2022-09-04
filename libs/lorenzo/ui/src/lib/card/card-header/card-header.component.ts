import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar as faStarFull } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons';

@Component({
  standalone: true,
  selector: 'ui-card-header',
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './card-header.component.html',
  styleUrls: ['./card-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardHeaderComponent {
  @Input() canFavorite = false;
  @Input() favorite = false;
  @Output() favoriteChange = new EventEmitter<boolean>();
  favoriteIcon = faStarFull;
  notFavoriteIcon = faStarEmpty;
}
