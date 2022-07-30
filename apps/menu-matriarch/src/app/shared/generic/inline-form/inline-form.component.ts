import { Component, ChangeDetectionStrategy, EventEmitter, Output, ViewEncapsulation, HostBinding, Input } from '@angular/core';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'form[app-inline-form]',
  templateUrl: './inline-form.component.html',
  styleUrls: ['./inline-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class InlineFormComponent {
  @Input() disabled = false;
  @Output() cancel = new EventEmitter<void>();
  @Output() save = new EventEmitter<void>();
  public readonly cancelIcon = faTimes;
  public readonly saveIcon = faCheck;

  @HostBinding('class')
  public hostClass = 'app-inline-form';
}
