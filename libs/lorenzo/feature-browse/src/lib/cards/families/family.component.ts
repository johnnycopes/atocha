import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { CardComponent, CardHeaderComponent } from '@atocha/lorenzo/ui';
import { Family } from '@atocha/lorenzo/util';

@Component({
  selector: 'app-family',
  imports: [CardComponent, CardHeaderComponent],
  templateUrl: './family.component.html',
  styleUrls: ['./family.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FamilyComponent {
  @Input() data: Family | undefined;
  @Input() favorite = false;
  @Output() favoriteChange = new EventEmitter<boolean>();
}
