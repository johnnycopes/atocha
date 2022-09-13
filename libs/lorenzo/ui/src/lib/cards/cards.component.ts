/* eslint-disable @typescript-eslint/member-ordering */
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  TemplateRef,
  TrackByFunction,
} from '@angular/core';
import { Ordinal } from '@atocha/lorenzo/util';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { CardTemplateDirective } from './card-template.directive';

@Component({
  standalone: true,
  selector: 'ui-cards',
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardsComponent<T> implements OnChanges {
  @Input() type = '';
  @Input() cards: readonly T[] = [];
  @Input() total = 0;
  @Input() favorites = new Set<string>();
  @Input() ordinal: Ordinal = '1';
  @Input() trackByFn: TrackByFunction<T> = (_, index) => index;
  @Output() moveUp = new EventEmitter<void>();
  @Output() moveDown = new EventEmitter<void>();
  showCards = true;
  showMoveUp = false;
  showMoveDown = false;

  @ContentChild(CardTemplateDirective, { read: TemplateRef })
  cardTemplate: TemplateRef<T> | null = null;

  ngOnChanges(changes: SimpleChanges): void {
    const ordinal: Ordinal | undefined = changes['ordinal']?.currentValue;
    if (ordinal) {
      const ordinalAsNumber = parseInt(ordinal, 10);
      this.showMoveUp = ordinalAsNumber > 1;
      this.showMoveDown = ordinalAsNumber < 3;
    }
  }
}
