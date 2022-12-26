import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';

import { ButtonComponent } from '@atocha/core/ui';
import {
  CardComponent,
  CardGroupComponent,
  CheckboxesGroupComponent,
  PageComponent,
} from '@atocha/spirit-islander/ui';
import {
  Combo,
  Config,
  EXPANSIONS,
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
    CommonModule,
    PageComponent,
  ],
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ConfigComponent {
  @Input() config: Config | undefined;
  @Output() generate = new EventEmitter<{
    config: Config;
    validCombos: Combo[];
  }>();

  readonly EXPANSIONS = EXPANSIONS;
  readonly SPIRITS = SPIRITS;

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
