import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

import {
  ConfigComponent,
  ConfigDetails,
} from '@atocha/spirit-islander/feature-config';
import { GameSetupComponent } from '@atocha/spirit-islander/feature-game-setup';
import {
  FooterComponent,
  HeaderComponent,
} from '@atocha/spirit-islander/feature-shell';
import { Page } from '@atocha/spirit-islander/util';
import { ConfigService } from '@atocha/spirit-islander/data-access';

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
  vm$ = this._configService.state$;
  Page: typeof Page = Page;

  constructor(private _configService: ConfigService) {}

  onEdit(): void {
    this._configService.edit();
  }

  onGenerate({ config, validCombos }: ConfigDetails): void {
    this._configService.generate(config, validCombos);
  }

  onRegenerate(): void {
    this._configService.regenerate();
  }
}
