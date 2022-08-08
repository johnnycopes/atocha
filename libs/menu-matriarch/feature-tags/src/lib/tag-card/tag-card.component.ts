import {
  Component,
  ChangeDetectionStrategy,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Subject, merge } from 'rxjs';
import { mapTo, shareReplay } from 'rxjs/operators';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: '[app-tag-card]',
  templateUrl: './tag-card.component.html',
  styleUrls: ['./tag-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagCardComponent {
  @Input() id = '';
  @Input() name = '';
  @Input() meals: string[] = [];
  @Input() dishes: string[] = [];
  @Output() edit = new EventEmitter<string>();
  @Output() delete = new EventEmitter<void>();
  startEdit$ = new Subject<void>();
  finishEdit$ = new Subject<void>();
  editing$ = merge(
    this.startEdit$.pipe(mapTo(true)),
    this.finishEdit$.pipe(mapTo(false))
  ).pipe(shareReplay({ refCount: true, bufferSize: 1 }));

  onSave(name: string): void {
    this.finishEdit$.next();
    this.edit.emit(name);
  }
}
