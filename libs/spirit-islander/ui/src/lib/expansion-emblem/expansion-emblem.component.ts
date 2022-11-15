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
})
export class ExpansionEmblemComponent {
  @Input()
  set value(name: ExpansionName | undefined) {
    this.abbreviation = name ? this._abbreviations[name] : '-';
  }

  abbreviation = '-';

  private _abbreviations: Record<ExpansionName, string> = {
    'Branch & Claw': 'BC',
    Horizons: 'H',
    'Jagged Earth': 'JE',
    'Promo Pack 1': 'P1',
    'Promo Pack 2': 'P2',
  };
}
