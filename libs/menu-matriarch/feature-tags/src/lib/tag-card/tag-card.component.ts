import { CommonModule } from '@angular/common';
import {
  Component,
  ChangeDetectionStrategy,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Subject, merge } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { ButtonComponent } from '@atocha/core/ui';
import {
  CountComponent,
  InlineNameEditComponent,
  TagComponent,
} from '@atocha/menu-matriarch/ui-domain';
import { CardComponent } from '@atocha/menu-matriarch/ui-generic';

@Component({
  standalone: true,
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: '[app-tag-card]',
  imports: [
    ButtonComponent,
    CardComponent,
    CommonModule,
    CountComponent,
    InlineNameEditComponent,
    TagComponent,
  ],
  templateUrl: './tag-card.component.html',
  styleUrls: ['./tag-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagCardComponent {
  @Input() id = '';
  @Input() name = '';
  @Input() mealIds: string[] = [];
  @Input() dishIds: string[] = [];
  @Output() edit = new EventEmitter<string>();
  @Output() delete = new EventEmitter<void>();
  startEdit$ = new Subject<void>();
  finishEdit$ = new Subject<void>();
  editing$ = merge(
    this.startEdit$.pipe(map(() => true)),
    this.finishEdit$.pipe(map(() => false))
  ).pipe(shareReplay({ refCount: true, bufferSize: 1 }));

  onSave(name: string): void {
    this.finishEdit$.next();
    this.edit.emit(name);
  }
}
