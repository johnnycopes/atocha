import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';

import {
  CardComponent,
  CardGroupComponent,
  PageComponent,
} from '@atocha/spirit-islander/ui';
import { Config } from '@atocha/spirit-islander/util';

@Component({
  selector: 'app-config',
  standalone: true,
  imports: [CardComponent, CardGroupComponent, CommonModule, PageComponent],
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ConfigComponent {
  @Input() config: Config | undefined;
}
