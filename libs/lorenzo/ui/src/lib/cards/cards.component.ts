/* eslint-disable @typescript-eslint/member-ordering */
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  Input,
  TemplateRef,
  TrackByFunction,
} from '@angular/core';

import { CardTemplateDirective } from './card-template.directive';

@Component({
  standalone: true,
  selector: 'ui-cards',
  imports: [CommonModule],
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardsComponent<T> {
  @Input() type = '';
  @Input() cards: T[] = [];
  @Input() total = 0;
  @Input() favorites = new Set<string>();
  @Input() trackByFn: TrackByFunction<T> = (_, index) => index;
  showCards = true;

  @ContentChild(CardTemplateDirective, { read: TemplateRef })
  cardTemplate: TemplateRef<T> | null = null;
}
