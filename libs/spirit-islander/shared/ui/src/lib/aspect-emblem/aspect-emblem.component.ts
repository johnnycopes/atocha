import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { SnakeCasePipe } from '@atocha/core/ui';
import { SpiritFamilyName } from '@atocha/spirit-islander/shared/util';
import { EmblemComponent } from '../emblem/emblem.component';

@Component({
    selector: 'ui-aspect-emblem',
    imports: [CommonModule, EmblemComponent, SnakeCasePipe],
    templateUrl: './aspect-emblem.component.html',
    styleUrls: ['./aspect-emblem.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AspectEmblemComponent {
  @Input({ required: true })
  set name(name: SpiritFamilyName) {
    this.abbreviation = this._abbreviations[name];
  }
  abbreviation!: string;

  private readonly _abbreviations: Record<SpiritFamilyName, string> = {
    'A Spread of Rampant Green': 'Green',
    'Bringer of Dreams and Nightmares': 'Bringer',
    'Heart of the Wildfire': 'Wildfire',
    'Keeper of the Forbidden Wilds': 'Keeper',
    "Lightning's Swift Strike": 'Lightning',
    'Lure of the Deep Wilderness': 'Lure',
    "Ocean's Hungry Grasp": 'Ocean',
    'River Surges in Sunlight': 'River',
    'Serpent Slumbering Beneath the Island': 'Serpent',
    'Shadows Flicker Like Flame': 'Shadow',
    'Sharp Fangs Behind the Leaves': 'Fangs',
    'Shifting Memory of Ages': 'Memory',
    'Shroud of Silent Mist': 'Mist',
    Thunderspeaker: 'Thunder',
    'Vital Strength of the Earth': 'Earth',
  };
}
