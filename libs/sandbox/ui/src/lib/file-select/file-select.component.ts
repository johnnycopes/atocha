import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { FileSelectDefDirective } from './file-select-def.directive';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-file-select',
  imports: [CommonModule, FileSelectDefDirective],
  templateUrl: './file-select.component.html',
  styleUrls: ['./file-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileSelectComponent {
  @Input() accept = '';
  @Input() multiple = false;
  @Output() fileSelect = new EventEmitter<FileList | null>();

  @ViewChild('fileInput')
  fileInput: ElementRef<HTMLInputElement> | undefined;

  @ContentChild(FileSelectDefDirective)
  fileSelectDef: FileSelectDefDirective | null = null;

  fileSelectDefContext = {
    $implicit: () => this.openFileSelectDialog(),
  };

  openFileSelectDialog() {
    this.fileInput?.nativeElement.click();
  }

  onFileSelectChange(event: Event): void {
    const selectedFiles = (event.target as HTMLInputElement).files;
    this.fileSelect.next(selectedFiles);
  }
}
