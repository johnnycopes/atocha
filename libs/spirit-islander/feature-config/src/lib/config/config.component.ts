import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Config } from '@atocha/spirit-islander/util';
import { PageComponent } from '@atocha/spirit-islander/ui';

@Component({
  selector: 'app-config',
  standalone: true,
  imports: [CommonModule, PageComponent],
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigComponent {
  @Input() config: Config | undefined;
}
