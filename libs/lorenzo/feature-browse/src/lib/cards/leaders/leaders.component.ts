import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { trackByFactory } from '@atocha/core/ui';
import { CardStateService } from '@atocha/lorenzo/data-access';
import { CardsComponent, CardTemplateDirective } from '@atocha/lorenzo/ui';
import { getLeaderId } from '@atocha/lorenzo/util';
import { LeaderComponent } from './leader.component';

@Component({
  selector: 'app-leaders',
  imports: [
    CardsComponent,
    CardTemplateDirective,
    CommonModule,
    LeaderComponent,
  ],
  template: `
    <ui-cards
      *ngIf="vm$ | async as vm"
      type="Leaders"
      [cards]="vm.filteredCards"
      [total]="vm.totalCards"
      [ordinal]="vm.ordinal"
      [visible]="vm.visible"
      [favorites]="vm.favoriteIds"
      [trackByFn]="trackByFn"
      (moveUp)="moveUp()"
      (moveDown)="moveDown()"
      (visibleChange)="toggleVisibility()"
    >
      <app-leader
        *uiCard="vm.filteredCards as leader"
        [data]="leader"
        [favorite]="vm.favoriteIds.has(getId(leader))"
        (favoriteChange)="toggleId(getId(leader))"
      ></app-leader>
    </ui-cards>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeadersComponent {
  vm$ = this._cardStateService.leaders$;
  getId = getLeaderId;
  trackByFn = trackByFactory(this.getId);

  constructor(private _cardStateService: CardStateService) {}

  toggleVisibility(): void {
    this._cardStateService.toggleVisibility('leader');
  }

  moveDown(): void {
    this._cardStateService.moveDown('leader');
  }

  moveUp(): void {
    this._cardStateService.moveUp('leader');
  }

  toggleId(id: string): void {
    this._cardStateService.toggleFavoriteId(id, 'leader');
  }
}
