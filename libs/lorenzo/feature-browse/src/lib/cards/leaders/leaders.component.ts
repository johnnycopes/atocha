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
import { getLeaderId, Leader, Ordinal } from '@atocha/lorenzo/util';
import { LeaderComponent } from './leader.component';

@Component({
  standalone: true,
  selector: 'app-leaders',
  imports: [
    CardsComponent,
    CardTemplateDirective,
    CommonModule,
    LeaderComponent,
  ],
  template: `
    <ui-cards
      type="Leaders"
      [cards]="leaders"
      [total]="total"
      [ordinal]="ordinal"
      [favorites]="favoriteIds"
      (moveUp)="moveUp.emit()"
      (moveDown)="moveDown.emit()"
    >
      <app-leader
        *uiCard="leaders as leader"
        [data]="leader"
        [favorite]="favoriteIds.has(getId(leader))"
        (favoriteChange)="toggleId.emit(getId(leader))"
      ></app-leader>
    </ui-cards>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeadersComponent {
  @Input() leaders: readonly Leader[] = [];
  @Input() total = 0;
  @Input() ordinal: Ordinal = '1';
  @Input() favoriteIds = new Set<string>();
  @Output() toggleId = new EventEmitter<string>();
  @Output() moveUp = new EventEmitter<void>();
  @Output() moveDown = new EventEmitter<void>();
  getId = getLeaderId;
  trackByFn = trackByFactory(this.getId);
}
