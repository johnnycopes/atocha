import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { trackByFactory } from '@atocha/core/ui';
import { CardsComponent, CardTemplateDirective } from '@atocha/lorenzo/ui';
import { Development, getDevelopmentId, Ordinal } from '@atocha/lorenzo/util';
import { DevelopmentComponent } from './development.component';

@Component({
  standalone: true,
  selector: 'app-developments',
  imports: [
    CardsComponent,
    CardTemplateDirective,
    CommonModule,
    DevelopmentComponent,
  ],
  template: `
    <ui-cards
      type="Developments"
      [cards]="developments"
      [total]="total"
      [ordinal]="ordinal"
      [favorites]="favoriteIds"
      (moveUp)="moveUp.emit()"
      (moveDown)="moveDown.emit()"
    >
      <app-development
        *uiCard="developments as development"
        [data]="development"
        [favorite]="favoriteIds.has(getId(development))"
        (favoriteChange)="toggleId.emit(getId(development))"
      ></app-development>
    </ui-cards>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DevelopmentsComponent {
  @Input() developments: readonly Development[] = [];
  @Input() total = 0;
  @Input() ordinal: Ordinal = '1';
  @Input() favoriteIds = new Set<string>();
  @Output() toggleId = new EventEmitter<string>();
  @Output() moveUp = new EventEmitter<void>();
  @Output() moveDown = new EventEmitter<void>();
  getId = getDevelopmentId;
  trackByFn = trackByFactory(this.getId);
}
