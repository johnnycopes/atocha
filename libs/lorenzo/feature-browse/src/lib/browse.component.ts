import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  BehaviorSubject,
  distinctUntilChanged,
  combineLatest,
  map,
} from 'rxjs';

import { PluralPipe, trackByFactory } from '@atocha/core/ui';
import { includes } from '@atocha/core/util';
import { BrowseService } from '@atocha/lorenzo/data-access';
import { CardsComponent, CardTemplateDirective } from '@atocha/lorenzo/ui';
import { Development, Family, Leader, View } from '@atocha/lorenzo/util';
import { HeaderComponent } from './header/header.component';
import { DevelopmentComponent } from './cards/development/development.component';
import { FamilyComponent } from './cards/family/family.component';
import { LeaderComponent } from './cards/leader/leader.component';

@Component({
  standalone: true,
  selector: 'app-browse',
  imports: [
    CardTemplateDirective,
    CardsComponent,
    CommonModule,
    DevelopmentComponent,
    HeaderComponent,
    FamilyComponent,
    LeaderComponent,
    PluralPipe,
  ],
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrowseComponent {
  private _textSubject = new BehaviorSubject<string>('');

  leaderTrackByFn = trackByFactory<Leader>(({ name }) => name);
  familyTrackByFn = trackByFactory<Family>(({ name }) => name);
  developmentTrackByFn = trackByFactory<Development>(({ id }) => id.toString());

  constructor(private _browseService: BrowseService) {}

  vm$ = combineLatest([
    this._textSubject.pipe(distinctUntilChanged()),
    this._browseService.view$,
    this._browseService.cards$,
    this._browseService.favoriteCardIds$,
  ]).pipe(
    map(
      ([
        text,
        view,
        { developments, families, leaders },
        {
          development: developmentIds,
          family: familyIds,
          leader: leaderIds,
        },
      ]) => ({
        text,
        view,
        filteredDevelopments: developments.filter(({ id }) =>
          includes([id.toString()], text)
        ),
        filteredFamilies: families.filter(({ name }) => includes([name], text)),
        filteredLeaders: leaders.filter(({ name }) => includes([name], text)),
        totalDevelopments: developments.length,
        totalFamilies: families.length,
        totalLeaders: leaders.length,
        developmentIds,
        familyIds,
        leaderIds,
      })
    )
  );

  clearFavorites(): void {
    this._browseService.clearFavorites();
  }

  search(text: string): void {
    this._textSubject.next(text);
  }

  changeView(view: View): void {
    this._browseService.updateView(view);
    window.scroll(0, 0);
  }

  toggleFavoriteDevelopment(id: string): void {
    this._browseService.toggleFavoriteDevelopment(id);
  }

  toggleFavoriteFamily(id: string): void {
    this._browseService.toggleFavoriteFamily(id);
  }

  toggleFavoriteLeader(id: string): void {
    this._browseService.toggleFavoriteLeader(id);
  }
}
