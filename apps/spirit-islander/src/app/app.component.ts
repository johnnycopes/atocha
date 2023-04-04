import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ConfigComponent } from '@atocha/spirit-islander/feature-config';
import { GameSetupComponent } from '@atocha/spirit-islander/feature-game-setup';
import {
  FooterComponent,
  HeaderComponent,
} from '@atocha/spirit-islander/feature-shell';
import { PageComponent } from '@atocha/spirit-islander/ui';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [
    CommonModule,
    ConfigComponent,
    FooterComponent,
    GameSetupComponent,
    HeaderComponent,
    PageComponent,
    RouterModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
