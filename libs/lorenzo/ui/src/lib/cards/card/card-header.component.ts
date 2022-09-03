import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar as faStarFull } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons';

@Component({
  standalone: true,
  selector: 'ui-card-header',
  imports: [CommonModule, FontAwesomeModule],
  template: `
    <div>
      <ng-content></ng-content>
    </div>
    <fa-icon *ngIf="canFavorite"
      class="favorite"
      [icon]="favorite ? favoriteIcon : notFavoriteIcon"
      (click)="favoriteChange.emit(!favorite)"
    ></fa-icon>
  `,
  styles: [`
    :host {
      display: flex;
      justify-content: space-between;
      padding: 4px;
      border-radius: var(--border-radius) var(--border-radius) 0 0;
      border-bottom: 1px solid var(--font-color);
    }

    .favorite {
      display: flex;
      justify-content: flex-end;
      width: 40px;
      padding-top: 2px;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardHeaderComponent {
  @Input() canFavorite = false;
  @Input() favorite = false;
  @Output() favoriteChange = new EventEmitter<boolean>();

  favoriteIcon = faStarFull;
  notFavoriteIcon = faStarEmpty;
}
