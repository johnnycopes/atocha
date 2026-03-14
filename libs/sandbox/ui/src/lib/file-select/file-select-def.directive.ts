import { Directive, TemplateRef, inject } from '@angular/core';

export interface FileSelectContext {
  $implicit: () => void;
}

@Directive({
  standalone: true,
  selector: '[appFileSelectDef]',
})
export class FileSelectDefDirective {
  template = inject<TemplateRef<FileSelectContext>>(TemplateRef);
}
