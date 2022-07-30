import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-dish-placeholder',
  templateUrl: './dish-placeholder.component.html',
  styleUrls: ['./dish-placeholder.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DishPlaceholderComponent { }
