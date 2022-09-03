import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { SettingService } from '@atocha/lorenzo/data-access';

@Component({
  standalone: true,
  selector: 'app-settings',
  imports: [CommonModule],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent {
  settings$ = this._settingService.state$;

  constructor(private _settingService: SettingService) {}

  toggleShowFavorites(): void {
    this._settingService.toggleShowFavorites();
  }
}
