/* eslint-disable @typescript-eslint/member-ordering */
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  ButtonComponent,
  CheckboxState,
  CheckboxTreeComponent,
} from '@atocha/core/ui';
import {
  CardComponent,
  CardGroupComponent,
  CheckboxesGroupComponent,
  ExpansionEmblemComponent,
  PageComponent,
} from '@atocha/spirit-islander/ui';
import {
  ADVERSARIES,
  Adversary,
  AdversaryLevel,
  BOARDS,
  Combo,
  Config,
  EXPANSIONS,
  getOptionsByExpansion,
  MAPS,
  SCENARIOS,
  SPIRITS,
} from '@atocha/spirit-islander/util';
import { ConfigTree, createTree } from './create-tree';

@Component({
  selector: 'app-config',
  standalone: true,
  imports: [
    ButtonComponent,
    CardComponent,
    CardGroupComponent,
    CheckboxesGroupComponent,
    CheckboxTreeComponent,
    CommonModule,
    ExpansionEmblemComponent,
    FormsModule,
    PageComponent,
  ],
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ConfigComponent {
  @Input()
  set config(config) {
    this._config = config;

    if (config) {
      this.SPIRITS = getOptionsByExpansion(SPIRITS, config?.expansions);
      this.MAPS = getOptionsByExpansion(MAPS, config?.expansions);
      this.BOARDS = getOptionsByExpansion(BOARDS, config?.expansions);
      this.SCENARIOS = getOptionsByExpansion(SCENARIOS, config?.expansions);
      this.ADVERSARIES = getOptionsByExpansion(ADVERSARIES, config?.expansions);
    }
  }
  get config() {
    return this._config;
  }
  private _config: Config | undefined;

  @Output() generate = new EventEmitter<{
    config: Config;
    validCombos: Combo[];
  }>();

  readonly EXPANSIONS = EXPANSIONS;
  SPIRITS = SPIRITS;
  MAPS = MAPS;
  BOARDS = BOARDS;
  SCENARIOS = SCENARIOS;
  ADVERSARIES = ADVERSARIES;

  configTreeGetId = <T>({ id }: ConfigTree<T>) => id;
  configTreeGetChildren = <T>({ children }: ConfigTree<T>) => children ?? [];

  expansionsModel: Record<string, CheckboxState> = {};
  expansionsTree = createTree({
    root: 'Expansions',
    getId: (item) => item,
    items: this.EXPANSIONS,
  });

  spiritsModel: Record<string, CheckboxState> = {};
  spiritsTree = createTree({
    root: 'Spirits',
    getId: ({ name }) => name,
    getData: ({ expansion }) => (expansion ? { expansion } : {}),
    items: this.SPIRITS,
  });

  mapsModel: Record<string, CheckboxState> = {};
  mapsTree = createTree({
    root: 'Maps',
    getId: ({ name }) => name,
    items: this.MAPS,
  });

  boardsModel: Record<string, CheckboxState> = {};
  boardsTree = createTree({
    root: 'Boards',
    getId: ({ name }) => name,
    getData: ({ expansion }) => (expansion ? { expansion } : {}),
    items: this.BOARDS,
  });

  scenariosModel: Record<string, CheckboxState> = {};
  scenariosTree = createTree({
    root: 'Scenarios',
    getId: ({ name }) => name,
    getData: ({ expansion }) => (expansion ? { expansion } : {}),
    items: this.SCENARIOS,
  });

  adversariesModel: Record<string, CheckboxState> = {};
  adversariesTree = createTree<Adversary | AdversaryLevel>({
    root: 'Adversaries',
    getId: (adversaryOrAdversaryLevel) =>
      'id' in adversaryOrAdversaryLevel
        ? adversaryOrAdversaryLevel.id
        : adversaryOrAdversaryLevel.name,
    getChildren: (adversaryOrAdversaryLevel) =>
      'levels' in adversaryOrAdversaryLevel
        ? adversaryOrAdversaryLevel.levels
        : [],
    getData: (adversaryOrAdversaryLevel) =>
      'id' in adversaryOrAdversaryLevel
        ? { difficulty: adversaryOrAdversaryLevel.difficulty }
        : adversaryOrAdversaryLevel.expansion
        ? { expansion: adversaryOrAdversaryLevel.expansion }
        : {},
    items: this.ADVERSARIES,
  });

  onGenerate(): void {
    this.generate.emit({
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      config: this.config!,
      validCombos: [],
    });
  }

  onModelChange(e: unknown) {
    console.log(e);
  }
}
