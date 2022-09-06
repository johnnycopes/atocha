/* eslint-disable @typescript-eslint/member-ordering */
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ContentChild, EventEmitter, Input, Output, TemplateRef } from '@angular/core';

@Component({
  standalone: true,
  selector: 'ui-cards',
  imports: [CommonModule],
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardsComponent<T> {
  @Input() cards: T[] = [];
  @Input() getId: (data: T) => string = () => '';
  @Input() total = 0;
  @Input() favorites = new Set<string>();
  @Output() favoritesChange = new EventEmitter<string>();
  showCards = true;

  // cardsTrackByF = trackByFactory<Development>(({ id }) => id.toString());

  @ContentChild('cardTemplate')
  cardTemplate: TemplateRef<T> | null = null;
}
