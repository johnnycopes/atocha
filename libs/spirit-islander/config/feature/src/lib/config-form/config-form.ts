import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { of } from 'rxjs';

import { Form } from '@atocha/core/ui';
import { Expansion } from '@atocha/spirit-islander/shared/util';
import { Config } from '@atocha/spirit-islander/config/util';
import { Models } from './models';
import {
  invalidDifficultyRange,
  playersOutnumberSelectedBoards,
  playersOutnumberSpirits,
  playersOutnumberTotalBoards,
  required,
  restrictedBoardPairings,
} from './validators';
import { StateService } from '@atocha/spirit-islander/shared/data-access';
import { Settings } from '@atocha/spirit-islander/settings/util';

export class ConfigForm extends FormGroup<Form<Config>> {
  readonly expansions$ = this.get('expansions')?.valueChanges ?? of([]);

  get playersError(): string {
    return this.errors?.['playersOutnumberTotalBoards'] ?? '';
  }

  get difficultyError(): string {
    return this.errors?.['invalidDifficultyRange'] ?? '';
  }

  get spiritsError(): string {
    return this.errors?.['playersOutnumberSpirits'] ?? '';
  }

  get mapsError(): string {
    return this.get('mapNames')?.errors?.[Validators.required.name] ?? '';
  }

  get boardsError(): string {
    return (
      (this.errors?.['playersOutnumberSelectedBoards'] ||
        this.errors?.['restrictedBoardPairings']) ??
      ''
    );
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
    readonly stateService: StateService,
    allowBEAndDFBoards: Settings['allowBEAndDFBoards'],
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
          restrictedBoardPairings(stateService, allowBEAndDFBoards),
        ],
      }
    );
  }

  updateModels(
    expansions: readonly Expansion[],
    target: 'Expansions' | Expansion
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
