import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonComponent } from '@atocha/core/ui';
import { AppFacadeService } from '@atocha/spirit-islander/shared/data-access';

@Component({
  standalone: true,
  selector: 'app-settings',
  imports: [ButtonComponent],
  template: `
    <p>The /settings page is currently under construction 🚧</p>
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
  constructor(private _appFacadeService: AppFacadeService) {}

  goToConfigPage() {
    this._appFacadeService.navigateToConfig();
  }
}
