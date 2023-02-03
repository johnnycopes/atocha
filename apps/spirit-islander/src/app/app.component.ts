import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { AppStateService } from '@atocha/spirit-islander/data-access';
import { Page } from '@atocha/spirit-islander/util';
import {
  ConfigComponent,
  ConfigDetails,
} from '@atocha/spirit-islander/feature-config';
import { GameSetupComponent } from '@atocha/spirit-islander/feature-game-setup';
import {
  FooterComponent,
  HeaderComponent,
} from '@atocha/spirit-islander/feature-shell';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [
    CommonModule,
    ConfigComponent,
    FooterComponent,
    GameSetupComponent,
    HeaderComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  vm$ = this._appStateService.state$;
  Page: typeof Page = Page;

  constructor(private _appStateService: AppStateService) {}

  onEdit(): void {
    this._appStateService.edit();
  }

  onGenerate({ config, validCombos }: ConfigDetails): void {
    this._appStateService.generate(config, validCombos);
  }

  onRegenerate(): void {
    this._appStateService.regenerate();
  }
}
