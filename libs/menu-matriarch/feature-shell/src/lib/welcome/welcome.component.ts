import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { first, tap } from 'rxjs/operators';

import { AuthService } from '@atocha/core/data-access';
import {
  PlannerService,
  SeedDataService,
} from '@atocha/menu-matriarch/data-access';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WelcomeComponent {
  constructor(
    private _router: Router,
    private _authService: AuthService,
    private _plannerService: PlannerService,
    private _seedDataService: SeedDataService
  ) {}

  async login(): Promise<void> {
    try {
      const user = await this._authService.login();
      if (user) {
        const { name, email } = user;
        this._authService.uid$
          .pipe(
            first(),
            tap(async (uid) => {
              if (!uid) {
                return;
              }
              const menuId = await this._seedDataService.createUserData({
                uid,
                name,
                email,
              });
              this._router.navigate(['/planner', menuId]);
            })
          )
          .subscribe();
      } else {
        this._plannerService.plannerRoute$
          .pipe(tap((route) => this._router.navigate(route)))
          .subscribe();
      }
    } catch (e) {
      console.error(e);
    }
  }
}
