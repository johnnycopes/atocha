import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { trackByFactory } from '@atocha/core/ui';
import { BrowseService } from '@atocha/lorenzo/data-access';
import { CardsComponent, CardTemplateDirective } from '@atocha/lorenzo/ui';
import { getLeaderId } from '@atocha/lorenzo/util';
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
    <ui-cards *ngIf="leaders$ | async as data"
      type="Leaders"
      [cards]="data.filteredCards"
      [total]="data.totalCards"
      [ordinal]="data.ordinal"
      [favorites]="data.favoriteIds"
      (moveUp)="moveUp()"
      (moveDown)="moveDown()"
    >
      <app-leader
        *uiCard="data.filteredCards as leader"
        [data]="leader"
        [favorite]="data.favoriteIds.has(getId(leader))"
        (favoriteChange)="toggleId(getId(leader))"
      ></app-leader>
    </ui-cards>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeadersComponent {
  getId = getLeaderId;
  trackByFn = trackByFactory(this.getId);
  leaders$ = this._browseService.leaders$;

  constructor(private _browseService: BrowseService) {}

  moveDown(): void {
    this._browseService.moveDown('leader');
  }

  moveUp(): void {
    this._browseService.moveUp('leader');
  }

  toggleId(id: string): void {
    this._browseService.toggleFavoriteId(id, 'leader');
  }
}
