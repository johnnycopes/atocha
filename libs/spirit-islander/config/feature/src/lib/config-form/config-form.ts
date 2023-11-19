import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { of } from 'rxjs';

import { Form } from '@atocha/core/ui';
import { ExpansionName } from '@atocha/spirit-islander/shared/util';
import { Config } from '@atocha/spirit-islander/config/util';
import { Models } from './models';
import {
  invalidDifficultyRange,
  playersOutnumberSelectedBoards,
  playersOutnumberSpirits,
  playersOutnumberTotalBoards,
  required,
} from './validators';

export class ConfigForm extends FormGroup<Form<Config>> {
  readonly expansions$ = this.get('expansions')?.valueChanges ?? of([]);

  get playersError(): string {
    return this.errors?.[playersOutnumberTotalBoards.name] ?? '';
  }

  get difficultyError(): string {
    return this.errors?.[invalidDifficultyRange.name] ?? '';
  }

  get spiritsError(): string {
    return this.errors?.[playersOutnumberSpirits.name] ?? '';
  }

  get mapsError(): string {
    return this.get('mapNames')?.errors?.[Validators.required.name] ?? '';
  }

  get boardsError(): string {
    return this.errors?.[playersOutnumberSelectedBoards.name] ?? '';
  }

  get scenariosError(): string {
    return this.get('scenarioNames')?.errors?.[Validators.required.name] ?? '';
  }

  get adversariesError(): string {
    return (
      this.get('adversaryLevelIds')?.errors?.[Validators.required.name] ?? ''
    );
  }

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
        adversaryLevelIds: fb.nonNullable.control(
          model.adversaryLevelIds,
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

  updateModels(
    expansions: readonly ExpansionName[],
    target: 'Expansions' | ExpansionName
  ): void {
    const {
      spiritNames,
      boardNames,
      scenarioNames,
      mapNames,
      adversaryLevelIds,
    } = this.getRawValue();
    const models = new Models({
      spiritNames,
      boardNames,
      mapNames,
      scenarioNames,
      adversaryLevelIds,
    });

    models.update(expansions, target);

    this.patchValue({
      spiritNames: models.spiritNames,
      boardNames: models.boardNames,
      mapNames: models.mapNames,
      scenarioNames: models.scenarioNames,
      adversaryLevelIds: models.adversaryLevelIds,
    });
  }
}