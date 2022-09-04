import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Development } from '@atocha/lorenzo/util';
import { CardComponent } from '../card/card.component';
import { CardHeaderComponent } from '../card/card-header/card-header.component';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: '[ui-development]',
  standalone: true,
  imports: [CardComponent, CardHeaderComponent, CommonModule],
  templateUrl: './development.component.html',
  styleUrls: ['./development.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DevelopmentComponent {
  @Input() data: Development | undefined;
  @Input() canFavorite = false;
  @Input() favorite = false;
  @Output() favoriteChange = new EventEmitter<boolean>();
}
