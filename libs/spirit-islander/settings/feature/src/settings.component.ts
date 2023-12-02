import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonComponent } from '@atocha/core/ui';
import { Settings } from '@atocha/spirit-islander/settings/util';
import { AppFacadeService } from '@atocha/spirit-islander/shared/data-access';
import { map } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-settings',
  imports: [ButtonComponent, CommonModule],
  template: `
    <p>The /settings page is currently under construction 🚧</p>
    {{ settings$ | async | json }}
    <button core-button (click)="goToConfigPage()">Home</button>
  `,
  styles: [
    `
      :host {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }

      button {
        margin-top: 32px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent {
  settings$ = this._appFacadeService.state$.pipe(
    map(({ settings }) => settings)
  );

  constructor(private _appFacadeService: AppFacadeService) {
    setTimeout(() => this.updateSettings({ isWorking: false }), 2000);
  }

  goToConfigPage() {
    this._appFacadeService.navigateToConfig();
  }

  updateSettings(change: Partial<Settings>) {
    this._appFacadeService.updateSettings(change);
  }
}
