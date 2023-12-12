import {
  FormBuilder,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { of } from 'rxjs';

import { Form } from '@atocha/core/ui';
import { Expansion } from '@atocha/spirit-islander/shared/util';
import { Config } from '@atocha/spirit-islander/config/util';
import { Models } from '../models';
import {
  invalidDifficultyRange,
  playersOutnumberSelectedBoards,
  playersOutnumberSpirits,
  playersOutnumberTotalBoards,
  required,
  restrictedBoardPairings,
} from './validators';
import {
  Settings,
  createDefaultSettings,
} from '@atocha/spirit-islander/settings/util';

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
    readonly settings: Settings = createDefaultSettings(),
    readonly fb: NonNullableFormBuilder = new FormBuilder().nonNullable
  ) {
    super(
      fb.group({
        expansions: fb.control(model.expansions),
        players: fb.control(model.players),
        difficultyRange: fb.control(model.difficultyRange),
        spiritNames: fb.control(model.spiritNames),
        mapNames: fb.control(model.mapNames, required),
        boardNames: fb.control(model.boardNames),
        scenarioNames: fb.control(model.scenarioNames, required),
        adversaryLevelIds: fb.control(model.adversaryLevelIds, required),
      }).controls,
      {
        validators: [
          playersOutnumberSpirits,
          playersOutnumberTotalBoards,
          playersOutnumberSelectedBoards,
          invalidDifficultyRange,
          restrictedBoardPairings(settings.allowBEAndDFBoards),
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
