import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Expansion } from '@atocha/spirit-islander/shared/util';
import { EmblemComponent } from '../emblem/emblem.component';

@Component({
  selector: 'ui-expansion-emblem',
  imports: [CommonModule, EmblemComponent],
  templateUrl: './expansion-emblem.component.html',
  styleUrls: ['./expansion-emblem.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpansionEmblemComponent {
  @Input()
  set value(expansion: Expansion | undefined) {
    this.abbreviation = expansion ? this._abbreviations[expansion] : '-';
  }

  abbreviation = '-';

  private _abbreviations: Record<Expansion, string> = {
    'Branch & Claw': 'BC',
    Horizons: 'H',
    'Jagged Earth': 'JE',
    'Nature Incarnate': 'NI',
    'Promo Pack 1': 'P1',
    'Promo Pack 2': 'P2',
  };
}
