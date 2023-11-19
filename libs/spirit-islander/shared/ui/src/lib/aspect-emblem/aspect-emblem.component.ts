import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { SnakeCasePipe } from '@atocha/core/ui';
import { AspectsSpiritName } from '@atocha/spirit-islander/shared/util';
import { EmblemComponent } from '../emblem/emblem.component';

@Component({
  selector: 'ui-aspect-emblem',
  standalone: true,
  imports: [CommonModule, EmblemComponent, SnakeCasePipe],
  templateUrl: './aspect-emblem.component.html',
  styleUrls: ['./aspect-emblem.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AspectEmblemComponent {
  @Input({ required: true })
  set name(name: AspectsSpiritName) {
    this.abbreviation = this._abbreviations[name];
  }
  abbreviation!: string;

  private readonly _abbreviations: Record<AspectsSpiritName, string> = {
    "Lightning's Swift Strike": 'Lightning',
    'River Surges in Sunlight': 'River',
    'Shadows Flicker Like Flame': 'Shadow',
    'Vital Strength of the Earth': 'Earth',
  };
}
