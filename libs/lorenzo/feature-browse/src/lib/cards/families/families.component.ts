import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { trackByFactory } from '@atocha/core/ui';
import { BrowseService } from '@atocha/lorenzo/data-access';
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
    <ui-cards *ngIf="families$ | async as data"
      type="Families"
      [cards]="data.filteredCards"
      [total]="data.totalCards"
      [ordinal]="data.ordinal"
      [favorites]="data.favoriteIds"
      [trackByFn]="trackByFn"
      (moveUp)="moveUp()"
      (moveDown)="moveDown()"
    >
      <app-family
        *uiCard="data.filteredCards as family"
        [data]="family"
        [favorite]="data.favoriteIds.has(getId(family))"
        (favoriteChange)="toggleId(getId(family))"
      ></app-family>
    </ui-cards>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FamiliesComponent {
  getId = getFamilyId;
  trackByFn = trackByFactory(this.getId);
  families$ = this._browseService.families$;

  constructor(private _browseService: BrowseService) {}

  moveDown(): void {
    this._browseService.moveDown('family');
  }

  moveUp(): void {
    this._browseService.moveUp('family');
  }

  toggleId(id: string): void {
    this._browseService.toggleFavoriteId(id, 'family');
  }
}
