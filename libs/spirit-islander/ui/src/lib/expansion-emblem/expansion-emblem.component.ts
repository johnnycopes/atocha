import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ExpansionName } from '@atocha/spirit-islander/util';

import { EmblemComponent } from '../emblem/emblem.component';

@Component({
  selector: 'ui-expansion-emblem',
  standalone: true,
  imports: [CommonModule, EmblemComponent],
  templateUrl: './expansion-emblem.component.html',
  styleUrls: ['./expansion-emblem.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {
    class: 'ui-expansion-emblem',
  },
})
export class ExpansionEmblemComponent {
  @Input()
  set value(name: ExpansionName | undefined) {
    switch (name) {
      case 'Branch & Claw':
        this.abbreviation = 'BC';
        break;
      case 'Horizons':
        this.abbreviation = 'H';
        break;
      case 'Jagged Earth':
        this.abbreviation = 'JE';
        break;
      case 'Promo Pack 1':
        this.abbreviation = 'P1';
        break;
      case 'Promo Pack 2':
        this.abbreviation = 'P2';
        break;
      default:
        this.abbreviation = undefined;
    }
  }

  abbreviation: string | undefined;
}
