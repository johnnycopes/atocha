import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { trackByFactory } from '@atocha/core/ui';
import { CardStateService } from '@atocha/lorenzo/data-access';
import { CardsComponent, CardTemplateDirective } from '@atocha/lorenzo/ui';
import { getFamilyId } from '@atocha/lorenzo/util';
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
      *ngIf="vm$ | async as vm"
      type="Families"
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
      <app-family
        *uiCard="vm.filteredCards as family"
        [data]="family"
        [favorite]="vm.favoriteIds.has(getId(family))"
        (favoriteChange)="toggleId(getId(family))"
      ></app-family>
    </ui-cards>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FamiliesComponent {
  vm$ = this._cardStateService.families$;
  getId = getFamilyId;
  trackByFn = trackByFactory(this.getId);

  constructor(private _cardStateService: CardStateService) {}

  toggleVisibility(): void {
    this._cardStateService.toggleVisibility('family');
  }

  moveDown(): void {
    this._cardStateService.moveDown('family');
  }

  moveUp(): void {
    this._cardStateService.moveUp('family');
  }

  toggleId(id: string): void {
    this._cardStateService.toggleFavoriteId(id, 'family');
  }
}
