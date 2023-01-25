import { FormBuilder, FormGroup } from '@angular/forms';
import { of } from 'rxjs';

import { Form } from '@atocha/core/ui';
import { Config } from '@atocha/spirit-islander/util';
import {
  invalidDifficultyRange,
  playersOutnumberSelectedBoards,
  playersOutnumberSpirits,
  playersOutnumberTotalBoards,
  required,
} from './validators';

export class ConfigForm extends FormGroup<Form<Config>> {
  readonly expansions$ = this.get('expansions')?.valueChanges ?? of([]);

  constructor(
    readonly model: Config,
    readonly fb: FormBuilder = new FormBuilder()
  ) {
    super(
      fb.nonNullable.group({
        expansions: fb.nonNullable.control(model.expansions),
        players: fb.nonNullable.control(model.players),
        difficultyRange: fb.nonNullable.control(model.difficultyRange),
        spiritNames: fb.nonNullable.control(model.spiritNames),
        mapNames: fb.nonNullable.control(model.mapNames, required),
        boardNames: fb.nonNullable.control(model.boardNames),
        scenarioNames: fb.nonNullable.control(model.scenarioNames, required),
        adversaryNamesAndIds: fb.nonNullable.control(
          model.adversaryNamesAndIds,
          required
        ),
      }).controls,
      {
        validators: [
          playersOutnumberSpirits,
          playersOutnumberTotalBoards,
          playersOutnumberSelectedBoards,
          invalidDifficultyRange,
        ],
      }
    );
  }
}
