import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { SnakeCasePipe } from '@atocha/core/ui';
import { SpiritName } from '@atocha/spirit-islander/shared/util';
import { EmblemComponent } from '../emblem/emblem.component';

type SpiritWithAspects = Extract<
  SpiritName,
  | "Lightning's Swift Strike"
  | 'River Surges in Sunlight'
  | 'Shadows Flicker Like Flame'
  | 'Vital Strength of the Earth'
>;

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
  set name(name: SpiritWithAspects) {
    this.abbreviation = this._abbreviations[name];
    console.log(this.abbreviation);
  }
  abbreviation!: string;

  private readonly _abbreviations: Record<SpiritWithAspects, string> = {
    "Lightning's Swift Strike": 'Lightning',
    'River Surges in Sunlight': 'River',
    'Shadows Flicker Like Flame': 'Shadow',
    'Vital Strength of the Earth': 'Earth',
  };
}
