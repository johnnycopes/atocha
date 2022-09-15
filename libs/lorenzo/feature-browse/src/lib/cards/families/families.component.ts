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
import { Family, getFamilyId, Ordinal } from '@atocha/lorenzo/util';
import { FamilyComponent } from './family.component';

@Component({
  standalone: true,
  selector: 'app-families',
  imports: [
    CardsComponent,
    CardTemplateDirective,
    CommonModule,
    FamilyComponent,
  ],
  template: `
    <ui-cards
      type="Families"
      [cards]="families"
      [total]="total"
      [ordinal]="ordinal"
      [favorites]="favoriteIds"
      [trackByFn]="trackByFn"
      (moveUp)="moveUp.emit()"
      (moveDown)="moveDown.emit()"
    >
      <app-family
        *uiCard="families as family"
        [data]="family"
        [favorite]="favoriteIds.has(getId(family))"
        (favoriteChange)="toggleId.emit(getId(family))"
      ></app-family>
    </ui-cards>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FamiliesComponent {
  @Input() families: readonly Family[] = [];
  @Input() total = 0;
  @Input() ordinal: Ordinal = 1;
  @Input() favoriteIds = new Set<string>();
  @Output() toggleId = new EventEmitter<string>();
  @Output() moveUp = new EventEmitter<void>();
  @Output() moveDown = new EventEmitter<void>();
  getId = getFamilyId;
  trackByFn = trackByFactory(this.getId);
}
