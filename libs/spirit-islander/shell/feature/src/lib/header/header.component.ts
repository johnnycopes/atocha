import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ExternalLinkDirective } from '@atocha/core/ui';
import {
  AppFacadeService,
  Route,
} from '@atocha/spirit-islander/shared/data-access';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'header[app-header]',
  standalone: true,
  imports: [CommonModule, ExternalLinkDirective, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  readonly Route: typeof Route = Route;
  configParams$ = this._appFacadeService.configParams$;

  constructor(private _appFacadeService: AppFacadeService) {}
}
