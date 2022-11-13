import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { snakeCase } from '@atocha/core/util';

@Component({
  selector: 'ui-card-group',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-group.component.html',
  styleUrls: ['./card-group.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardGroupComponent {
  private _name = '';
  @Input()
  get name() {
    return this._name;
  }
  set name(name: string) {
    this._name = name;
    this.className = snakeCase(name);
  }

  @Input() description = '';

  className = '';
}
