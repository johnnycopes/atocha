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

import { ButtonComponent } from '@atocha/core/ui';
import { Ordinal } from '@atocha/lorenzo/util';
import {
  CardTemplateContext,
  CardTemplateDirective,
} from './card-template.directive';

@Component({
    selector: 'ui-cards',
    imports: [ButtonComponent, CommonModule],
    templateUrl: './cards.component.html',
    styleUrls: ['./cards.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardsComponent<T> implements OnChanges {
  @Input() type = '';
  @Input() cards: readonly T[] = [];
  @Input() total = 0;
  @Input() favorites = new Set<string>();
  @Input() ordinal: Ordinal = 1;
  @Input() visible = true;
  @Input() trackByFn: TrackByFunction<T> = (_, index) => index;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() moveUp = new EventEmitter<void>();
  @Output() moveDown = new EventEmitter<void>();
  showMoveUp = false;
  showMoveDown = false;

  @ContentChild(CardTemplateDirective, { read: TemplateRef })
  cardTemplate: TemplateRef<CardTemplateContext<T>> | null = null;

  ngOnChanges(changes: SimpleChanges): void {
    const ordinal: Ordinal | undefined = changes['ordinal']?.currentValue;
    if (ordinal) {
      this.showMoveUp = ordinal > 1;
      this.showMoveDown = ordinal < 3;
    }
  }
}
