import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { map } from 'rxjs';

import { ButtonComponent, CheckboxComponent } from '@atocha/core/ui';
import { Settings } from '@atocha/spirit-islander/settings/util';
import { AppFacadeService } from '@atocha/spirit-islander/shared/data-access';
import {
  CardComponent,
  CardGroupComponent,
} from '@atocha/spirit-islander/shared/ui';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-settings',
  imports: [
    ButtonComponent,
    CardComponent,
    CardGroupComponent,
    CheckboxComponent,
    CommonModule,
    FormsModule,
  ],
  template: `
    <ui-card-group
      ui-page-content
      name="Settings"
      description="Options that modify how the app works"
    >
      <ng-container *ngIf="settings$ | async as settings">
        <ui-card name="options">
          <h3 ui-card-header>
            <core-checkbox
              [ngModel]="settings['randomThematicBoards']"
              (ngModelChange)="updateSettings({ randomThematicBoards: $event })"
            >
              Random thematic boards
            </core-checkbox>
          </h3>
          <p ui-card-content>
            When playing the thematic map, specific boards are normally assigned
            to each player (base game rulebook, page 23). This option makes it
            so thematic boards are instead assigned at random.
          </p>
        </ui-card>
      </ng-container>
    </ui-card-group>
  `,
  styles: [
    `
      .ui-card-group-contents.settings {
        grid-template-areas: 'options options options options options options';
      }

      .settings {
        [ui-card-content] {
          padding: 16px 8px;
        }

        @media screen and (min-width: 768px) {
          [ui-card-content] {
            padding: 16px;
          }
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class SettingsComponent {
  settings$ = this._appFacadeService.state$.pipe(
    map(({ settings }) => settings)
  );

  constructor(private _appFacadeService: AppFacadeService) {}

  updateSettings(change: Partial<Settings>) {
    this._appFacadeService.updateSettings(change);
  }
}
