import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { SupabaseService } from '@atocha/supabase/data-access';
import { ButtonComponent } from '@atocha/core/ui';

@Component({
  selector: 'app-welcome',
  imports: [ButtonComponent],
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WelcomeComponent {
  private _supabase = inject(SupabaseService);

  async login(): Promise<void> {
    await this._supabase.signInWithGoogle(window.location.origin);
  }
}
