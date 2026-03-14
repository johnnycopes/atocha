import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs';

import { AuthService } from '@atocha/firebase/data-access';
import { ButtonComponent } from '@atocha/core/ui';
import { PlannerService } from '@atocha/menu-matriarch/planner/data-access';
import { SeedDataService } from '@atocha/menu-matriarch/shell/data-access';

@Component({
  selector: 'app-welcome',
  imports: [ButtonComponent],
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WelcomeComponent {
  private _router = inject(Router);
  private _authService = inject(AuthService);
  private _plannerService = inject(PlannerService);
  private _seedDataService = inject(SeedDataService);

  async login(): Promise<void> {
    const user = await this._authService.login().catch(console.error);

    if (user) {
      const { name, email } = user;
      this._authService.uid$.pipe(first()).subscribe(async (uid) => {
        if (!uid) {
          return;
        }
        const menuId = await this._seedDataService.createUserData({
          uid,
          name,
          email,
        });
        this._router.navigate(['/planner', menuId]);
      });
    } else {
      this._plannerService.route$.subscribe((route) =>
        this._router.navigate(route)
      );
    }
  }
}
