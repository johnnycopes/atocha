import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  Input,
  TemplateRef,
} from '@angular/core';

import { Item } from './item.interface';
import {
  ListItemDefDirective,
  ListItemContext,
} from './list-item-def.directive';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-list',
  imports: [CommonModule],
  template: `
    <ul class="tags">
      <li *ngFor="let item of items">
        <ng-container
          [ngTemplateOutlet]="itemTemplate"
          [ngTemplateOutletContext]="{ $implicit: item }"
        ></ng-container>
      </li>
    </ul>
  `,
  styles: [
    `
      .default-item > * {
        margin-bottom: 8px;
      }

      h3 {
        font-weight: bold;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent {
  @Input() items: Item[] = [];

  @ContentChild(ListItemDefDirective)
  public itemDef: ListItemDefDirective | undefined;

  public get itemTemplate(): TemplateRef<ListItemContext> | null {
    return this.itemDef?.template ?? null;
  }
}
