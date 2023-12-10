import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ButtonComponent, CheckboxComponent } from '@atocha/core/ui';
import { Settings } from '@atocha/spirit-islander/settings/util';
import { StateService } from '@atocha/spirit-islander/shared/data-access';
import {
  CardComponent,
  CardGroupComponent,
} from '@atocha/spirit-islander/shared/ui';

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
      <div *ngIf="settings$ | async as settings" class="options">
        <ui-card>
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
            to each player (base game rulebook, page 23). When enabled, this
            option makes it so thematic boards are instead assigned at random.
          </p>
        </ui-card>
        <ui-card>
          <h3 ui-card-header>
            <core-checkbox
              [ngModel]="settings['allowBEAndDFBoards']"
              (ngModelChange)="updateSettings({ allowBEAndDFBoards: $event })"
            >
              Allow B/E and D/F board pairings
            </core-checkbox>
          </h3>
          <p ui-card-content>
            The Jagged Earth expansion introduces two new island boards, E and
            F, which can skew difficulty in games with fewer than 4 players
            (Jagged Earth rulebook, page 6). When disabled, this option prevents
            boards B/E and D/F from being paired together in two player games.
            <br />
            <br />
            <em>NOTE:</em> Disabling this option will select all boards in order
            to avoid potential conflicts.
          </p>
        </ui-card>
      </div>
    </ui-card-group>
  `,
  styles: [
    `
      .ui-card-group-contents.settings {
        grid-template-areas: 'options options options options options options';
      }

      .settings {
        [ui-card-content] {
          line-height: 1.3;
          padding: 16px 8px;
        }

        @media screen and (min-width: 768px) {
          [ui-card-content] {
            padding: 16px;
          }
        }
      }

      .options {
        grid-area: options;

        ui-card:not(:last-child) {
          margin-bottom: 8px;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class SettingsComponent {
  settings$ = this._stateService.settings$;

  constructor(private _stateService: StateService) {}

  updateSettings(change: Partial<Settings>) {
    this._stateService.updateSettings(change);
  }
}
