import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { AutofocusDirective } from '../autofocus/autofocus.directive';

@Component({
  selector: 'core-search-input',
  imports: [AutofocusDirective, CommonModule, FaIconComponent, FormsModule],
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'core-search-input',
  },
})
export class SearchInputComponent {
  @Input() autofocus = true;
  @Input() disabled = false;
  @Input() placeholder = '';
  @Input() text = '';
  @Output() textChange = new EventEmitter<string>();
  readonly clearIcon = faTimes;

  @ViewChild('input')
  inputField: ElementRef | undefined;

  onClear(): void {
    this.textChange.emit('');
    this.inputField?.nativeElement.focus();
  }
}
