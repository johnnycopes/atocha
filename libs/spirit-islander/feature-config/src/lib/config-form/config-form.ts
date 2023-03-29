import { FormBuilder, FormGroup } from '@angular/forms';
import { of } from 'rxjs';

import { Form } from '@atocha/core/ui';
import {
  Config,
  createAdversariesModel,
  createBoardsModel,
  createMapsModel,
  createScenariosModel,
  createSpiritsModel,
  ExpansionName,
  updateModel,
} from '@atocha/spirit-islander/util';
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
    expansions: ExpansionName[],
    target: 'Expansions' | ExpansionName
  ): void {
    const {
      spiritNames,
      boardNames,
      scenarioNames,
      mapNames,
      adversaryLevelIds,
    } = this.getRawValue();

    this.patchValue({
      spiritNames: updateModel(
        createSpiritsModel,
        spiritNames,
        expansions,
        target
      ),
      boardNames: updateModel(
        createBoardsModel,
        boardNames,
        expansions,
        target
      ),
      mapNames: updateModel(createMapsModel, mapNames, expansions, target),
      scenarioNames: updateModel(
        createScenariosModel,
        scenarioNames,
        expansions,
        target
      ),
      adversaryLevelIds: updateModel(
        createAdversariesModel,
        adversaryLevelIds,
        expansions,
        target
      ),
    });
  }
}
