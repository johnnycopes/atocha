import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchInputComponent {
  @Input() text = '';
  @Output() textChange = new EventEmitter<string>();
  public readonly faTimes = faTimes;

  @ViewChild('input')
  public inputField: ElementRef | undefined;

  public onClear(): void {
    this.textChange.emit('')
    this.inputField?.nativeElement.focus()
  }
}
