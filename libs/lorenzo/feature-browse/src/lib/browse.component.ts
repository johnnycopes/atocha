import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  debounceTime,
  map,
  Subject,
  takeUntil,
  tap,
  withLatestFrom,
} from 'rxjs';

import { AppStateService, CardStateService } from '@atocha/lorenzo/data-access';
import { Card, View } from '@atocha/lorenzo/util';
import { DevelopmentsComponent } from './cards/developments/developments.component';
import { FamiliesComponent } from './cards/families/families.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { LeadersComponent } from './cards/leaders/leaders.component';
import { ToolbarComponent } from './toolbar/toolbar.component';

@Component({
  standalone: true,
  selector: 'app-browse',
  imports: [
    CommonModule,
    DevelopmentsComponent,
    FamiliesComponent,
    FooterComponent,
    HeaderComponent,
    LeadersComponent,
    ToolbarComponent,
  ],
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrowseComponent implements OnInit, OnDestroy {
  private _positionSubject = new BehaviorSubject<number>(0);
  private _scrollActionSubject = new Subject<{
    position: number;
    view: View;
  }>();
  private _destroy$ = new Subject<void>();

  vm$ = combineLatest([
    this._appStateService.view$.pipe(
      withLatestFrom(this._appStateService.position$),
      tap(([view, position]) => {
        setTimeout(() => {
          this._positionSubject.next(position[view]);
          this._cdRef.markForCheck();
        });
      }),
      map(([view, _]) => view)
    ),
    this._cardStateService.ordinal$,
    this._positionSubject.asObservable(),
  ]).pipe(
    map(([view, ordinal, position]) => ({
      view,
      position,
      ordinal,
      lastCard: Object.entries(ordinal).find(
        ([_cardType, ordinal], _index, entries) => ordinal === entries.length
      )?.[0] as Card | undefined,
    }))
  );

  constructor(
    private _appStateService: AppStateService,
    private _cardStateService: CardStateService,
    private _cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this._scrollActionSubject
      .pipe(debounceTime(50), takeUntil(this._destroy$))
      .subscribe(({ position, view }) =>
        this._appStateService.updatePosition(position, view)
      );
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  onScroll(event: Event, view: View): void {
    this._scrollActionSubject.next({
      position: (event.target as HTMLElement).scrollTop,
      view,
    });
  }
}
