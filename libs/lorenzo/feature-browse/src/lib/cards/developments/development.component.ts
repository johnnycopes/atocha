import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';


import { CardComponent, CardHeaderComponent } from '@atocha/lorenzo/ui';
import { Development } from '@atocha/lorenzo/util';

@Component({
  selector: 'app-development',
  imports: [CardComponent, CardHeaderComponent],
  templateUrl: './development.component.html',
  styleUrls: ['./development.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DevelopmentComponent {
  @Input() data: Development | undefined;
  @Input() favorite = false;
  @Output() favoriteChange = new EventEmitter<boolean>();
}
