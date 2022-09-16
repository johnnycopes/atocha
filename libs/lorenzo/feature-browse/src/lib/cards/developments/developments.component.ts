import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { trackByFactory } from '@atocha/core/ui';
import { CardStateService } from '@atocha/lorenzo/data-access';
import { CardsComponent, CardTemplateDirective } from '@atocha/lorenzo/ui';
import { getDevelopmentId } from '@atocha/lorenzo/util';
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
      *ngIf="vm$ | async as vm"
      type="Developments"
      [cards]="vm.filteredCards"
      [total]="vm.totalCards"
      [ordinal]="vm.ordinal"
      [favorites]="vm.favoriteIds"
      (moveUp)="moveUp()"
      (moveDown)="moveDown()"
    >
      <app-development
        *uiCard="vm.filteredCards as development"
        [data]="development"
        [favorite]="vm.favoriteIds.has(getId(development))"
        (favoriteChange)="toggleId(getId(development))"
      ></app-development>
    </ui-cards>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DevelopmentsComponent {
  vm$ = this._cardStateService.developments$;
  getId = getDevelopmentId;
  trackByFn = trackByFactory(this.getId);

  constructor(private _cardStateService: CardStateService) {}

  moveDown(): void {
    this._cardStateService.moveDown('development');
  }

  moveUp(): void {
    this._cardStateService.moveUp('development');
  }

  toggleId(id: string): void {
    this._cardStateService.toggleFavoriteId(id, 'development');
  }
}
