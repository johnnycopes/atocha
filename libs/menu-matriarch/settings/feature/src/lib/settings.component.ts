import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, debounceTime, switchMap, takeUntil } from 'rxjs';

import { ButtonComponent, trackBySelf } from '@atocha/core/ui';
import { SupabaseService } from '@atocha/supabase/data-access';
import { UserService } from '@atocha/menu-matriarch/settings/data-access';
import {
  CardComponent,
  InputComponent,
  SectionComponent,
  SelectDayComponent,
} from '@atocha/menu-matriarch/shared/ui';
import { UserPreferences, getDays } from '@atocha/menu-matriarch/shared/util';

@Component({
  selector: 'app-settings',
  imports: [
    ButtonComponent,
    CardComponent,
    CommonModule,
    FormsModule,
    InputComponent,
    SectionComponent,
    SelectDayComponent,
  ],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent implements OnInit, OnDestroy {
  private _router = inject(Router);
  private _supabase = inject(SupabaseService);
  private _userService = inject(UserService);

  user$ = this._userService.getUser();
  preferences$ = this._userService.getPreferences();
  updateAction$ = new Subject<Partial<UserPreferences>>();
  readonly trackByFn = trackBySelf;
  readonly days = getDays();
  private _destroy$ = new Subject<void>();

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
      await this._supabase.signOut();
      this._router.navigate(['welcome']);
    } catch (e) {
      console.error(e);
    }
  }
}
