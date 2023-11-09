import { Directive, TemplateRef } from '@angular/core';

export interface FileSelectContext {
  $implicit: () => void;
}

@Directive({
  standalone: true,
  selector: '[appFileSelectDef]',
})
export class FileSelectDefDirective {
  constructor(public template: TemplateRef<FileSelectContext> | null) {}
}
