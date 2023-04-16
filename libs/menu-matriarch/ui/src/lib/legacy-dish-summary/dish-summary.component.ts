import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';

import { ExternalLinkDirective } from '@atocha/core/ui';
import { Tag } from '@atocha/menu-matriarch/util';
import { CountComponent } from '../count/count.component';
import { TagComponent } from '../tags/tag/tag.component';
import { TagsListComponent } from '../tags/tags-list/tags-list.component';
import { TagDefDirective } from '../tags/tags-list/tag-def.directive';

@Component({
  standalone: true,
  selector: 'ui-dish-summary',
  imports: [
    CommonModule,
    CountComponent,
    ExternalLinkDirective,
    FontAwesomeModule,
    TagComponent,
    TagDefDirective,
    TagsListComponent,
  ],
  templateUrl: './dish-summary.component.html',
  styleUrls: ['./dish-summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LegacyDishSummaryComponent {
  @Input() id = '';
  @Input() name = '';
  @Input() description = '';
  @Input() link = '';
  @Input() tags: Tag[] = [];
  @Input() menuIds: string[] = [];
  @Input() mealIds: string[] = [];
  @Input() usages = 0;
  @Output() nameClick = new EventEmitter<string>();
  readonly faLink = faLink;
}
