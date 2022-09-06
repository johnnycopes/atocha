import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  BehaviorSubject,
  distinctUntilChanged,
  combineLatest,
  map,
  switchMap,
} from 'rxjs';

import { trackByFactory } from '@atocha/core/ui';
import { includes } from '@atocha/core/util';
import { BrowseService } from '@atocha/lorenzo/data-access';
import { CardsComponent, CardTemplateDirective } from '@atocha/lorenzo/ui';
import { Development, Leader } from '@atocha/lorenzo/util';
import { HeaderComponent } from './header/header.component';
import { DevelopmentComponent } from './cards/development/development.component';
import { LeaderComponent } from './cards/leader/leader.component';
import { View } from './view.type';

@Component({
  standalone: true,
  selector: 'app-browse',
  imports: [
    CardTemplateDirective,
    CardsComponent,
    CommonModule,
    DevelopmentComponent,
    HeaderComponent,
    LeaderComponent,
  ],
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrowseComponent {
  private _textSubject = new BehaviorSubject<string>('');
  text$ = this._textSubject.pipe(distinctUntilChanged());

  private _viewSubject = new BehaviorSubject<View>('all');
  view$ = this._viewSubject.pipe(distinctUntilChanged());

  leaders$ = this._viewSubject.pipe(
    switchMap((view) =>
      view === 'all'
        ? this._browseService.leaders$
        : this._browseService.favoriteLeaders$
    )
  );

  developments$ = this._viewSubject.pipe(
    switchMap((view) =>
      view === 'all'
        ? this._browseService.developments$
        : this._browseService.favoriteDevelopments$
    )
  );

  developmentTrackByFn = trackByFactory<Development>(({ id }) => id.toString());
  leaderTrackByFn = trackByFactory<Leader>(({ name }) => name);

  constructor(private _browseService: BrowseService) {}

  vm$ = combineLatest([
    this.text$,
    this.view$,
    this.leaders$,
    this.developments$,
    this._browseService.favoriteLeaderIds$,
    this._browseService.favoriteDevelopmentIds$,
  ]).pipe(
    map(
      ([
        text,
        view,
        leaders,
        developments,
        favoriteLeaders,
        favoriteDevelopments,
      ]) => ({
        text,
        view,
        filteredLeaders: leaders.filter(({ name }) => includes([name], text)),
        filteredDevelopments: developments.filter(({ id }) =>
          includes([id.toString()], text)
        ),
        totalLeaders: leaders.length,
        totalDevelopments: developments.length,
        favoriteLeaders,
        favoriteDevelopments,
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
    this._viewSubject.next(view);
    window.scroll(0, 0);
  }

  updateFavoriteLeader(id: string): void {
    this._browseService.updateFavoriteLeader(id);
  }

  updateFavoriteDevelopment(id: string): void {
    this._browseService.updateFavoriteDevelopment(id);
  }
}
