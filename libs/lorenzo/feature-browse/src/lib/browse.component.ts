import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  BehaviorSubject,
  distinctUntilChanged,
  combineLatest,
  map,
  switchMap,
} from 'rxjs';

import { includes } from '@atocha/core/util';
import { BrowseService } from '@atocha/lorenzo/data-access';
import { HeaderComponent } from './header/header.component';
import { View } from './mode.type';
import { LeadersComponent } from './leaders/leaders.component';
import { DevelopmentsComponent } from './developments/developments.component';

@Component({
  standalone: true,
  selector: 'app-browse',
  imports: [
    CommonModule,
    DevelopmentsComponent,
    HeaderComponent,
    LeadersComponent,
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
