import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, HostBinding, Input, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FormsModule } from '@angular/forms';

import { AutofocusDirective } from '../autofocus/autofocus.directive';

@Component({
  standalone: true,
  selector: 'core-search-input',
  imports: [AutofocusDirective, CommonModule, FormsModule, FontAwesomeModule],
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class SearchInputComponent {
  @Input() text = '';
  @Input() placeholder = '';
  @Output() textChange = new EventEmitter<string>();
  readonly clearIcon = faTimes;

  @ViewChild('input')
  inputField: ElementRef | undefined;

  @HostBinding('class')
  className = 'core-search-input';

  onClear(): void {
    this.textChange.emit('');
    this.inputField?.nativeElement.focus();
  }
}
