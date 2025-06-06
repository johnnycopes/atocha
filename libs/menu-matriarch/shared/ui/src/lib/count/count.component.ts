import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import {
  IconDefinition,
  faCalendarDay,
  faUtensils,
  faLayerGroup,
} from '@fortawesome/free-solid-svg-icons';
import { faMap } from '@fortawesome/free-regular-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

type CountType = 'days' | 'dishes' | 'meals' | 'menus';

@Component({
  selector: 'ui-count',
  imports: [FaIconComponent],
  templateUrl: './count.component.html',
  styleUrls: ['./count.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountComponent {
  @Input() count = 0;
  @Input()
  set type(value: CountType) {
    switch (value) {
      case 'days':
        this.icon = faCalendarDay;
        break;
      case 'dishes':
        this.icon = faUtensils;
        break;
      case 'meals':
        this.icon = faLayerGroup;
        break;
      case 'menus':
        this.icon = faMap;
        break;
    }
  }
  icon: IconDefinition = faMap;
}
