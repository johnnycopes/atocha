import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime, switchMap, takeUntil } from 'rxjs/operators';

import { trackBySelf } from '@atocha/core/ui';
import { AuthService } from '@atocha/core/data-access';
import { UserService } from '@atocha/menu-matriarch/data-access';
import { UserPreferences, getDays } from '@atocha/menu-matriarch/util';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent implements OnInit, OnDestroy {
  user$ = this._userService.getUser();
  preferences$ = this._userService.getPreferences();
  updateAction$ = new Subject<Partial<UserPreferences>>();
  readonly trackByFn = trackBySelf;
  readonly days = getDays();
  private _destroy$ = new Subject<void>();

  constructor(
    private _router: Router,
    private _authService: AuthService,
    private _userService: UserService
  ) {}

  ngOnInit(): void {
    this.updateAction$
      .pipe(
        debounceTime(200),
        switchMap((update) => this._userService.updatePreferences(update)),
        takeUntil(this._destroy$)
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  async signOut(): Promise<void> {
    try {
      await this._authService.logout();
      this._router.navigate(['welcome']);
    } catch (e) {
      console.error(e);
    }
  }
}
