import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';

import {
  ButtonComponent,
  CheckboxState,
  CheckboxTreeComponent,
} from '@atocha/core/ui';
import {
  CardComponent,
  CardGroupComponent,
  CheckboxesGroupComponent,
  PageComponent,
} from '@atocha/spirit-islander/ui';
import {
  BOARDS,
  Combo,
  Config,
  EXPANSIONS,
  getOptionsByExpansion,
  MAPS,
  Option,
  SCENARIOS,
  SPIRITS,
} from '@atocha/spirit-islander/util';

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

  expansionsItem: Record<string, CheckboxState> = {};

  getSelf = (item: string) => item;
  getName = <T extends string>({ name }: Option<T>) => name;

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
