import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime, switchMap, takeUntil } from 'rxjs/operators';

import { UserPreferences } from '@models/user-preferences.interface';
import { AuthService } from '@services/auth.service';
import { UserService } from '@services/user.service';
import { getDays } from '@utility/domain/get-days';
import { trackBySelf } from '@utility/domain/track-by-functions';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent implements OnInit, OnDestroy {
  public user$ = this._userService.getUser();
  public preferences$ = this._userService.getPreferences();
  public updateAction$ = new Subject<Partial<UserPreferences>>();
  public readonly trackByFn = trackBySelf;
  public readonly days = getDays();
  private _destroy$ = new Subject<void>();

  constructor(
    private _router: Router,
    private _authService: AuthService,
    private _userService: UserService,
  ) { }

  public ngOnInit(): void {
    this.updateAction$.pipe(
      debounceTime(200),
      switchMap(update => this._userService.updatePreferences(update)),
      takeUntil(this._destroy$),
    ).subscribe();
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public async signOut(): Promise<void> {
    try {
      await this._authService.logout();
      this._router.navigate(['/welcome']);
    } catch (e) {
      console.error(e);
    }
  }
}
